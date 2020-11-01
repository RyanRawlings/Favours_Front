import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LocalActivityIcon from "@material-ui/icons/LocalActivity";
import { useLocation, Link } from "react-router-dom";
import LoginSignupButtonGroup from "../loginSignupButtonGroup/index";
import SettingsIcon from "@material-ui/icons/Settings";
import UserContext from "../../context/UserContext";
import Cookies from "js-cookie";
import PaymentIcon from "@material-ui/icons/Payment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { delay } from "q";


/**********************************************************************************************
 * Summary: NavMenu takes props to track the drawerOpen status while navigating between pages
 * if the drawer is open as a new page link is clicked, the drawer will remain open on the new
 * page load.
 * 
 * Code Attribution: 
 * - Mini Variant Drawer
 * - https://material-ui.com/
 ***********************************************************************************************/
const drawerWidth = 180;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    position: "relative",
    whiteSpace: "nowrap",
    overflow: "hidden"
  },
  appBar: {
    backgroundColor: "#1B9AAA",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36,
    color: "white",
    marginLeft: "-1.3%"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    color: "white",
    backgroundColor: "#292F36",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    color: "white",
    backgroundColor: "#292F36",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7.5)
    }
  },
  toolbar: {
    marginTop: "4%",
    marginBottom: "-4%",
    backgroundColor: "#292F36",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  loginsignupbg: {
    display: "inline-block"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1.5)
  },
  icons: {
    color: "white"
  },
  selectGroup: {
    marginLeft: "10%"
  },
  topMenuItem: {
    borderTop: "1px solid white",
    "&:hover": {
      backgroundColor: "white",
      color: "#292F36",
      "& $icons": {
        color: "#292F36"
      }
    }
  },
  menuItem: {
    "&:hover": {
      backgroundColor: "white",
      color: "#292F36",
      "& $icons": {
        color: "#292F36"
      }
    }
  },
  handleDrawerCloseButton: {
    display: "inline-block"
  },
  groupDropDown: {
    display: "inline-block",
    marginRight: "5%"
  },
  logoutBtn: {
    width: "80px",
    color: "black",
    textAlign: "center",
    backgroundColor: "white",
    marginRight: "3%",
    borderColor: "white",
    display: "inline-block",
    textTransform: "capitalize",
    "&:hover": {
      color: "#FFF",
      border: "1px solid white",
      backgroundColor: "#1B9AAA"
    }
  },
  userName: {
    display: "inline-block",
    marginLeft: "-10%"
  },
  topRightNavbar: {
    display: "flex"
  },
  homeText: {
    textDecoration: "none",
    color: "white"
  },
  listItemText: {
    marginLeft: "-5%",
    fontSize: "12px"
  }
}));

/**********************************************************************************************
 * Returns a String to append to the breadcrumb, based on the location of current page
 ***********************************************************************************************/
const getTitle = location => {
  switch (location) {
    case "/":
      return "Public Requests";
    case "/public_request":
      return "> Public Requests";
    case "/manage_favours":
      return "> Manage Favours";
    case "/repay_selected_favours":
      return "> Multi Repay > Repay Selected Favours";
    case "/profile":
      return "> My Profile";
    case "/leaderboard":
      return "> Leaderboard";
    case "/login":
      return "> Login";
    case "/signup":
      return "> Sign up";
    case "/settings":
      return "> User Settings";
    case "/multi_repay":
      return "> Multi Repay";
    case "/home":
      return "";
    default:
      return "";
  }
};

