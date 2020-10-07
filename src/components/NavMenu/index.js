import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LocalActivityIcon from "@material-ui/icons/LocalActivity";
import { useLocation, Link } from 'react-router-dom';
import LoginSignupButtonGroup from '../LoginSignupButtonGroup/index.js';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupDropDown from '../GroupDropDown/index'
import { NavLink } from 'react-router-dom';

const drawerWidth = 210;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'relative',
    whiteSpace: 'nowrap'
  },
  appBar: {
    backgroundColor: "#1B9AAA",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: "white",
    marginLeft: "-1.3%"
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    color: "white",
    backgroundColor: '#292F36',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    color: "white",
    backgroundColor: '#292F36',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7.5),
    },
  },
  toolbar: {
    marginTop: "4%",
    marginBottom: "-4%",
    backgroundColor: "#292F36",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  loginsignupbg: {
    display: 'inline-block',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1.5),
  },
  icons: {
    color: "white",
  },
  selectGroup: {
    marginLeft: "10%"
  },
  topMenuItem: {
    borderTop: "1px solid white",
    '&:hover': {
      backgroundColor: "white",
      color: "#292F36",
      '& $icons': {
        color: "#292F36"
      }
    }
  },
  menuItem: {    
    '&:hover': {
      backgroundColor: "white",
      color: "#292F36",
      '& $icons': {
        color: "#292F36"
      }
    }
  },
  handleDrawerCloseButton: {
    display: "inline-block"
  },
  groupDropDown: {
    display: "inline-block",
  }
}));

const getTitle = (location) => {
  switch(location)
  {
      case '/':
          return "Public Requests";
      case '/public_request':
          return "Public Requests";            
      case '/all_list':
          return "IOU List";    
      case '/all_list/debit_list':
        return 'IOU List > Debit List';           
      case '/all_list/credit_list':
        return 'IOU List > Credit List';                  
      case '/profile':
          return "My Profile";            
      case '/leaderboard':
          return "Leaderboard"; 
      case '/login':
          return "Login";
      case '/signup':
          return "Sign up";
      case '/settings':
        return "Personal Settings";

  }
}

