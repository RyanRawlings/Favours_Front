import React, { useState, useEffect, useContext } from "react";
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
import * as FavourAPI from "../../api/FavourAPI";
import Cookie from "js-cookie";
import NavMenu from "../../components/navMenu/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Container from "@material-ui/core/Container";
import UserContext from "../../context/UserContext";
import './RepayFavour.css';
import SaveIcon from '@material-ui/icons/Save';
import { GridOverlay, DataGrid } from '@material-ui/data-grid';
import { XGrid } from '@material-ui/x-grid';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import * as UserAPI from "../../api/TestAPI";
import LoadingGif from "../../assets/images/loading.gif";
import ImageDragAndDrop from "../../components/uploadImage/imageDragAndDrop";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
    paper: {
        width: "100%",
        height: "100%"
    }, 
  }));


const RepaySelectedFavours = (props) => {
  const classes = useStyles();

  console.log(props);

  // console.log(props);
  // console.log(props.location.state.userData.user._id);
          return (
            <div className={classes.root}>
              <div className="container">
                <NavMenu props={props} />
                <div className="container_right">
                  <div className={classes.root}>
                        <Paper className={classes.paper}>
                        </Paper>    
                    </div>            
                </div>
              </div>
            </div>
    );
}


export default RepaySelectedFavours;