import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import * as UserAPI from "../../api/UserAPI";
import NavMenu from "../../components/navMenu/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/*************************************************************************************************************
* Code Attribution: Material UI Sign up template
* Url: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-up
* Author(s): Oliver Tassinari & Eric Semeniuc
**************************************************************************************************************/

/**************************************************************************************************************
* Summary: method dynamically updates the year for the copyright value
***************************************************************************************************************/
const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Favours
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#1B9AAA",
    "&:hover": {
      backgroundColor: "white",
      color: "black"
    }
  },
  introtext: {
    marginTop: "3%",
    fontSize: "12px",
    textAlign: "center"
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
    backgroundImage: "linear-gradient(#d3ecf3, #1B9AAA)"
  }
}));

const Signup = (props) => {
  const classes = useStyles();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async function(event) {
    event.preventDefault();
    let user = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
    };

    /************************************************************************
    * The register api route promise will call toast.error() to display
    * the error message returned by the server. The try catch block handles
    * any additional errors, and also calls toast.error() to display to the
    * message to user.
    *************************************************************************/        
    try {
      await UserAPI.register(user);
    } catch (error) {
      toast.error(error);
    }
    
    // Stops the details from posting to the browser
    return false;
  };

  return (
    <div className={classes.root}>
      <div className="container">
        <NavMenu />
        <div className="container_right">
          <Paper className={classes.container}>
            <div className="container_right_bottom">
              <div className={classes.headingContainer}></div>
              <div className="cards_container">
                <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <div className={classes.paper}>
                    <Paper className={classes.formPaper}>
                      <div className={classes.pageheading}>
                        <Typography component="h1" variant="h5">
                          Sign up to Favours
                        </Typography>
                        <FontAwesomeIcon
                          className={classes.icon}
                          icon={faUsers}
                        />
                      </div>
                      <Typography className={classes.introtext}>
                        Join today, to start creating and sharing IOUs with your
                        friends, teams, and companies
                      </Typography>
                      {/*******************************************************************************
                      * The ToastContainer allows it so that if the toast method is called at anytime,
                      * a message will be displayed on screen 
                      *********************************************************************************/}
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
                              onChange={e => {
                                setFirstName(e.target.value);
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
                              onChange={e => {
                                setLastName(e.target.value);
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
                              onChange={e => {
                                setEmail(e.target.value);
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
                              onChange={e => {
                                setPassword(e.target.value);
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
                            <Link href={"/home"} variant="body2">
                              Back to Home Screen
                            </Link>
                          </Grid>
                        </Grid>
                      </form>
                      <div className={classes.copyright}>
                        <Copyright />
                      </div>
                    </Paper>
                  </div>
                  <Box mt={5}></Box>
                </Container>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Signup;
