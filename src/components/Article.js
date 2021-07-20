import { Link } from "gatsby";
import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import { getSingleUrl } from "../lib/helpers";
import ExternalLinkIcon from "./Icons/External";

export const Article = ({ post }) => {
  console.log({ post });
  return (
    <article className="py-6 xl:grid xl:grid-cols-8 xl:items-baseline">
      <span className="text-gray-500 text-base block m-0 col-span-2 leading-10 dark:text-gray-200">
        Escrito el {post.publishedAt}
      </span>
      <div className="col-span-6 space-y-3">
        <h2 className="text-2xl leading-normal">
          {post.external && (
            <a
              href={post.external_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2"
            >
              {post.title}
              <ExternalLinkIcon />
            </a>
          )}
          {!post.external && (
            <Link
              to={getSingleUrl(post.slug)}
              className="text-gray-800 hover:text-yellow-700 border-blue-50 border-b-2  hover:border-yellow-700 dark:text-gray-200 dark:border-dark dark:hover:text-dark-light dark:hover:border-dark-light"
            >
              {post.title}
            </Link>
          )}
        </h2>
        <div className="prose text-base font-copy text-gray-600 dark:text-gray-200">
          <BlockContent blocks={post._rawDescription} />
        </div>
        {!post.external && (
          <div>
            <Link
              to={getSingleUrl(post.slug)}
              className="text-xl border-blue-50 border-b-2 dark:border-dark text-yellow-700 hover:border-yellow-700 dark:text-dark-light dark:hover:border-dark-light"
            >
              Leer todo →
            </Link>
          </div>
        )}
      </div>
    </article>
  );
};
