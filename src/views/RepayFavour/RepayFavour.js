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
import Cookie from "js-cookie";
import NavMenu from "../../components/navMenu/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Container from "@material-ui/core/Container";
import UserContext from "../../context/UserContext";
import './RepayFavour.css';
import SaveIcon from '@material-ui/icons/Save';
import { DataGrid } from '@material-ui/data-grid';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 1000,
    },  
    form: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
    },   
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    submit: {
        margin: theme.spacing(1),
      },
    },
  }));

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'favourType', headerName: 'Favour Type', width: 130 },
    { field: 'favourDebtor', headerName: 'Owed By', width: 130 },
    { field: 'favourCreditor', headerName: 'Paid By', width: 130 },
    { field: 'favourStatus', headerName: 'Favour Status', width: 130 },
    { field: 'favourDate', type:'date', headerName: 'Paid On', width: 130 },   
  ];

  const rows = [
    { id: 1, favourType: 'Coffee', favourDebtor: 'John Doe', favourCreditor: 'Jane Doe', favourStatus: 'Unpaid', favourDate: '18/10/2020' },
    { id: 2, favourType: 'Cupcake', favourDebtor: 'John Doe', favourCreditor: 'Jane Doe', favourStatus: 'Unpaid', favourDate: '19/10/2020' },
    { id: 3, favourType: 'Chocolate', favourDebtor: 'John Doe', favourCreditor: 'Jane Doe', favourStatus: 'Unpaid', favourDate: '20/10/2020' },
    { id: 4, favourType: 'Coffee', favourDebtor: 'John Doe', favourCreditor: 'Jane Doe', favourStatus: 'Unpaid', favourDate: '21/10/2020' },
    { id: 5, favourType: 'Tea', favourDebtor: 'John Doe', favourCreditor: 'Jane Doe', favourStatus: 'Unpaid', favourDate: '22/10/2020' },
    { id: 6, favourType: 'Chocolate', favourDebtor: 'John Doe', favourCreditor: 'Jane Doe', favourStatus: 'Unpaid', favourDate: '23/10/2020' },
    { id: 7, favourType: 'Cupcake', favourDebtor: 'John Doe', favourCreditor: 'Jane Doe', favourStatus: 'Unpaid', favourDate: '24/10/2020' },
];
  
const RepayFavour = (props) => {
    const classes = useStyles();   
        
          return (
            <div className={classes.root}>
              <div className="container">
                <NavMenu props={props} />
                <div className="container_right">
                  <div className={classes.root}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6"
                            >Repay your favours</Typography>
                            <form className={classes.form} >
                                    <div style={{ height: 400, width: '100%'}}>
                                        <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                                    </div>
                                
                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        color="primary"
                                                        size="large"
                                                        className={classes.submit}
                                                        startIcon={<AssignmentTurnedInIcon />}
                                    >
                                        Repay Favour
                                    </Button>
                            </form>
                        </Paper>    
                    </div>            
                </div>
              </div>
            </div>
    );
}


export default RepayFavour;