import { graphql, Link } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import BasePortableText from "@sanity/block-content-to-react";
import serializers from "../components/Serializers";
import SeriesNav from "../components/SeriesNav";
import { getSingleUrl } from "../lib/helpers";
import CategoryLabel from "../components/CategoryLabel";

export default function BlogPost({ data, pageContext }) {
  const post = data.post;
  return (
    <Layout>
      <Seo title={post.title} />
      <div className="text-gray-800 mt-2 md:mt-10">
        <div className="p-2">
          <article key={post.id} className="mb-4">
            <header className="border-b-2 text-center mb-4 pb-6 dark:border-dark-border">
              <div className="flex justify-center space-x-2 mb-2">
                {post.categories.map((category) => (
                  <CategoryLabel category={category} key={category.id} />
                ))}
              </div>
              <h2 className="text-2xl md:text-4xl mb-0 dark:text-gray-200">
                <span className="bg-no-repeat bg-header bg-header-pattern">
                  {post.title}
                </span>
              </h2>
            </header>
            <div className="mb-8 border-b-2 pb-4 w-full grid align-middle grid-rows-2 md:grid-rows-1 grid-cols-2 md:grid-cols-3 dark:border-dark-border">
              {pageContext.prev != null ? (
                <Link
                  to={getSingleUrl(pageContext.prev.slug)}
                  className="text-yellow-700 hover:text-violet-500 dark:text-dark-light dark:hover:text-yellow-400 col-span-1 row-span-1 md:col-auto md:row-auto"
                >
                  ← Anterior
                </Link>
              ) : (
                <span></span>
              )}
              <span className="block text-center text-gray-500 dark:text-gray-100 row-span-2 col-start-1 col-end-3 md:col-auto md:row-auto">
                {post.publishedAt}
                {post.showUpdatedAt && (
                  <span className="italic inline-block pl-2 text-gray-400 dark:text-gray-200">
                    {" "}
                    Actualizado {post.customUpdatedAt}
                  </span>
                )}
              </span>
              {pageContext.next != null ? (
                <Link
                  to={getSingleUrl(pageContext.next.slug)}
                  className="text-yellow-700 hover:text-violet-500 block text-right dark:text-dark-light dark:hover:text-yellow-400 col-start-2 col-end-3 row-start-1 row-end-2 md:col-auto md:row-auto"
                >
                  Siguiente →
                </Link>
              ) : (
                <span></span>
              )}
            </div>
            <main>
              <div className="sm:w-3/4 mx-auto text-base font-regular font-copy leading-relaxed text-gray-700 prose lg:prose-xl 2xl:prose-2xl prose-indigo max-w-none dark:prose-dark">
                {post.seriesTitle && (
                  <SeriesNav
                    title={post.seriesTitle}
                    nav={post.seriesNav}
                    current={post.slug.current}
                  />
                )}
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
      title
      _rawBody(resolveReferences: { maxDepth: 100 })
      showUpdatedAt
      customUpdatedAt(formatString: "DD MMMM, YYYY", locale: "es")
      seriesTitle
      seriesNav {
        title
        slug {
          current
        }
      }
      categories {
        title
        id
        slug {
          current
        }
      }
      slug {
        current
      }
    }
  }
`;
