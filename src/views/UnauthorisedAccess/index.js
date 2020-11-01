import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import NavMenu from "../../components/navMenu/index";
import BackgroundImage from "../../assets/images/hero-image-people-cartoon-tb.png";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Favours AIP
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundImage: "linear-gradient(#1B9AAA, white)",
    padding: theme.spacing(15, 0, 8, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4),
    textDecoration: "none"
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1)
  },
  publicRequestButton: {
    textDecoration: "none"
  },
  publicRequestButton: {
    backgroundColor: "#1B9AAA",
    color: "white",
    textTransform: "capitalize",
    "&:hover": {
      color: "black",
      backgroundColor: "white",
      borderColor: "#1B9AAA",
      textDecoration: "none"
    }
  },
  signupButton: {
    backgroundColor: "white",
    color: "black",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#1B9AAA",
      color: "white"
    }
  },
  backgroundImage: {
    backgroundImage: "url(" + BackgroundImage + ")",
    paddingLeft: "30%"
  }
}));

const UnauthorisedAccess = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <NavMenu />
      <main className={classes.main}>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              style={{ color: "white" }}
              gutterBottom
            >
              Unauthorised Access
            </Typography>
            <Typography
              variant="h5"
              align="center"
              style={{ color: "black" }}
              paragraph
            >
              Oops looks like your trying to access a restricted page, please
              try login or sign up if you want to gain access to this page
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    className={classes.publicRequestButton}
                    variant="contained"
                    href={"/public_request"}
                  >
                    View Public Requests
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    className={classes.signupButton}
                    variant="contained"
                    href={"/signup"}
                  >
                    Sign up to Favours
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Favours
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Start building friendships today
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
};

export default UnauthorisedAccess;
