import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';


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
  filterIcon_debit: {
    marginLeft: "10%",
    color: "#32CD32"
    },
  filterIcon_credit: {
    marginLeft: "10%",
    color: "red"
    }

}));

export default function IOUListButtonGroup() {
  const classes = useStyles();
  return (
        <div className={classes.listlinks}>
            <ButtonGroup className={classes.buttons}>
              <Button href={'/all_list'}>All</Button>
              <Button href={'/all_list/debit_list'}>Debit <FontAwesomeIcon className={classes.filterIcon_debit} icon={faThumbsUp} /></Button>
              <Button href={'/all_list/credit_list'}>Credit <FontAwesomeIcon className={classes.filterIcon_credit} icon={faThumbsDown} /></Button>
            </ButtonGroup>
        </div>
     );
}
