import { graphql, Link } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import BasePortableText from "@sanity/block-content-to-react";
import serializers from "../components/Serializers";

export default function BlogPost({ data, pageContext }) {
  const post = data.post;
  return (
    <Layout>
      <SEO title={post.title} />
      <div className="text-gray-800 mt-2 md:mt-10">
        <div className="p-2">
          <article key={post.id} className="mb-4">
            <header className="border-b-2 text-center mb-4 pb-6 dark:border-dark-border">
              <span className="text-gray-500 text-base block m-1 leading-tight dark:text-gray-200">
                <span>
                  Tiempo estimado de lectura <strong></strong>
                </span>
              </span>
              <h2 className="text-2xl md:text-4xl mb-0 dark:text-gray-200">
                {post.title}
              </h2>
            </header>
            <div className="mb-8 border-b-2 pb-4 w-full grid align-middle grid-rows-2 md:grid-rows-1 grid-cols-2 md:grid-cols-3 dark:border-dark-border">
              {pageContext.prev != null ? (
                <Link
                  to={pageContext.prev.slug.current}
                  className="text-yellow-700 hover:text-violet-500 dark:text-dark-light dark:hover:text-yellow-400 col-span-1 row-span-1 md:col-auto md:row-auto"
                >
                  ← Anterior
                </Link>
              ) : (
                <span></span>
              )}
              <span className="block text-center text-gray-500 dark:text-gray-100 row-span-2 col-start-1 col-end-3 md:col-auto md:row-auto">
                {post.publishedAt}
                {post._updatedAt && post.showUpdatedAt && (
                  <span className="italic inline-block pl-2 text-gray-400 dark:text-gray-200">
                    {" "}
                    Actualizado {post._updatedAt}
                  </span>
                )}
              </span>
              {pageContext.next != null ? (
                <Link
                  to={pageContext.next.slug.current}
                  className="text-yellow-700 hover:text-violet-500 block text-right dark:text-dark-light dark:hover:text-yellow-400 col-start-2 col-end-3 row-start-1 row-end-2 md:col-auto md:row-auto"
                >
                  Siguiente →
                </Link>
              ) : (
                <span></span>
              )}
            </div>
            <main>
              <div className="sm:w-3/4 mx-auto text-base font-regular font-copy leading-relaxed text-gray-700 prose lg:prose-xl prose-indigo max-w-none dark:prose-dark">
                <BasePortableText
                  blocks={post._rawBody}
                  serializers={serializers}
                  projectId="mob3kpg0"
                  dataset="production"
                />
              </div>
            </main>
          </article>
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query ($id: String!) {
    post: sanityPost(id: { eq: $id }) {
      id
      publishedAt(formatString: "DD MMMM, YYYY", locale: "es")
      _updatedAt(formatString: "DD MMMM, YYYY", locale: "es")
      title
      _rawBody(resolveReferences: { maxDepth: 100 })
      showUpdatedAt
      slug {
        current
      }
    }
  }
`;
