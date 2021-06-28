import { graphql, Link } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { Article } from "../components/Article";

const IndexPage = ({ data }) => {
  const { posts } = data;
  return (
    <Layout>
      <Seo />
      <div className="text-gray-800 xl:mt-10 dark:text-gray-100">
        <div className="p-2 divide-gray-200 divide-y-2 dark:divide-gray-600">
          {posts.edges.map((post) => (
            <Article post={post.node} key={post.node.id} />
          ))}
        </div>
        <div className="mt-10 text-center border-t-4">
          <Link
            to="/todo"
            className="text-xl text-yellow-700 block py-2 hover:text-white hover:bg-yellow-700 dark:hover:bg-dark-light dark:hover:border-dark-light"
          >
            Ver todos los posts
          </Link>
        </div>
      </div>
    </Layout>
  );
};
export default IndexPage;

export const pageQuery = graphql`
  query IndexPageQuery {
    posts: allSanityPost(
      limit: 12
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          title
          publishedAt(formatString: "D - MM - YYYY")
          external
          external_url
          _rawDescription
          slug {
            current
          }
        }
      }
    }
  }
`;
