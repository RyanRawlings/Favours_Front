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
import FavoursListButtonGroup from "../../components/favoursListButtonGroup/index";
import * as testAPI from "../../api/TestAPI";
import LoadingGif from "../../assets/images/loading.gif";
import Pagination from "../AllIOUList/Pagination";
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

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  container: {
    marginLeft: "1%",
    marginRight: "1%",
    marginTop: "-0.5%"
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
    height: "90vh"
  },
  groupForm: {
    marginTop: "8%",
    marginLeft: "-40%",
    padding: "2% 2% 2%"
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
  const [activeGroup, setActiveGroup] = useState([]);

  useEffect(() => {
    async function getUserGroupList() {
      const userGroups = await UserAPI.getUserGroups({ userId: userData.user._id });
      
      if (userGroups) {
        console.log(userGroups);
        setGroups(userGroups);
        setActiveGroup(userGroups[0]? userGroups[0] : []);
      }
      
    }
  
    getUserGroupList();
  }, []);

  const classes = useStyles();

  console.log("Active Group: ", activeGroup);

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
                    {groups.length > 0? 
                      groups.map((item, index) => (
                          <ListItem style={{backgroundColor: activeGroup._id === item._id? "#f6f6f6": "white"}} key={index} button>
                            <ListItemText primary={item.group_name} key={index}/>
                          </ListItem>                
                    )) : ""                
                    }   
                    </List>    
                </Grid>  
                <Grid item xs={12} sm={6}>
                <Paper className={classes.groupForm}>                
                  <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="h6">Group Details</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField value={activeGroup? activeGroup.group_name : ""} variant="outlined" label="Group name" InputLabelProps={{shrink:true}}/>
                      </Grid>
                      <Grid item xs={6}> 
                        <TextField value={activeGroup? activeGroup.department : ""} variant="outlined" label="Department" InputLabelProps={{shrink:true}}/>
                      </Grid>
                    </Grid>   
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="h6">Address Details</Typography>                  
                      </Grid>
                      <Grid item xs={3}>
                          <TextField value={activeGroup.location? activeGroup.location.suburb : ""} variant="outlined" label="Suburb" InputLabelProps={{shrink:true}}/>
                        </Grid>
                        <Grid item xs={3}>
                        <TextField value={activeGroup.location? activeGroup.location.state : ""} variant="outlined" label="State" InputLabelProps={{shrink:true}}/>
                        </Grid>
                        <Grid item xs={3}>
                        <TextField value={activeGroup.location? activeGroup.location.country : ""} variant="outlined" label="Country" InputLabelProps={{shrink:true}}/>
                        </Grid>
                        <Grid item xs={3}>
                        <TextField value={activeGroup.location? activeGroup.location.postcode : ""} variant="outlined" label="Postcode" InputLabelProps={{shrink:true}}/>
                        </Grid>                        
                        </Grid>
                        <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Typography variant="h6">Users in Group</Typography>
                        </Grid>
                          <Grid item xs={12} sm={6}>
                          <List component="nav" className={classes.listComponent} aria-label="contacts">
                              {groups.length > 0? 
                                groups.map((item, index) => (
                                    <ListItem style={{backgroundColor: activeGroup._id === item._id? "#f6f6f6": "white"}} key={index} button>
                                      <ListItemText primary={item.group_name} key={index}/>
                                    </ListItem>                
                              )) : ""                
                              }   
                              </List>   
                          </Grid>
                        </Grid>
                      </Paper>
                      
                      </Grid>                 
                </Grid>                                                         
              </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default Settings;