import { graphql } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

const AboutPage = ({ data }) => {
  return (
    <Layout>
      <SEO />
      <div className="text-gray-800 md:mt-10 dark:text-gray-200">
        <div className="p-2">
          <article className="mb-4">
            <main className="">
              <div className="text-center mb-10 md:w-72 m-auto">
                <Img
                  fluid={data.file.childImageSharp.fluid}
                  className="rounded-full m-auto"
                />
              </div>
              <div className="w-full md:w-3/4 mx-auto text-base font-regular font-copy leading-relaxed text-gray-700 prose lg:prose-xl prose-indigo max-w-none dark:prose-dark dark:text-gray-200">
                <h2 className="text-center">¡Hola!</h2>
                <p>
                  Soy un desarrollador <strong>Full-stack</strong> y consultor
                  de Caracas, Venezuela viviendo actualmente en
                  <strong> Santiago de Chile</strong>.
                </p>
                <p>
                  Me gusta mucho trabajar en PHP usando{" "}
                  <a
                    href="https://laravel.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Laravel
                  </a>{" "}
                  como framework. En el front-end me gusta trabajar con{" "}
                  <a href="https://vuejs.org/" target="_blank" rel="noreferrer">
                    Vue.js
                  </a>
                  .
                </p>
              </div>
            </main>
          </article>
        </div>
      </div>
    </Layout>
  );
};
export default AboutPage;

export const query = graphql`
  query {
    file(relativePath: { eq: "saul.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 300, maxHeight: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
