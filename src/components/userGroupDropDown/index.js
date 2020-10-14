import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    color: "white",
    fontSize: "20px"
  },
  menu: {
    marginTop: "2%"
  }
}));

export default function GroupDropDown() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const theme = useTheme();
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        className={classes.button}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        UTS
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
      >
        <MenuItem onClick={handleClose}>UTS</MenuItem>
        <MenuItem onClick={handleClose}>
          UTS - Advanced Internet Programming
        </MenuItem>
        <MenuItem onClick={handleClose}>
          UTS - Applications Programming
        </MenuItem>
      </Menu>
    </div>
  );
}
