import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

export default function BlogPost({ data }) {
  const post = data.markdownRemark;

  return (
    <Layout>
      <div className="text-gray-800 mt-10 max-w-4xl mx-auto">
        <div className="p-2">
          <article key={post.id} className="mb-4">
            <span className="text-gray-500 text-xs block m-0 leading-tight">
              Escrito el {post.frontmatter.date}
            </span>
            <h2 className="text-3xl mb-4">{post.frontmatter.title}</h2>
            <div
              className="text-base font-regular font-copy leading-relaxed text-gray-700 prose lg:prose-xl prose-indigo"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </article>
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query BlogQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "D - MM - YYYY")
        title
      }
    }
  }
`;
