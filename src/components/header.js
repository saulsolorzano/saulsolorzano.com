import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

const Header = ({ siteTitle }) => (
	<header className="mx-4 px-10 py-2 flex items-center justify-between bg-gray-100 dark:bg-gray-900">
		<h1 className="text-2xl font-semibold dark:text-dark-copy text-gray-900">
		  <Link to="/">
			{siteTitle}
		  </Link>
		</h1>
		<nav className="space-x-4">
			<Link to="/acerca" className="dark:text-dark-copy text-gray-900 hover:text-blue-800">Acerca</Link>
			<Link to="/proyectos" className="dark:text-dark-copy text-gray-900 hover:text-blue-800">Proyectos</Link>
			<Link to="/contact" className="dark:text-dark-copy text-gray-900 hover:text-blue-800">Contacto</Link>
		</nav>
	</header>
  )
  
  Header.propTypes = {
	siteTitle: PropTypes.string,
  }
  
  Header.defaultProps = {
	siteTitle: ``,
  }
  
  export default Header;
  