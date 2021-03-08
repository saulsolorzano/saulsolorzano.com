import PropTypes from "prop-types";
import React from "react";
import Footer from "./footer";
import Header from "./header";
import "./style.css";


const Layout = ({ children }) => {
  return (
    <div className="font-primary pt-2 md:pt-4 dark:bg-dark">
      <Header siteTitle="Saúl Solórzano" />
      <div className="bg-white max-w-5xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0 dark:bg-dark">
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
