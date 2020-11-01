import React from "react";
import Button from "@material-ui/core/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as UserAPI from "../../api/UserAPI";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";

/*****************************************************************************************
* Summary: Party detection component, can be triggered across many pages
*
* Code Attribution: 
* - https://material-ui.com/
* - https://www.npmjs.com/package/react-toastify
* - https://reactrouter.com/web/guides/quick-start
*
******************************************************************************************/

const useStyles = makeStyles(theme => ({
  partyDetection: {
    fontSize: "10px",
    textTransform: "capitalize",
    marginTop: "10%",
    display: "inline",
    whiteSpace: "nowrap",
    maxHeight: "30px",
    dislay: "inline"
  }
}));

const PartyDetection = ({ userData }) => {
  const classes = useStyles();
  const location = useLocation();

/*****************************************************************************************
* partyDetection API returns an array of user emails, the current user should create a
* party with
******************************************************************************************/  
  const handlePartyDetection = async () => {
    try {
      const partyDetection = await UserAPI.partyDetection({
        _id: userData.user._id
      });

      if (
        partyDetection !== null &&
        partyDetection !== undefined &&
        partyDetection.length > 0 &&
        partyDetection.length !== 1
      ) {
        let partyString = partyDetection.join(", ");
        toast.success("You should create a \nparty with " + partyString);
      } else {
        toast.error("No party members to suggest. Start creating some Favours");
      }
    } catch (error) {
      toast.error("There was an error generating the party " + error);
    }
  };

  return (
    <>
      {location && (location.pathname === "/manage_favours" || location.pathname === "/public_request") ? (
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
      ) : (
        ""
      )}
      <Button
        onClick={() => handlePartyDetection()}
        color="primary"
        variant="contained"
        className={classes.partyDetection}
        style={{
          backgroundColor:
            location.pathname !== "/profile" ? "#e0e0e0" : "#3f51b5",
          color: location.pathname !== "/profile" ? "black" : "white",
          textTransform:
            location.pathname !== "/profile" ? "uppercase" : "capitalize",
          fontSize: location.pathname !== "/profile" ? "0.875rem" : "10px",
          maxHeight: location.pathname !== "/profile" ? "100%" : "30px",
          marginTop:
            location.pathname === "/public_request" ||
            location.pathname === "/multi_repay"
              ? "0%"
              : location.pathname !== "/profile"
              ? "5%"
              : "10%",
          marginLeft:
            location.pathname === "/public_request"
              ? "1%"
              : location.pathname !== "/profile"
              ? "0%"
              : "0%"
        }}
      >
        Party Detection
      </Button>
    </>
  );
};

export default PartyDetection;
