import React from "react";
import { Link } from "gatsby";
import { getSingleUrl } from "../lib/helpers";

const CategoryLabel = ({ category }) => {
  const fullSlug = `/categoria${getSingleUrl(category.slug)}`;
  return (
    <Link
      to={fullSlug}
      className="p-2 border border-gray-400 rounded-sm hover:border-yellow-400 hover:shadow dark:text-yellow-200"
    >
      {category.title}
    </Link>
  );
};
export default CategoryLabel;
