import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Article } from "../components/Article";

const ArchivePage = ({ data }) => {
  const { posts } = data;
  return (
    <Layout>
      <SEO />
      <div className="text-gray-800 xl:mt-10 dark:text-gray-100">
        <div className="p-2 divide-gray-200 divide-y-2 dark:divide-gray-600">
          {posts.edges.map((post) => (
            <Article post={post.node} key={post.node.id} />
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default ArchivePage;

export const pageQuery = graphql`
  query ArchivePageQuery {
    posts: allSanityPost(
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
