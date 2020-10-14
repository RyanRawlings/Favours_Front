import React from "react";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3)
    }
  },
  searchBar: {
    minHeight: "0.5em !important"
  }
}));

export default function Tags() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Autocomplete
        className={classes.searchBar}
        multiple
        id="tags-outlined"
        options={[]}
        getOptionLabel={option => option.title}
        defaultValue={[]}
        filterSelectedOptions
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            label=""
            placeholder="Search"
          />
        )}
      />
    </div>
  );
}
