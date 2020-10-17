import React, { useState } from "react";
import clsx from "clsx";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import { Paper, Button, Input } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: 500
    // "& > * + *": {
    //   marginTop: theme.spacing(3)
    // }
  },
  search: {
    flexGrow: 1,
    height: 42,
    padding: theme.spacing(0, 2),
    display: "flex",
    alignItems: "center"
  },
  searchIcon: {
    marginRight: theme.spacing(2),
    color: theme.palette.icon
  },
  searchInput: {
    flexGrow: 1
  },
  searchButton: {
    marginLeft: theme.spacing(2)
  }
}));

export default function SearchBar(props) {
  const { onSearch, placeHolder, className, ...rest } = props;
  const [inputVal, setInputVal] = useState("");
  const classes = useStyles();
  const handleKeyUp = e => {
    if (e.keyCode === 13) {
      //is enter pressed
      onSearch(inputVal);
    }
  };
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Paper className={classes.search} elevation={1}>
        <SearchIcon className={classes.searchIcon} />
        <Input
          className={classes.searchInput}
          disableUnderline
          placeholder={placeHolder || "Search"}
          onChange={e => setInputVal(e.target.value)}
          onKeyUp={handleKeyUp}
        />
      </Paper>

      <Button
        className={classes.searchButton}
        onClick={() => onSearch(inputVal)}
        size="medium"
        variant="contained"
      >
        Search
      </Button>
    </div>
  );
}
