import React from "react";
import Code from "./SyntaxHighlight";

const serializers = {
  types: {
    code: Code,
  },
  marks: {
    internalLink: ({ mark, children }) => {
      const { slug = {} } = mark.reference;
      const href = `/${slug.current}`;
      return <a href={href}>{children}</a>;
    },
    externalLink: ({ mark, children }) => {
      const { blank, href } = mark;
      return blank ? (
        <a href={href} target="_blank" rel="noopener nofollow noreferrer">
          {children}
        </a>
      ) : (
        <a href={href}>{children}</a>
      );
    },
  },
};

export default serializers;