export default function NavMenu(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(props.props.location.state.setOpen);
  const location = useLocation();

  // console.log(props);
  // console.log(props.props.location.state.setOpen);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{ flex: 1 }}>
            Favours {" > " + getTitle(location.pathname)}
          </Typography>          
          <div>
            <LoginSignupButtonGroup className={classes.loginsignupbg}/>
          </div>
        </Toolbar>         
      </AppBar>      
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >        
        <div className={classes.toolbar}>
          <div className={classes.handleDrawerCloseButton}>
            <IconButton className={classes.menuButton} onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <div className={classes.groupDropDown}>
          <GroupDropDown />
          </div>
        </div>
        <Divider />
        {location.pathname==='/public_request'?
        <ListItem className={classes.topMenuItem} button key="Public Request" style={{color: "#292F36", backgroundColor: "white", textDecoration: "none"}}>
          <Link to={{pathname: "/public_request", state: {setOpen: open}}}>
              <ListItemIcon>
                <EmojiPeopleIcon
                  className={classes.icons}
                  color="action"
                  style={{color: "#292F36"}}
                ></EmojiPeopleIcon>                
              </ListItemIcon>
              </Link>
              <ListItemText primary="Public Request" />          
        </ListItem> :
                <Link to={{pathname: "/public_request", state: {setOpen: open}}} style={{textDecoration: "none", color: "white"}}>
                  <ListItem className={classes.topMenuItem} button key="Public Request" >
                    <ListItemIcon>
                      <EmojiPeopleIcon
                        className={classes.icons}
                        color="action"
                      ></EmojiPeopleIcon>                
                    </ListItemIcon>
                    <ListItemText primary="Public Request" />          
              </ListItem>
              </Link>
              }
        {location.pathname==='/all_list'?
        <ListItem className={classes.menuItem} button key="IOU List" style={{color: "#292F36", backgroundColor: "white"}}>
            <Link to={{pathname: "/all_list", state: {setOpen: open}}}>
              <ListItemIcon>
              <ListAltIcon
                  className={classes.icons}
                  color="action"
                  style={{color: "#292F36"}}
                ></ListAltIcon>
              </ListItemIcon>
            </Link>
              <ListItemText primary="IOU List" />
        </ListItem> :
        <Link to={{pathname: "/all_list", state: {setOpen: open}}} style={{textDecoration: "none", color: "white"}}>
        <ListItem className={classes.menuItem} button key="IOU List">        
          <ListItemIcon>
          <ListAltIcon
              className={classes.icons}
              color="action"
            ></ListAltIcon>
              </ListItemIcon>            
              <ListItemText primary="IOU List" />
        </ListItem>
        </Link>
        }
        {location.pathname === '/profile'?
        <ListItem className={classes.menuItem} button key="Profile" style={{color: "#292F36", backgroundColor: "white"}}>
          <Link to={{pathname: "/profile", state: {setOpen: open}}}>          
              <ListItemIcon>
              <AccountBoxIcon
                  className={classes.icons}
                  color="action"
                  style={{color: "#292F36"}}
                ></AccountBoxIcon>
              </ListItemIcon>
          </Link>
              <ListItemText primary="Profile" />
        </ListItem> :        
        <Link to={{pathname: "/profile", state: {setOpen: open}}} style={{textDecoration: "none", color: "white"}}>          
                <ListItem className={classes.menuItem} button key="Profile">                
                    <ListItemIcon>
                    <AccountBoxIcon
                        className={classes.icons}
                        color="action"
                      ></AccountBoxIcon>
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
              </ListItem>
              </Link>}
        {location.pathname==='/leaderboard'?
        <ListItem className={classes.menuItem} button key="Leaderboard" style={{color: "#292F36", backgroundColor: "white"}}>
          <Link to={{pathname: "/leaderboard", state: {setOpen: open}}}>          
              <ListItemIcon>
              <LocalActivityIcon
                  className={classes.icons}
                  color="action"
                  style={{color: "#292F36"}}
                ></LocalActivityIcon>
              </ListItemIcon>
          </Link>              
              <ListItemText primary="Leaderboard" />
        </ListItem> : 
        <Link to={{pathname: "/leaderboard", state: {setOpen: open}}} style={{textDecoration: "none", color: "white"}}> 
                <ListItem className={classes.menuItem} button key="Leaderboard">                
                    <ListItemIcon>
                    <LocalActivityIcon
                        className={classes.icons}
                        color="action"
                      ></LocalActivityIcon>
                    </ListItemIcon>                              
                    <ListItemText primary="Leaderboard" />
              </ListItem>
              </Link>
              }
        {location.pathname === '/settings'?
        <Link to={{pathname: "/settings", state: {setOpen: open}}} style={{textDecoration: "none", color: "white"}}>
        <ListItem className={classes.menuItem} button key="Settings" style={{color: "#292F36", backgroundColor: "white"}}>                    
              <ListItemIcon>
              <SettingsIcon
                  className={classes.icons}
                  color="action"
                  style={{color: "#292F36"}}
                ></SettingsIcon>
              </ListItemIcon>
                        
              <ListItemText primary="Settings" />              
        </ListItem> 
        </Link>:
        <Link to={{pathname: "/settings", state: {setOpen: open}}} style={{textDecoration: "none", color: "white"}}>  
                <ListItem className={classes.menuItem} button key="Settings">
                        
                    <ListItemIcon>
                    <SettingsIcon
                        className={classes.icons}
                        color="action"
                      ></SettingsIcon>
                    </ListItemIcon>
                              
                    <ListItemText primary="Settings" />
              </ListItem>
              </Link>}
      </Drawer>
    </div>
  );
}