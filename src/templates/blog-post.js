import { graphql, Link } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

const trimReadingTime = (minutes) => {
  return Math.round(minutes);
};

export default function BlogPost({ data, pageContext }) {
  const post = data.markdownRemark;

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
      />
      <div className="text-gray-800 mt-10">
        <div className="p-2">
          <article key={post.id} className="mb-4">
            <header className="border-b-2 text-center mb-4 pb-6 dark:border-dark-border">
              <span className="text-gray-500 text-base block m-1 leading-tight dark:text-gray-200">
                <span>
                  Tiempo estimado de lectura{" "}
                  <strong>
                    {trimReadingTime(post.fields.readingTime.minutes)} min
                  </strong>
                </span>
              </span>
              <h2 className="text-4xl mb-0 dark:text-gray-200">{post.frontmatter.title}</h2>
            </header>
            <div className="mb-8 border-b-2 pb-4 w-full grid align-middle grid-cols-3 dark:border-dark-border">
              {pageContext.prev != null ? (
                <Link
                  to={pageContext.prev.fields.slug}
                  className="text-yellow-700 hover:text-violet-500 dark:text-dark-light dark:hover:text-yellow-400"
                >
                  ← Anterior
                </Link>
              ) : (
                <span></span>
              )}
              <span className="block text-center text-gray-500 dark:text-gray-100">
                {post.frontmatter.date}
                {post.frontmatter.updated != undefined && (
                  <span className="italic inline-block pl-2 text-gray-400 dark:text-gray-200">
                    {" "}Actualizado {post.frontmatter.updated}
                  </span>
                )}
              </span>
              {pageContext.next != null ? (
                <Link
                  to={pageContext.next.fields.slug}
                  className="text-yellow-700 hover:text-violet-500 block text-right dark:text-dark-light dark:hover:text-yellow-400"
                >
                  Siguiente →
                </Link>
              ) : (
                <span></span>
              )}
            </div>
            <main>
              <div
                className="sm:w-3/4 mx-auto text-base font-regular font-copy leading-relaxed text-gray-700 prose lg:prose-xl prose-indigo max-w-none dark:prose-dark"
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
        date(formatString: "DD MMMM, YYYY", locale: "es")
        updated(formatString: "DD MMMM, YYYY", locale: "es")
        title
        description
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
