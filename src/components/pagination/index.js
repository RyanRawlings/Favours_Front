import React, { useState } from "react";
import Pagination from "@material-ui/lab/Pagination";

/*****************************************************************************************
 * Code Attribution:
 * Author: Traversy Media
 * Title: Simple Frontend Pagination
 * URL: https://www.youtube.com/watch?v=IYCa1F-OWmk
 * Comment: Updated to use Material UI pagination
 ******************************************************************************************/

const FavoursPagination = ({ favoursPerPage, totalFavours, paginate }) => {
  const [page, setPage] = useState(1);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalFavours / favoursPerPage); i++) {
    pageNumbers.push(i);
  }
  const pages = pageNumbers.length > 0 ? pageNumbers.length : null;

  const handleChange = (event, value) => {
    setPage(value);
    paginate(value);
  };

  return <Pagination count={pages} page={page} onChange={handleChange} />;
};

export default FavoursPagination;
