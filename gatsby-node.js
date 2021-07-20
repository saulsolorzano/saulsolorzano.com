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

  const CategoryResult = await graphql(`
    {
      allSanityCategory {
        nodes {
          slug {
            current
          }
          id
        }
      }
    }
  `);
  if (CategoryResult.errors) throw CategoryResult.errors;
  const categoryNodes =
    (CategoryResult.data.allSanityCategory || {}).nodes || [];
  categoryNodes.forEach((node) => {
    const { id, slug = {} } = node;
    if (!slug) return;
    const path = `/categoria/${slug.current}/`;

    createPage({
      path,
      component: require.resolve(`./src/templates/category.js`),
      context: {
        id,
      },
    });
  });
};

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    SanityCategory: {
      posts: {
        type: ["SanityPost"],
        resolve(source, args, context, info) {
          return context.nodeModel.runQuery({
            type: "SanityPost",
            query: {
              filter: {
                categories: {
                  elemMatch: {
                    _id: {
                      eq: source._id,
                    },
                  },
                },
              },
            },
          });
        },
      },
    },
  };
  createResolvers(resolvers);
};
