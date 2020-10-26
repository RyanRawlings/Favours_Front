import React, { Fragment, useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import NavMenu from "../../components/navMenu/index";
import * as testAPI from "../../api/TestAPI";
import LoadingGif from "../../assets/images/loading.gif";
import Pagination from "../../components/pagination/index";
import FavourModal from "../../components/favourModal/index";
import LaunchIcon from "@material-ui/icons/Launch";
import SearchBar from "../../components/searchBar/index";
import { useLocation } from "react-router-dom";
import LoadingSkeleton from "../../components/loadingSkeleton/index";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import Typography from "@material-ui/core/Typography";
import * as UserAPI from "../../api/UserAPI";
import UserContext from "../../context/UserContext";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
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
    fontWeight: "bold",

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
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    overflow: "scroll",
    overflowX: "hidden",
  },
  subHeading: {
    marginTop: "2%",
    marginLeft: "1%",
  },
  container_right_bottom: {
    padding: "1% 1% 1%",
  },
  groupForm: {
    marginTop: "8%",
    marginLeft: "-40%",
    padding: "2% 2% 2%",
    maxHeight: "100%"
  },
  userList: {
    position: "static",
    width: '100%',
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

const renderRow = (props, groups) => {
  const { index, style } = props;

  return (
    <ListItem button style={style} key={index}>
      <ListItemText primary={`Item ${index + 1}`} />
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

const Settings = (props) => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [favoursPerPage, setFavoursPerPage] = useState(4);
  const location = useLocation();
  const { userData } = useContext(UserContext);
  const [groups, setGroups] = useState([]);
  const [groupUsers, setGroupUsers] = useState([]);
  const [activeGroup, setActiveGroup] = useState([]);
  const [groupUserDetails, setGroupUserDetails] = useState([]);

  useEffect(() => {
    async function getUserGroupList() {
      const userGroups = await UserAPI.getUserGroups({ userId: userData.user._id });
      
      if (userGroups) {        
        setGroups(userGroups);
        setActiveGroup(userGroups? userGroups[0] : []);
        // console.log(userGroups);      
        
        const groupUserEmails = await UserAPI.getGroupUserEmails({ groups: userGroups });
        console.log("response from backend", groupUserEmails);
        
        if(groupUserEmails.length > 0) {
            setGroupUserDetails(groupUserEmails);
            setGroupUsers(groupUserEmails[0]['users']);
        } else {
            let defaultGroup = [{
                create_time: "",
                department: "",
                group_name: "",
                image_url: "",
                location: {
                  country: "",
                  state: "",
                  suburb: "",
                  postcode: ""
                },
                parentGroupId: "",
                _id: ""

            }]

            let defaultUsers = [{
              emails: "",
            }];

            setGroups(defaultGroup)
            setGroupUsers(defaultUsers);
        }
        
      }
    }
  
    getUserGroupList();
  }, []);

  const classes = useStyles();

  // console.log("Active Group: ", activeGroup);
  // console.log("Group Users: ", groupUsers);

  const handleGroupUpdate = (groupId) => {
    for (let i = 0; i < groups.length; i++) {
      if (groupId === groups[i]._id) {
        setActiveGroup(groups[i]);
        if (groupUserDetails) {
          setGroupUsers(groupUserDetails[i]['users']);
        }
        
      }
    }
  }

  console.log("active group", activeGroup);
  console.log("group details", groupUserDetails);
  return (
    <div className={classes.root}>
      <div className="container">
        <NavMenu props={props} />
        <div className="container_right">
          <Paper className={classes.container}>
            <div className={classes.container_right_bottom}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <div className={classes.heading}>User Settings</div>                          
                  <div className={classes.subHeading}><Typography>Your Groups</Typography></div>                
                  <List component="nav" className={classes.listComponent} aria-label="contacts">    
                  {console.log(activeGroup)}
                  {console.log("groups: ", groups)}              
                    {groups?
                      groups.map((item, index) => (
                          <ListItem style={{backgroundColor: activeGroup._id === item._id? "#f6f6f6": "white"}} key={index} button>
                            <ListItemText onClick={() => handleGroupUpdate(item._id)} primary={item.group_name} key={index}/>
                          </ListItem>                
                    )) : ""}   
                    </List>    
                </Grid>                  
                {groups.group_name !== undefined && groups.length === 1? "":
                <Grid item xs={12} sm={6}>
                <Paper className={classes.groupForm}>                
                  <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="h6">Group Details</Typography>
                      </Grid>                      
                      <Grid item xs={6}>
                        <TextField value={groups.group_name !== undefined && groups.length === 1? "" : activeGroup? activeGroup.group_name : ""} variant="outlined" label="Group name" InputLabelProps={{shrink:true}}/>
                      </Grid>
                      <Grid item xs={6}> 
                        <TextField value={groups.group_name !== undefined && groups.length === 1? "" : activeGroup? activeGroup.department: ""} variant="outlined" label="Department" InputLabelProps={{shrink:true}}/>
                      </Grid>
                    </Grid>   
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="h6">Address Details</Typography>                  
                      </Grid>
                      <Grid item xs={3}>
                          <TextField value={groups.group_name !== undefined && groups.length === 1? "": activeGroup.location? activeGroup.location.suburb: ""} variant="outlined" label="Suburb" InputLabelProps={{shrink:true}}/>
                        </Grid>
                        <Grid item xs={3}>
                        <TextField value={groups.group_name !== undefined && groups.length === 1? "": activeGroup.location? activeGroup.location.state: ""} variant="outlined" label="State" InputLabelProps={{shrink:true}}/>
                        </Grid>
                        <Grid item xs={3}>
                        <TextField value={groups.group_name !== undefined && groups.length === 1? "": activeGroup.location? activeGroup.location.country: ""} variant="outlined" label="Country" InputLabelProps={{shrink:true}}/>
                        </Grid>
                        <Grid item xs={3}>
                        <TextField value={groups.group_name !== undefined && groups.length === 1? "": activeGroup.location? activeGroup.location.postcode: ""} variant="outlined" label="Postcode" InputLabelProps={{shrink:true}}/>
                        </Grid>                        
                        </Grid>
                        <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Typography variant="h6">Users in Group</Typography>
                        </Grid>
                          <Grid item xs={12} sm={6}>
                          <Autocomplete
                            id="combo-box-demo"
                            options={groupUsers}
                            getOptionLabel={(option) => option}
                            style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="User Emails" variant="outlined" />}
                          />
                          </Grid>
                        </Grid>
                      </Paper>                      
                      </Grid>
                      }
                </Grid>  
                                                                       
              </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default Settings;