import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LocalActivityIcon from "@material-ui/icons/LocalActivity";
import { BrowserRouter, Link } from "react-router-dom";


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
  }
}));

export default function NavMenu() {
  const classes = useStyles();
  const [tag, setTag] = useState(0);
  return (
    <>
    <div className={classes.root}>
      <div className="container">
        <Paper className={classes.container}>
          <div className="container_left">
            <div>
              <h2>Favours</h2>
            </div>
            <Link to={"/public_request"}>
            <div className="drawer_item">
              <div className="drawer_item_icon">
                <EmojiPeopleIcon
                  className={classes.icons}
                  color="action"
                ></EmojiPeopleIcon>
              </div>
              <div className="drawer_item_words">Public Request</div>
            </div>
            </Link>
            <Link to={"/credit_list"}>
            <div className="drawer_item">
              <div className="drawer_item_icon">
                <ListAltIcon
                  className={classes.icons}
                  color="action"
                ></ListAltIcon>
              </div>
              <div className="drawer_item_words">IOU List</div>
            </div>
            </Link>
            <Link to={'/profile'}>
            <div className="drawer_item">
              <div className="drawer_item_icon">
                <AccountBoxIcon
                  className={classes.icons}
                  color="action"
                ></AccountBoxIcon>
              </div>              
              <div className="drawer_item_words">Profile</div>
              </div>
            </Link>
            <Link to={'/leaderboard'}>
            <div className="drawer_item">
              <div className="drawer_item_icon">
                <LocalActivityIcon
                  className={classes.icons}
                  color="action"
                ></LocalActivityIcon>
              </div>
              <div className="drawer_item_words">Leaderboard</div>
            </div>
            </Link>
            <Link to={'/testing'}>
            <div className="drawer_item">
              <div className="drawer_item_icon">
                <LocalActivityIcon
                  className={classes.icons}
                  color="action"
                ></LocalActivityIcon>
              </div>
              <div className="drawer_item_words">Test Module</div>
            </div>
            </Link>
          </div>          
        </Paper>
    </div>
    </div>
    </>
  );
}
