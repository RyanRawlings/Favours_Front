import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import NavMenu from "../../components/navMenu/index";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import * as UserAPI from "../../api/UserAPI";
import UserContext from "../../context/UserContext";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

  /**************************************************************************
  * Summary: This component is a way of the user finding out more details
  * about the groups that they are in including the emails of other users
  * 
  * Comment: Customised page structure using the Material UI component
  * library
  ***************************************************************************/

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  container: {
    marginLeft: "1%",
    marginRight: "1%",
    marginTop: "-0.5%",
    height: "100vh"
  },
  card_container: {
    margin: "20px",
    position: "relative",
    top: "0",
    transition: "top ease 0.5s",
    "&:hover": {
      top: "-10px",
      boxShadow: "3px 3px 5px 3px #ccc"
    }
  },
  icons: {
    transform: "translateY(-0.1em)"
  },
  btnBox: {
    marginLeft: "1%",
    marginTop: "1%"
  },
  heading: {
    marginTop: "1%",
    fontSize: "18px",
    fontWeight: "bold"
  },
  trashIcon: {
    color: "red"
  },
  button: {
    display: "inline-block"
  },
  modal: {
    display: "inline-block"
  },
  createbutton: {
    display: "inline"
  },
  createbutton_styling: {
    marginTop: "1%",
    marginLeft: "1%",
    backgroundColor: "#292F36",
    textTransform: "capitalize",
    verticalAlign: "middle",
    textAlign: "center",
    height: "35px",
    justifyContent: "center",
    "&:hover": {
      color: "black",
      backgroundColor: "white"
    }
  },
  searchBar: {
    display: "inline-block",
    marginLeft: "1%"
  },
  listComponent: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    overflow: "scroll",
    overflowX: "hidden"
  },
  subHeading: {
    marginTop: "2%",
    marginLeft: "1%"
  },
  container_right_bottom: {
    padding: "1% 1% 1%"
  },
  groupForm: {
    marginTop: "8%",
    marginLeft: "-40%",
    padding: "2% 2% 2%",
    maxHeight: "100%"
  },
  userList: {
    position: "static",
    width: "100%",
    maxWidth: 360,
    minHeight: "80px",
    maxHeight: "100%",
    height: "40%",
    overflow: "scroll",
    overflowX: "hidden",
    backgroundColor: theme.palette.background.paper,
    border: "1px #dfdfdf solid"
  }
}));


const Settings = props => {
  const { userData } = useContext(UserContext);
  const [groups, setGroups] = useState([]);
  const [groupUsers, setGroupUsers] = useState([]);
  const [activeGroup, setActiveGroup] = useState([]);
  const [groupUserDetails, setGroupUserDetails] = useState([]);
  const classes = useStyles();


/**********************************************************************
* The API call in the useEffect hook is wrapped in a try catch, 
* that will fire a toast error message if there was any issue getting
* the data
***********************************************************************/  
  useEffect(() => {
    async function getUserGroupList() {
      try {
        const userGroups = await UserAPI.getUserGroups({
          userId: userData.user._id
        });
        
        /**********************************************************************
        * By default all users are created with the same default group (UTS) so 
        * there will always be at least one group to select as the active group
        ***********************************************************************/
        if (userGroups) {
          setGroups(userGroups);        
          setActiveGroup(userGroups ? userGroups[0] : []);
  
          const groupUserEmails = await UserAPI.getGroupUserEmails({
            groups: userGroups
          });
  
          if (groupUserEmails.length > 0) {
            setGroupUserDetails(groupUserEmails);
            setGroupUsers(groupUserEmails[0]["users"]);
          } else {
            console.log("No users were returned for the group");
          }
        }
      } catch (err) {
        toast.error("Error occurred retrieving the data, please refresh the page");
      }      
    }
    getUserGroupList();
  }, [userData.user._id]);

  /**************************************************************************
  * Summary: Handles the on click event between the groups available to the
  * user. This change will trigger a re-render of the data
  ***************************************************************************/  
  const handleGroupUpdate = groupId => {
    for (let i = 0; i < groups.length; i++) {
      if (groupId === groups[i]._id) {
        setActiveGroup(groups[i]);
        if (groupUserDetails) {
          setGroupUsers(groupUserDetails[i]["users"]);
        }
      }
    }
  };

  return (
    <div className={classes.root}>
      <div className="container">
        <NavMenu props={props} />
        <div className="container_right">
          <Paper className={classes.container}>
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
            <div className={classes.container_right_bottom}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <div className={classes.heading}>User Settings</div>
                  <div className={classes.subHeading}>
                    <Typography>Your Groups</Typography>
                  </div>
                  <List
                    component="nav"
                    className={classes.listComponent}
                    aria-label="contacts"
                  >
                    {groups
                      ? groups.map((item, index) => (
                          <ListItem
                            style={{
                              backgroundColor:
                                activeGroup._id === item._id
                                  ? "#f6f6f6"
                                  : "white"
                            }}
                            key={index}
                            button
                          >
                            <ListItemText
                              onClick={() => handleGroupUpdate(item._id)}
                              primary={item.group_name}
                              key={index}
                            />
                          </ListItem>
                        ))
                      : ""}
                  </List>
                </Grid>
                {/****************************************************************
                * Checks whether the activeGroup.location property has value, 
                * won't render the Grid on screen until the relevant data is 
                * available
                *****************************************************************/}
                {activeGroup.location? (
                  <Grid item xs={12} sm={6}>
                    <Paper className={classes.groupForm}>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Typography variant="h6">Group Details</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            value={activeGroup.group_name}
                            variant="outlined"
                            label="Group name"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            value={activeGroup.department}
                            variant="outlined"
                            label="Department"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Typography variant="h6">Address Details</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            value={activeGroup.location.suburb}
                            variant="outlined"
                            label="Suburb"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            value={activeGroup.location.state}
                            variant="outlined"
                            label="State"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            value={activeGroup.location.country}
                            variant="outlined"
                            label="Country"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            value={activeGroup.location.postcode}
                            variant="outlined"
                            label="Postcode"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Typography variant="h6">Users in Group</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          {/********************************************************
                           * Autocomplete component used so to minimise the overflow
                           * of the user emails display in the details section. 
                          **********************************************************/}
                          <Autocomplete
                            id="combo-box-demo"
                            options={groupUsers}
                            getOptionLabel={option => option}
                            style={{ width: 300 }}
                            renderInput={params => (
                              <TextField
                                {...params}
                                label="User Emails"
                                variant="outlined"
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                ):(
                  ""
                )}
              </Grid>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Settings;
