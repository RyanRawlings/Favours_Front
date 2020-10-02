import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";


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
    width: "100%",
    display: 'inline-block'    
  },
  loginbtn: {  
    backgroundColor: "white",
    marginRight: "3%",
    borderColor: "white",
    display: "inline-block",
    '&:hover': {
      color: '#FFF',      
      border: "1px",
      borderColor: "white",
  }
  },
  signupbtn: {  
    backgroundColor: "white",
    display: "inline-block",
    borderColor: "white",
    '&:hover': {
      color: '#FFF',
      border: "1px",
      borderColor: "white",
  }
  },
}));

export default function LoginSignupButtonGroup() {
  const classes = useStyles();
  const [tag, setTag] = useState(0);
  return (
        <div className={classes.btnGroup}>            
              <Button className={classes.loginbtn} href={'/login'}>Login</Button>
              <Button className={classes.signupbtn} href={'/signup'}>Sign Up</Button>
        </div>
     );
}
