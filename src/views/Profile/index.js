import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./style.scss";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import NavMenu from '../../components/NavMenu/index';



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
  largeIcon: {
    margin: "auto",
    width: "50%",
    height: "60%",    
  },
  profileCard: {
    margin: "0% 0% 0% 2%",
    width: "25%",
    float: "left",
  },
  profileCardContent: {
    height: "40vh"
  },
  personalDetailsCard: {
    margin: "3% 2% 2% 2%",
    height: "80vh",
  },
}));

export default function Profile() {
  const classes = useStyles();
  const [tag, setTag] = useState(0);
  const inputProps = {
    firstName: "Ryan",
  };

  return (
    <div className={classes.root}>
      <div className="container">
        <NavMenu />            
        <div className="container_right">
          <Paper className={classes.container}>
            <div className="container_right_bottom">
                <Card className={classes.profileCard}>
                  <CardContent className={classes.profileCardContent}>
                        <Avatar className={classes.largeIcon}></Avatar>
                        <div className="profile_card_description">Upload a profile photo</div>
                  </CardContent>                  
                </Card>
                <Card className={classes.personalDetailsCard}>
                  <CardContent className={classes.personalDetailsCardContent}>                      
                  </CardContent>                  
                </Card>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}
