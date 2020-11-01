import React, { Fragment } from "react";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

/***************************************************************************************************
* Summary: This component handles the rendering of the reward records stored on the public
* request
* 
* Code Attribution: 
* https://www.digitalocean.com/community/tutorials/how-to-build-a-react-to-do-app-with-react-hooks
*
* Author: Kapehe Jorgenson
*
* Comment: The structure of the todo list application within the tutorial linked above, was used
* to create the interactive reward items
****************************************************************************************************/

const useStyles = makeStyles(theme => ({
  removeButton: {
    width: "100%",
    minWidth: "100%"
  },
  removeIcon: {
    color: "red",
    fontSize: "large",
    "&:hover": {
      color: "#CC0000"
    }
  },
  listItem: {
    marginTop: "1%",
    borderRadius: "3px",
    maxWidth: "100%",
    minHeight: "50px",
    "&$listItemColumn": {
      display: "inline-block",
      verticalAlign: "middle"
    }
  },
  trashGrid: {
    marginLeft: "8%"
  }
}));

const Rewards = ({
  reward,
  index,
  removeReward,
  users,
  location,
  userData
}) => {
  const classes = useStyles();

  /*****************************************************************************************
   * Summary: An array of user information is passed as a parameter to the Rewards component
   * this array is used to determine what the email is of the user that has added a reward to
   * an existing Public Request
   ******************************************************************************************/

  const getUserEmail = (userId, type) => {
    if (users) {
      for (let i = 0; i < users.length; i++) {
        if (userId === users[i]._id && type === "column") {
          return (
            <span className={classes.listItemColumn}>{users[i].email}</span>
          );
        } else if (userId === users[i]._id && type === "value") {
          return users[i].email;
        }
      }
    } else if (userData) {
      if (type === "column") {
        return (
          <span className={classes.listItemColumn}>{userData.user.email}</span>
        );
      } else if (type === "value") {
        return userData.user.email;
      }
    } else {
      return "error";
    }
  };

  /*****************************************************************************************
   * Summary: Checks that the user context data is still valid and avialable for use
   ******************************************************************************************/

  const userDataAvailable = () => {
    try {
      if (userData.user.email) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  return (
    <Fragment>
      <Paper className={classes.listItem}>
        <ListItem>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              {reward.item ? (
                <span className={classes.listItemColumn}>{reward.item}</span>
              ) : (
                <span className={classes.listItemColumn}>
                  {reward.rewardName}
                </span>
              )}
            </Grid>
            <Grid
              className={classes.rewardQuantity}
              item
              xs={"auto"}
              xl={"auto"}
              sm={2}
            >
              {reward.quantity ? (
                <span>{reward.quantity}</span>
              ) : (
                <span>{reward.rewardQuantity}</span>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              {reward.providedBy
                ? getUserEmail(reward.providedBy, "column")
                : getUserEmail(reward.offeredBy, "column")}
            </Grid>
            {userDataAvailable() === true ? (
              (getUserEmail(reward.providedBy, "value") ===
                userData.user.email) ===
              true ? (
                <Grid item xs={12} sm={1} className={classes.trashGrid}>
                  <center>
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      className={classes.removeIcon}
                      onClick={() => removeReward(index)}
                    />
                    {/* </Button> */}
                  </center>
                </Grid>
              ) : location === "/manage_favours" ? (
                <Grid item xs={12} sm={1} className={classes.trashGrid}>
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className={classes.removeIcon}
                    onClick={() => removeReward(index)}
                  />
                </Grid>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </Grid>
        </ListItem>
      </Paper>
    </Fragment>
  );
};

export default Rewards;
