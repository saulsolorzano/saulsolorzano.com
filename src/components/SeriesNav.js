import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { getSingleUrl } from "../lib/helpers";

const SeriesNav = ({ title, nav, current }) => {
  return (
    <div className="bg-gray-100 w-full md:w-10/12 m-auto border series-index dark:bg-gray-800 dark:border-gray-700">
      <span className="font-bold m-0 py-2 px-5 block text-blue-700 dark:text-blue-500">
        {title}
      </span>
      {nav.map((item, index) => (
        <span
          className="block m-0 py-1 px-5 border-t border-gray-200 font-bold dark:border-gray-600"
          key={item.title}
        >
          {current === item.slug.current && (
            <Link to={getSingleUrl(item.slug)} className="current">
              {index + 1}. {item.title}
            </Link>
          )}
          {current !== item.slug.current && (
            <Link to={getSingleUrl(item.slug)}>
              {index + 1}. {item.title}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
};

SeriesNav.propTypes = {
  title: PropTypes.string,
  nav: PropTypes.array,
  current: PropTypes.string,
};

export default SeriesNav;
