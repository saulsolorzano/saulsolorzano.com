import React from "react";
import PropTypes from "prop-types";

import "./style.css";
import Header from "./header";
import SEO from "./seo";
import Footer from "./footer";

const Layout = ({ children }) => {
  return (
    <div className="font-primary pt-2 md:pt-4">
      <SEO></SEO>
      <Header siteTitle="Saúl Solórzano" />
      <div className="bg-white max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
