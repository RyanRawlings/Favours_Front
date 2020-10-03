import React from 'react';
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

const drawerWidth = 240;

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
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
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
    color: "white"
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

  }
}

export default function NavMenu() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

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
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <ListItem button key="Public Request">
          <Link to={"/public_request"}>
              <ListItemIcon>
                <EmojiPeopleIcon
                  className={classes.icons}
                  color="action"
                ></EmojiPeopleIcon>                
              </ListItemIcon>
              </Link>
              <ListItemText primary="Public Request" />          
        </ListItem>        
        <ListItem button key="IOU List">
            <Link to={"/all_list"}>
              <ListItemIcon>
              <ListAltIcon
                  className={classes.icons}
                  color="action"
                ></ListAltIcon>
              </ListItemIcon>
            </Link>
              <ListItemText primary="IOU List" />
        </ListItem>
        <ListItem button key="Profile">
          <Link to={"/profile"}>          
              <ListItemIcon>
              <AccountBoxIcon
                  className={classes.icons}
                  color="action"
                ></AccountBoxIcon>
              </ListItemIcon>
          </Link>
              <ListItemText primary="Profile" />
        </ListItem>        
        <ListItem button key="Leaderboard">
          <Link to={"/leaderboard"}>          
              <ListItemIcon>
              <LocalActivityIcon
                  className={classes.icons}
                  color="action"
                ></LocalActivityIcon>
              </ListItemIcon>
          </Link>              
              <ListItemText primary="Leaderboard" />
        </ListItem>
        {/* </List> */}
      </Drawer>
    </div>
  );
}