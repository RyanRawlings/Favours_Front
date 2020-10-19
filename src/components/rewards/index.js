import React, { Fragment, useState, useContext } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import UserContext from "../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  removeButton: {
    width: "100%",
    minWidth: "100%"
  },
  removeIcon: {
    color: "red",
    fontSize: "large",
    "&:hover": {
      color: "#CC0000",
    }
    
  },
  listItem: {
    marginTop: "1%",    
    borderRadius: "3px",
    maxWidth: "100%",
    minHeight: "50px",
    '&$listItemColumn': {
        display: 'inline-block',
        verticalAlign: 'middle'
    }
  },
  trashGrid: {
    marginLeft: "8%"
  }

}));

export default function Rewards({ reward, index, removeReward, users, location }) {
  // console.log(reward)
  const classes = useStyles();

  const { userData, setUserData } = useContext(UserContext);

  const getUserEmail = (userId, type) => {
    // Evaluate reward user id against data retrieved from db, and return relevant email
    console.log("Users: ", users, "UserId: ", userId);
    if (users) {
      for (let i = 0; i < users.length; i++) {
        if (userId === users[i]._id && type === "column") {
          return (<span className={classes.listItemColumn}>{users[i].email}</span>);
        } else if (userId === users[i]._id && type === "value") {
          return users[i].email;
        }
      }
    } else {
      return (<span className={classes.listItemColumn}>{userData.user.email}</span>);
    }   
  }

  // console.log(location.pathname);

  return (
      <Fragment>        
        <Paper className={classes.listItem}>
        <ListItem>        
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              {reward.item? 
              <span className={classes.listItemColumn}>{reward.item}</span>: <span className={classes.listItemColumn}>{reward.rewardName}</span>}
            </Grid>
            <Grid className={classes.rewardQuantity} item xs={'auto'} xl={'auto'} sm={2}>
              {reward.quantity? <span>{reward.quantity}</span>:<span>{reward.rewardQuantity}</span>}              
            </Grid>
            <Grid item xs={12} sm={4}>
              {reward.providedBy? getUserEmail(reward.providedBy, "column") : getUserEmail(reward.offeredBy, "column")}
            </Grid> 
            {/* {console.log(getUserEmail(reward.providedBy, "value"), userData.user.email)} */}
            {getUserEmail(reward.providedBy, "value") === userData.user.email?
            <Grid item xs={12} sm={1}>
            <center>
              {/* <Button className={classes.removeButton}
                variant="contained"                
              > */}
                <FontAwesomeIcon icon={faTimesCircle} className={classes.removeIcon}
              onClick={() => removeReward(index)}/>
              {/* </Button> */}
              </center>
            </Grid>: location === "/all_list"?
            <Grid item xs={12} sm={1} className={classes.trashGrid}>
              {/* <Button className={classes.removeButton}
                variant="contained"                
              > */}
                <FontAwesomeIcon icon={faTimesCircle} className={classes.removeIcon}
              onClick={() => removeReward(index)}/>
              {/* </Button> */}
            </Grid> : ""
            }       
          </Grid>
        </ListItem>
        </Paper>
      </Fragment>
    );
  }