import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import AccountBox from "@material-ui/icons/AccountBox";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import HeroImage from "../../assets/images/uts-hero-image.png";
import * as APIServices from "../../api/TestAPI";
import Cookie from "js-cookie";
import NavMenu from "../../components/NavMenu/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Container from "@material-ui/core/Container";

function Copyright() {
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
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(" + HeroImage + ")",
    backgroundSize: "auto auto",
    backgroundRepeat: "no-repeat",
    backgroundColor: "white",
    //   theme.palette.type === 'light' ? theme.palette.[50] : theme.palette.grey[900],
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#002134"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#1B9AAA",
    "&:hover": {
      backgroundColor: "white",
      color: "black"
    }
  },
  icon: {
    margin: "auto",
    fontSize: "50px"
  },
  formPaper: {
    marginTop: "-10%",
    padding: "10% 10% 10%"
  },
  pageheading: {
    textAlign: "center"
  },
  container: {
    // backgroundImage: "linear-gradient(#d3ecf3, #123456)"
    backgroundImage: "linear-gradient(#d3ecf3, #1B9AAA)"
  }
}));

export default function Login() {
  const classes = useStyles();
  const storedJwt = localStorage.getItem("token");
  // const [jwt, setJwt] = useState(storedJwt || null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async function(event) {
    event.preventDefault();
    let user = { email: email, password: password };
    const response = await APIServices.login(user);
    Cookie.set(response);

    return {
      token: response.token,
      user: {
        id: response._id,
        firstname: response.firstname,
        email: response.email
      }
    };
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
                          Log in to Favours
                        </Typography>
                        <FontAwesomeIcon
                          className={classes.icon}
                          icon={faUser}
                        />
                      </div>
                      <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          type="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          value={email}
                          onChange={e => {
                            setEmail(e.target.value);
                          }}
                          autoFocus
                        />
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          value={password}
                          onChange={e => {
                            setPassword(e.target.value);
                          }}
                          autoComplete="current-password"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox value="remember" color="primary" />
                          }
                          label="Remember me"
                        />
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                        >
                          Login
                        </Button>
                        <Grid container>
                          <Grid item xs>
                            <Link href="#" variant="body2">
                              Forgot password?
                            </Link>
                          </Grid>
                          <Grid item>
                            <Link href="/signup" variant="body2">
                              {"Don't have an account? Sign Up"}
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
                        <Box mt={5}>
                          <Copyright />
                        </Box>
                      </form>
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
}
