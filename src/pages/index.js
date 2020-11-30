import { Link } from "gatsby";
import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";

const IndexPage = ({ data }) => {
  const { blog } = data;
  return (
    <Layout>
      <div className="text-gray-800 mt-10">
        <div className="p-2 divide-gray-700 divide-y-4">
          {blog.posts.map(post => (
            <article
              key={post.id}
              className="py-6 xl:grid xl:grid-cols-8 xl:items-baseline"
            >
              <span className="text-gray-500 text-base block m-0 col-span-2 leading-10">
                Escrito el {post.frontmatter.date}
              </span>
              <div className="col-span-6 space-y-3">
                <h2 className="text-2xl leading-normal">
                  <Link
                    to={post.fields.slug}
                    className="text-gray-800 hover:text-yellow-700 block"
                  >
                    {post.frontmatter.title}
                  </Link>
                </h2>
                <div className="prose text-base font-copy text-gray-600">
                  <p>{[post.excerpt]}</p>
                </div>
                <Link
                  to={post.fields.slug}
                  className="text-yellow-700 text-xl block"
                >
                  Leer todo →
                </Link>
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
    ) {
      posts: nodes {
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "D - MM - YYYY")
        }
        id
        excerpt
      }
    }
  }
`;
