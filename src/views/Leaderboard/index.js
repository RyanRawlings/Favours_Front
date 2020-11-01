import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./style.scss";
import LeaderboardTable from "./LeaderboardTable";
import NavMenu from "../../components/navMenu/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import Button from "@material-ui/core/Button";
import UserContext from "../../context/UserContext";

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
  leaderboardHeading: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    whiteSpace: "nowrap"
  },
  homeButton: {
    display: "inline",
    marginLeft: "10%",
    marginTop: "4%",
    whiteSpace: "nowrap"
  },
  publicRequestButton: {
    display: "inline",
    marginLeft: "1%",
    marginTop: "4%",
    whiteSpace: "nowrap"
  },
  anonymousButtonGroup: {
    display: "flex"
  }
}));

const Leaderboard = props => {
  const classes = useStyles();
  const { userData } = useContext(UserContext);

  return (
    <div className={classes.root}>
      <div className="container">
        <NavMenu props={props} />
        <div className="container_right">
          <div className={classes.leaderboardHeading}>
            <h2>
              Live Leaderboard - Best Users
              <FontAwesomeIcon icon={faUsers} />
            </h2>
            {userData.user ? (
              ""
            ) : (
              <div className={classes.anonymousButtonGroup}>
                <div className={classes.homeButton}>
                  <Button variant="contained" href={"/home"}>
                    {" "}
                    Back to Home
                  </Button>
                </div>
                <div className={classes.publicRequestButton}>
                  <Button variant="contained" href={"/public_request"}>
                    View Public Requests
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className="leaderboard-table">
            <LeaderboardTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
