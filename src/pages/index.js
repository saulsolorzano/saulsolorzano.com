import { Link } from "gatsby";
import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";

const IndexPage = ({ data }) => {
  const { blog } = data;
  return (
    <Layout>
      <div className="text-gray-800 mt-10">
        <div className="p-2">
          {blog.posts.map(post => (
            <article key={post.id} className="mb-4">
              <span className="text-gray-500 text-sm block m-0 leading-tight">
                Escrito el {post.frontmatter.date}
              </span>
              <h2 className="text-xl">
                <Link
                  to={post.fields.slug}
                  className="text-gray-800 hover:text-yellow-700 block"
                >
                  {post.frontmatter.title}
                </Link>
              </h2>
              <p>{[post.excerpt]}</p>
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
