const { isFuture } = require("date-fns");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allSanityPost(
        sort: { fields: [publishedAt], order: DESC }
        filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
      ) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `);
  if (result.errors) throw result.errors;
  const postEdges = (result.data.allSanityPost || {}).edges || [];
  postEdges
    .filter((edge) => !isFuture(new Date(edge.node.publishedAt)))
    .forEach((edge, index) => {
      const { id, slug = {} } = edge.node;
      const path = `/${slug.current}/`;

      createPage({
        path,
        component: require.resolve(`./src/templates/blog-post.js`),
        context: {
          id,
          next: index === 0 ? null : postEdges[index - 1].node,
          prev:
            index === postEdges.length - 1 ? null : postEdges[index + 1].node,
        },
      });
    });
};
