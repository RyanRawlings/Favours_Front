import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import * as APIServices from '../../api/TestAPI';
import NavMenu from "../../components/navMenu/index";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Favours
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#1B9AAA",
    '&:hover': {
      backgroundColor: "white",
      color: "black"
    }
  },
  introtext: {
      marginTop: "3%",
      fontSize: "12px",
      textAlign: "center",
  },
  icon: {
    margin: "auto",
    fontSize: "50px",
    alignContent: "center"
  },
  formPaper: {
    padding: "10% 10% 10%"
  },
  promotioncheckbox: {
    fontSize: "12px"
  },
  copyright: {
    marginTop: "5%"
  },
  pageheading: {
    textAlign: "center"
  },
  container: {
    // backgroundImage: "linear-gradient(#d3ecf3, #123456)"
    backgroundImage: "linear-gradient(#d3ecf3, #1B9AAA)"    
  },
}));

export default function Signup() {
  const classes = useStyles();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async function (event) {
    event.preventDefault();
    const response = await APIServices.register({firstname,lastname,email,password});
    console.log(response);
    return false;    
  }

  return (
<div className={classes.root}>
      <div className="container">
        <NavMenu />
        <div className="container_right">
          <Paper className={classes.container}>
            <div className="container_right_bottom">
            <div className={classes.headingContainer}>            
            </div>
              <div className="cards_container"> 
                   <Container component="main" maxWidth="xs">
       <CssBaseline />
       <div className={classes.paper}>
         <Paper className={classes.formPaper}>
        <div className={classes.pageheading}>
         <Typography component="h1" variant="h5">
           Sign up to Favours
         </Typography>
         <FontAwesomeIcon className={classes.icon} icon={faUsers}/> 
         </div>
         <Typography className={classes.introtext} >
           Join today, to start creating and sharing IOUs with your friends, teams, and companies
         </Typography>
         <form className={classes.form} onSubmit={handleSubmit}>
           <Grid container spacing={1}>
             <Grid item xs={12} sm={6}>
               <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={ e => {setFirstName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={ e => {setLastName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={ e => {setEmail(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={ e => {setPassword(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href={"/login"} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <Grid container justify="flex-end">
          <Grid item>
              <Link href={"/public_request"} variant="body2">
                Back to Home Screen
              </Link>
            </Grid>
        </Grid>
        </form>    
        <div className={classes.copyright} >    
        <Copyright />
        </div>
        </Paper>
      </div>
      <Box mt={5}>       
      </Box>
    </Container>                           
            </div> 
            </div> 
          </Paper>          
        </div>
      </div>
    </div>)
  
}