import React from "react";
import PropTypes from "prop-types";

import "./style.css";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <div className="font-primary pt-2 md:pt-4">
      <Header siteTitle="Saúl Solórzano" />
      <div className="bg-white mx-auto md:w-3/5">
        <main>{children}</main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
