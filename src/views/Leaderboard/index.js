import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./style.scss";
import LeaderboardTable from "./LeaderboardTable";
import NavMenu from "../../components/navMenu/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import Button from "@material-ui/core/Button";
import UserContext from "../../context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/*****************************************************************************************
* Summary: Live Leaderboard page, styling partially controlled by scss file as well as 
* the useStyles constant variable.
*
* Code Attribution: Material UI -> https://material-ui.com
*****************************************************************************************/
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
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
          <div className={classes.leaderboardHeading}>
            <h2>
              Live Leaderboard - Best Users
              <FontAwesomeIcon icon={faUsers} />
            </h2>
            {/*****************************************************************************************
            * Summary: If the user is not logged in, additional buttons will be rendered on screen to
            * enhance the navigation experience for anonymous users
            *****************************************************************************************/}
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
