import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import DarkMode from "./darkMode";

const Header = ({ siteTitle }) => {
  return (
    <header className="px-2 md:mx-4 md:px-10 py-2 flex items-end md:items-center justify-between dark:bg-dark">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 leading-tight hover:text-yellow-700 dark:hover:text-yellow-700 pr-6 md:pr-0">
        <Link to="/">
          <span className="bg-bottom bg-no-repeat bg-header bg-header-pattern">
            {siteTitle}
          </span>
        </Link>
        <small className="block text-sm font-light text-gray-500 dark:text-gray-200">
          Full-Stack Developer
        </small>
      </h1>
      <nav className="md:space-x-4 grid grid-cols-2 grid-rows-2 md:flex items-center">
        <Link
          to="/"
          className="text-gray-900 text-base hover:text-violet-500 dark:text-gray-100 dark:hover:text-dark-light col-start-1 col-end-2 md:col-auto md:row-auto row-start-2 row-end-3"
        >
          Home
        </Link>
        <Link
          to="/acerca"
          className="text-gray-900 text-base hover:text-violet-500 dark:text-gray-100 dark:hover:text-dark-light col-start-2 col-end-3 md:col-auto md:row-auto row-start-2 row-end-3"
        >
          Acerca
        </Link>
        <DarkMode />
      </nav>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