const NavMenu = props => {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const { userData, setUserData } = useContext(UserContext);

  // Handles first load onto homepage when props aren't set or passed
  const isDrawerUndefined = () => {
    try {
      return props.props.location.state.setOpen;
    } catch (err) {
      if (err) {
        return false;
      }
    }
  };

  const [open, setOpen] = useState(isDrawerUndefined);
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

/**********************************************************************************************
 * Logs the user out of the system
 ***********************************************************************************************/  
  const handleLogout = async function() {
    
    toast.success("Successfully logged out taking you back to the home page");

    await delay(3000);
    setUserData({
      token: undefined,
      user: undefined
    });
    Cookies.set("auth-token", "");    
    window.location.href = "/home";
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{ flex: 1 }}>
            <Link className={classes.homeText} to={"/home"}>
              Favours
            </Link>{" "}
            {getTitle(location.pathname)}
          </Typography>
          <div>
            {userData.user ? (
              <div className={classes.userName}>
                Logged in as{" "}
                {userData.user.firstname + " (" + userData.user.email + ")"}
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            {/******************************************************************
              * If the UserContext data is available show the logout button, 
              * otherwise show the login and sign up buttons
              * ****************************************************************/}
            {userData.user ? (
              <Button
                className={classes.logoutBtn}
                onClick={handleLogout}
                variant="contained"
                color="primary"
              >
                Logout
              </Button>
            ) : (
              <LoginSignupButtonGroup />
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <div className={classes.handleDrawerCloseButton}>
            <IconButton
              className={classes.menuButton}
              onClick={handleDrawerClose}
            >
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
        </div>
        <Divider />
        {/********************************************************************
          * Handles the styling of the drawer list item if it is the current
          * page or if it is not.
          * 
          * Also checks whether the userData is available to determine
          * whether to include the protected routes in the side bar
          *******************************************************************/}
        {location.pathname === "/public_request" ? (
          <ListItem
            className={classes.topMenuItem}
            button
            key="Public Request"
            onClick={() => history.push("/public_request")}
            style={{
              color: "#292F36",
              backgroundColor: "white",
              textDecoration: "none"
            }}
          >
            <Link
              to={{ pathname: "/public_request", state: { setOpen: open } }}
            >
              <ListItemIcon>
                <EmojiPeopleIcon
                  className={classes.icons}
                  color="action"
                  style={{ color: "#292F36" }}
                ></EmojiPeopleIcon>
              </ListItemIcon>
            </Link>
            <ListItemText
              className={classes.listItemText}
              disableTypography={true}
              primary="Public Request"
            />
          </ListItem>
        ) : (
          <Link
            to={{ pathname: "/public_request", state: { setOpen: open } }}
            style={{ textDecoration: "none", color: "white" }}
          >
            <ListItem
              className={classes.topMenuItem}
              button
              key="Public Request"
              onClick={() => history.push("/public_request")}
            >
              <ListItemIcon>
                <EmojiPeopleIcon
                  className={classes.icons}
                  color="action"
                ></EmojiPeopleIcon>
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                disableTypography={true}
                primary="Public Request"
              />
            </ListItem>
          </Link>
        )}
        {userData.user === undefined ? (
          ""
        ) : location.pathname === "/manage_favours" ? (
          <ListItem
            className={classes.menuItem}
            button
            key="Manage Favours"
            style={{ color: "#292F36", backgroundColor: "white" }}
            onClick={() => history.push("/manage_favours")}
          >
            <Link
              to={{ pathname: "/manage_favours", state: { setOpen: open } }}
            >
              <ListItemIcon>
                <ListAltIcon
                  className={classes.icons}
                  color="action"
                  style={{ color: "#292F36" }}
                ></ListAltIcon>
              </ListItemIcon>
            </Link>
            <ListItemText
              className={classes.listItemText}
              disableTypography={true}
              primary="Manage Favours"
            />
          </ListItem>
        ) : (
          <Link
            to={{ pathname: "/manage_favours", state: { setOpen: open } }}
            style={{ textDecoration: "none", color: "white" }}
          >
            <ListItem
              className={classes.menuItem}
              button
              key="Manage Favours"
              onClick={() => history.push("/manage_favours")}
            >
              <ListItemIcon>
                <ListAltIcon
                  className={classes.icons}
                  color="action"
                ></ListAltIcon>
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                disableTypography={true}
                primary="Manage Favours"
              />
            </ListItem>
          </Link>
        )}

        {userData.user === undefined ? (
          ""
        ) : location.pathname === "/multi_repay" ? (
          <ListItem
            className={classes.menuItem}
            button
            key="Multi Repay"
            style={{ color: "#292F36", backgroundColor: "white" }}
            onClick={() => history.push("/multi_repay")}
          >
            <Link
              to={{
                pathname: "/multi_repay",
                state: { setOpen: open, userData: userData }
              }}
            >
              <ListItemIcon>
                <PaymentIcon
                  className={classes.icons}
                  color="action"
                  style={{ color: "#292F36" }}
                ></PaymentIcon>
              </ListItemIcon>
            </Link>
            <ListItemText
              className={classes.listItemText}
              disableTypography={true}
              primary="Multi Repay"
            />
          </ListItem>
        ) : (
          <Link
            to={{
              pathname: "/multi_repay",
              state: { setOpen: open, userData: userData }
            }}
            style={{ textDecoration: "none", color: "white" }}
          >
            <ListItem
              className={classes.menuItem}
              button
              key="Multi Repay"
              onClick={() => history.push("/multi_repay")}
            >
              <ListItemIcon>
                <PaymentIcon
                  className={classes.icons}
                  color="action"
                ></PaymentIcon>
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                disableTypography={true}
                primary="Multi Repay"
              />
            </ListItem>
          </Link>
        )}
        {userData.user === undefined ? (
          ""
        ) : location.pathname === "/profile" ? (
          <ListItem
            className={classes.menuItem}
            button
            key="Profile"
            style={{ color: "#292F36", backgroundColor: "white" }}
            onClick={() => history.push("/profile")}
          >
            <Link to={{ pathname: "/profile", state: { setOpen: open } }}>
              <ListItemIcon>
                <AccountBoxIcon
                  className={classes.icons}
                  color="action"
                  style={{ color: "#292F36" }}
                ></AccountBoxIcon>
              </ListItemIcon>
            </Link>
            <ListItemText
              className={classes.listItemText}
              disableTypography={true}
              primary="Profile"
            />
          </ListItem>
        ) : (
          <Link
            to={{ pathname: "/profile", state: { setOpen: open } }}
            style={{ textDecoration: "none", color: "white" }}
          >
            <ListItem
              className={classes.menuItem}
              button
              key="Profile"
              onClick={() => history.push("/profile")}
            >
              <ListItemIcon>
                <AccountBoxIcon
                  className={classes.icons}
                  color="action"
                ></AccountBoxIcon>
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                disableTypography={true}
                primary="Profile"
              />
            </ListItem>
          </Link>
        )}
        {location.pathname === "/leaderboard" ? (
          <ListItem
            className={classes.menuItem}
            button
            key="Leaderboard"
            style={{ color: "#292F36", backgroundColor: "white" }}
            onClick={() => history.push("/leaderboard")}
          >
            <Link to={{ pathname: "/leaderboard", state: { setOpen: open } }}>
              <ListItemIcon>
                <LocalActivityIcon
                  className={classes.icons}
                  color="action"
                  style={{ color: "#292F36" }}
                ></LocalActivityIcon>
              </ListItemIcon>
            </Link>
            <ListItemText
              className={classes.listItemText}
              disableTypography={true}
              primary="Leaderboard"
            />
          </ListItem>
        ) : (
          <Link
            to={{ pathname: "/leaderboard", state: { setOpen: open } }}
            style={{ textDecoration: "none", color: "white" }}
          >
            <ListItem
              className={classes.menuItem}
              button
              key="Leaderboard"
              onClick={() => history.push("/leaderboard")}
            >
              <ListItemIcon>
                <LocalActivityIcon
                  className={classes.icons}
                  color="action"
                ></LocalActivityIcon>
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                disableTypography={true}
                primary="Leaderboard"
              />
            </ListItem>
          </Link>
        )}
        {userData.user === undefined ? (
          ""
        ) : location.pathname === "/settings" ? (
          <Link
            to={{ pathname: "/settings", state: { setOpen: open } }}
            style={{ textDecoration: "none", color: "white" }}
          >
            <ListItem
              className={classes.menuItem}
              button
              key="User Settings"
              style={{ color: "#292F36", backgroundColor: "white" }}
            >
              <ListItemIcon>
                <SettingsIcon
                  className={classes.icons}
                  color="action"
                  style={{ color: "#292F36" }}
                ></SettingsIcon>
              </ListItemIcon>

              <ListItemText
                className={classes.listItemText}
                disableTypography={true}
                primary="User Settings"
              />
            </ListItem>
          </Link>
        ) : (
          <Link
            to={{ pathname: "/settings", state: { setOpen: open } }}
            style={{ textDecoration: "none", color: "white" }}
          >
            <ListItem className={classes.menuItem} button key="User Settings">
              <ListItemIcon>
                <SettingsIcon
                  className={classes.icons}
                  color="action"
                ></SettingsIcon>
              </ListItemIcon>

              <ListItemText
                className={classes.listItemText}
                disableTypography={true}
                primary="User Settings"
              />
            </ListItem>
          </Link>
        )}
      </Drawer>
    </div>
  );
};

export default NavMenu;
