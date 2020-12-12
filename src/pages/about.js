import { Link } from "gatsby";
import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";

const IndexPage = () => {
  return (
    <Layout>
      <div className="text-gray-800 mt-10">
        <div className="p-2">
          <article className="mb-4">
            <header className="border-b-2 text-center mb-12 pb-6">
              <span className="text-gray-500 text-xs block m-0 leading-tight"></span>
              <h2 className="text-3xl mb-4">Saúl Solórzano</h2>
            </header>
            <main className="">
              <div className="w-3/4 mx-auto text-base font-regular font-copy leading-relaxed text-gray-700 prose lg:prose-xl prose-indigo max-w-none">
                hola
              </div>
            </main>
          </article>
        </div>
      </div>
    </Layout>
  );
};
export default IndexPage;
