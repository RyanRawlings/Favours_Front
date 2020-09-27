import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  container: {
    margin: "2px"
  },
  icons: {
    transform: "translateY(-0.1em)"
  },
  listlinks: {  
    textDecoration: "none",
  },
}));

export default function IOUListButtonGroup() {
  const classes = useStyles();
  const [tag, setTag] = useState(0);
  return (
        <div className={classes.listlinks}>
            <ButtonGroup>
              <Button href={'/all_list'}>All</Button>
              <Button href={'/all_list/debit_list'}>Debit</Button>
              <Button href={'/all_list/credit_list'}>Credit</Button>
            </ButtonGroup>
        </div>
     );
}
