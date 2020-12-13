import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

const Header = ({ siteTitle }) => (
  <header className="px-2 md:mx-4 md:px-10 py-2 flex items-center justify-between bg-white">
    <h1 className="text-3xl font-semibold text-gray-900 leading-tight hover:text-yellow-700">
      <Link to="/">{siteTitle}</Link>
      <small className="block text-sm font-light text-gray-500">
        Full-Stack Developer
      </small>
    </h1>
    <nav className="space-x-4">
      <Link
        to="/acerca"
        className="text-gray-900 text-base hover:text-violet-500"
      >
        Acerca
      </Link>
      {/* <Link to="/proyectos" className="text-gray-900 text-base hover:text-violet-500">Proyectos</Link> */}
      {/* <Link
        to="/contact"
        className="text-gray-900 text-base hover:text-violet-500"
      >
        Contacto
      </Link> */}
    </nav>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
