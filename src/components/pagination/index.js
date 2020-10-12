import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles({
    ul: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
    },
  });

const FavoursPagination = ({ favoursPerPage, totalFavours, paginate }) => {    
    const classes = useStyles();
    const [page, setPage] = useState(1);

    const pageNumbers = [];    
    for (let i = 1; i <= Math.ceil(totalFavours / favoursPerPage); i++) {
            pageNumbers.push(i);        
    }
    const pages = pageNumbers.length > 0? pageNumbers.length : null;

    const handleChange = (event,value) => {        
        setPage(value);
        paginate(value);
    }

    return <Pagination 
            count={pages} 
            page={page} 
            onChange={handleChange} 
            />
}

export default FavoursPagination;