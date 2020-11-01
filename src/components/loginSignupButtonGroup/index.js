import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

/**********************************************************************************************
 * Summary: login and sign up button component. It can take props to change the color assigned
 * to the buttons
 * 
 * Code Attribution: 
 * - https://material-ui.com/
 ***********************************************************************************************/

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  container: {
    margin: "2px"
  },
  icons: {
    transform: "translateY(-0.1em)"
  },
  btnGroup: {
    color: "black",
    width: "110%",
    display: "inline-block"
  },
  loginbtn: {
    width: "80px",
    textAlign: "center",
    backgroundColor: "white",
    marginRight: "3%",
    borderColor: "white",
    display: "inline-block",
    textTransform: "capitalize",
    "&:hover": {
      color: "#FFF",
      border: "1px solid white"
    }
  },
  signupbtn: {
    width: "80px",
    textAlign: "center",
    backgroundColor: "white",
    display: "inline-block",
    borderColor: "white",
    textTransform: "capitalize",
    "&:hover": {
      color: "#FFF",
      border: "1px solid white"
    }
  }
}));

const LoginSignupButtonGroup = ({
  ButtonPrimaryColor,
  ButtonPrimaryFontColor
}) => {
  const classes = useStyles();
  const [buttonColor] = useState(ButtonPrimaryColor);
  const [buttonFontColor] = useState(ButtonPrimaryFontColor);

  return (
    <div className={classes.btnGroup}>
      <Button
        className={classes.loginbtn}
        href={"/login"}
        style={{ color: buttonFontColor, backgroundColor: buttonColor }}
      >
        Login
      </Button>
      <Button
        className={classes.signupbtn}
        href={"/signup"}
        style={{ color: buttonFontColor, backgroundColor: buttonColor }}
      >
        Sign Up
      </Button>
    </div>
  );
}

export default LoginSignupButtonGroup;