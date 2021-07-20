import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { Article } from "../components/Article";

export default function CategoryPage({ data }) {
  const { title, posts } = data.category || {};
  return (
    <Layout>
      <Seo title={title} />
      <div className="text-gray-800 mt-2 md:mt-10">
        <div className="p-2">
          <div className="mb-4">
            <header className="border-b-2 text-center mb-4 pb-6 dark:border-dark-border">
              <h2 className="text-2xl md:text-4xl mb-0 dark:text-gray-200">
                <span className="bg-no-repeat bg-header bg-header-pattern">
                  {title}
                </span>
              </h2>
            </header>
            <div className="text-gray-800 xl:mt-10 dark:text-gray-100">
              <div className="p-2 divide-gray-200 divide-y-2 dark:divide-gray-600">
                {posts.map((post) => (
                  <Article post={post} key={post.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query ($id: String!) {
    category: sanityCategory(id: { eq: $id }) {
      id
      title
      posts {
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
`;
