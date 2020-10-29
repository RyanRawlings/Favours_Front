import React, { useState, useEffect, useContext, Fragment }from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import * as UserAPI from "../../api/UserAPI";
import UserContext from "../../context/UserContext";

const useStyles = makeStyles(theme => ({
  button: {
    color: "black",   
    textTransform: "capitalize",
    backgroundColor: "#f6f6f6",
    "&:hover": {
      color: "white",
      border: "1px white solid"

    }
  },
  menu: {
    marginTop: "2.5%",
    width: "100%"
  }
}));

const UserGroupDropDown = ({ props }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState([]);
  const { userData } = useContext(UserContext);

  const classes = useStyles();
  const theme = useTheme();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
      setAnchorEl(null);
  };

  const handleChange = (groupId) => {
    for (let i = 0; i < groups.length; i++) {
      if (groupId === groups[i]._id) {
        console.log(groups[i]);
        setActiveGroup(groups[i].group_name);
      }
    }
  }  

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

  return (
    <div>
      <Button
        className={classes.button}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {activeGroup? "Active group: " + activeGroup.group_name : ""}
        {console.log(activeGroup)}
      </Button>
      <Fragment>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => handleClose("Parent")}
        className={classes.menu}
      >        
        {groups?
          (groups.map((item, index) => {
            return (
            <MenuItem 
              onClick={() => handleClose()}
              onChange={() => handleChange(item._id)}
              key={index}
              className={classes.menuText}              
            >{item.group_name}
            </MenuItem>
            )
            
          })) : ""          
        }        
      </Menu>
      </Fragment>
    </div>
  );
}

export default UserGroupDropDown;