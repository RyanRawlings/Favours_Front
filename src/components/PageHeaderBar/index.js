import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { useLocation, Link } from "react-router-dom";

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

const getTitle = location => {
  switch (location) {
    case "/":
      return "Public Requests";
    case "/public_request":
      return "Public Requests";
    case "/credit_list":
      return "IOU List";
    case "/profile":
      return "My Profile";
    case "/leaderboard":
      return "Leaderboard";
  }
};

export default function PageHeaderBar() {
  const classes = useStyles();
  const location = useLocation();

  return (
    <div className={classes.root}>
      <div className="container">
        <div className="container_right">
          <Paper className={classes.container}>
            <div className="container_right_top">
              <div>{getTitle(location.pathname)}</div>
              <Link to={"/profile"}>
                <div>
                  <Avatar></Avatar>
                </div>
              </Link>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}
