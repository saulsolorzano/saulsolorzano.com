import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

const trimReadingTime = minutes => {
  return Math.round(minutes);
};

export default function BlogPost({ data, pageContext }) {
  const post = data.markdownRemark;
  console.log(post.frontmatter);
  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <div className="text-gray-800 mt-10">
        <div className="p-2">
          <article key={post.id} className="mb-4">
            <header className="border-b-2 text-center mb-4 pb-6">
              <span className="text-gray-500 text-base block m-1 leading-tight">
                <span>
                  Tiempo estimado de lectura{" "}
                  <strong>
                    {trimReadingTime(post.fields.readingTime.minutes)} min
                  </strong>
                </span>
              </span>
              <h2 className="text-3xl mb-0">{post.frontmatter.title}</h2>
            </header>
            <div className="mb-8 border-b-2 pb-4 w-full grid align-middle grid-cols-3">
              {pageContext.prev != null ? (
                <Link
                  to={pageContext.prev.fields.slug}
                  className="text-yellow-700 hover:text-violet-500"
                >
                  ← Anterior
                </Link>
              ) : (
                <span></span>
              )}
              <span className="block text-center text-gray-500">
                Escrito el {post.frontmatter.date}
              </span>
              {pageContext.next != null ? (
                <Link
                  to={pageContext.next.fields.slug}
                  className="text-yellow-700 hover:text-violet-500 block text-right"
                >
                  Siguiente →
                </Link>
              ) : (
                <span></span>
              )}
            </div>
            <main className="">
              <div
                className="w-3/4 mx-auto text-base font-regular font-copy leading-relaxed text-gray-700 prose lg:prose-xl prose-indigo max-w-none"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </main>
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
        date(formatString: "dddd DD [de] MMMM, YYYY", locale: "es")
        title
      }
      fields {
        slug
        readingTime {
          minutes
        }
      }
    }
  }
`;
