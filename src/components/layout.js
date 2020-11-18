import React from "react";
import PropTypes from "prop-types";

import "./style.css";
import Header from "./header";

const Layout = ({ children }) => {
	return (
	  <div className="font-primary bg-indigo-200 dark:bg-highlight pt-4">
	  	<Header siteTitle="Saúl Solórzano" />
		<div className="bg-gray-100 dark:bg-gray-900 mx-auto w-3/5">
		  <main>{children}</main>
		</div>
	  </div>
	)
  }
  
  Layout.propTypes = {
	children: PropTypes.node.isRequired,
  }
  
  export default Layout