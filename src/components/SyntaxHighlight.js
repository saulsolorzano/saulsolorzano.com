import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import dracula from "./dracula-custom";

export default ({ node }) => {
  if (!node || !node.code) {
    return null;
  }
  const { language, code } = node;
  return (
    <SyntaxHighlighter style={dracula} language={language || "text"}>
      {code}
    </SyntaxHighlighter>
  );
};
