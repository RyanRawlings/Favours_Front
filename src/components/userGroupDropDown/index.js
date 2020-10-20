import React, { useState, useEffect }from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import * as UserAPI from "../../api/UserAPI";

const useStyles = makeStyles(theme => ({
  button: {
    color: "white",
    fontSize: "20px"
  },
  menu: {
    marginTop: "2%",
  }
}));

const GroupDropDown = ({ props, userData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState([]);

  const classes = useStyles();
  const theme = useTheme();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        {activeGroup? activeGroup.group_name : ""}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
      >
        {groups?
          groups.map((item, index) => (
            <MenuItem 
              onClick={handleClose}
              key={index}
            >{item.group_name}
            </MenuItem>
          )) : ""          
        }
      </Menu>
    </div>
  );
}

export default GroupDropDown;