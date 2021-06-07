import { graphql, Link } from "gatsby";
import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { getSingleUrl } from "../lib/helpers";

const IndexPage = ({ data }) => {
  console.log(data.posts);
  const { posts } = data;
  return (
    <Layout>
      <SEO />
      <div className="text-gray-800 xl:mt-10 dark:text-gray-100">
        <div className="p-2 divide-gray-200 divide-y-2 dark:divide-gray-600">
          {posts.edges.map((post) => (
            <article
              key={post.node.id}
              className="py-6 xl:grid xl:grid-cols-8 xl:items-baseline"
            >
              <span className="text-gray-500 text-base block m-0 col-span-2 leading-10 dark:text-gray-200">
                Escrito el {post.node.publishedAt}
              </span>
              <div className="col-span-6 space-y-3">
                <h2 className="text-2xl leading-normal">
                  {post.node.external && (
                    <a
                      href={post.node.external_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center space-x-2"
                    >
                      {post.node.title}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                  {!post.node.external && (
                    <Link
                      to={getSingleUrl(post.node.slug)}
                      className="text-gray-800 hover:text-yellow-700 border-white border-b-2  hover:border-yellow-700 dark:text-gray-200 dark:border-dark dark:hover:text-dark-light dark:hover:border-dark-light"
                    >
                      {post.node.title}
                    </Link>
                  )}
                </h2>
                <div className="prose text-base font-copy text-gray-600 dark:text-gray-200">
                  <BlockContent blocks={post.node._rawDescription} />
                </div>
                {!post.node.external && (
                  <div>
                    <Link
                      to={post.node.slug.current}
                      className="text-xl border-white border-b-2 dark:border-dark text-yellow-700 hover:border-yellow-700 dark:text-dark-light dark:hover:border-dark-light"
                    >
                      Leer todo →
                    </Link>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default IndexPage;

export const pageQuery = graphql`
  query IndexPageQuery {
    posts: allSanityPost(
      limit: 6
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
