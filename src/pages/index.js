import { Link } from "gatsby";
import React from "react";
import { graphql } from "gatsby";
import SEO from "../components/seo";
import Layout from "../components/layout";

const IndexPage = ({ data }) => {
  const { blog } = data;
  return (
    <Layout>
      <SEO />
      <div className="text-gray-800 mt-10">
        <div className="p-2 divide-gray-200 divide-y-2">
          {blog.posts.map(post => (
            <article
              key={post.id}
              className="py-6 xl:grid xl:grid-cols-8 xl:items-baseline"
            >
              {post.frontmatter.published}
              <span className="text-gray-500 text-base block m-0 col-span-2 leading-10">
                Escrito el {post.frontmatter.date}
              </span>
              <div className="col-span-6 space-y-3">
                <h2 className="text-2xl leading-normal">
                  {post.frontmatter.externalLink != undefined && (
                    <a
                      href={post.frontmatter.externalLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center space-x-2"
                    >
                      <span>{post.frontmatter.title}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="h-4 w-4 text-gray-500"
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
                  {post.frontmatter.externalLink == undefined && (
                    <Link
                      to={post.fields.slug}
                      className="text-gray-800 hover:text-yellow-700 border-white border-b-2  hover:border-yellow-700"
                    >
                      {post.frontmatter.title}
                    </Link>
                  )}
                </h2>
                <div className="prose text-base font-copy text-gray-600">
                  <p>{post.frontmatter.description}</p>
                </div>
                {post.frontmatter.externalLink == undefined && (
                  <div>
                    <Link
                      to={post.fields.slug}
                      className="text-xl border-white border-b-2 text-yellow-700 hover:border-yellow-700"
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
  query MyQuery {
    blog: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      posts: nodes {
        fields {
          slug
        }
        frontmatter {
          title
          published
          date(formatString: "D - MM - YYYY")
          description
          type
          externalLink
        }
        id
        excerpt
      }
    }
  }
`;
