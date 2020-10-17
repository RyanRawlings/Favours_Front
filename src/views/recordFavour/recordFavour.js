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
import './RecordFavour.css';
import SaveIcon from '@material-ui/icons/Save';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
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

const RecordFavourForm = () => {
    const classes = useStyles();
    const [favourtype, setFavourType] = useState('');
    const [debtor, setDebtor] = useState('');
    const [creditor, setCreditor] = useState('');
    const [favourstatus, setFavourStatus] = useState('');

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={3}>
                    <form className={classes.form} >
                            <TextField id='favour-type' 
                                        label="Favour Type" 
                                        name="FavourType" 
                                        value={favourtype} 
                                        placeholder="Select your Favour Type"
                                        onChange={e => setFavourType(e.target.value)}
                            />
                            <TextField id='creditor-name' 
                                        label="Paid By" 
                                        name="Creditor" value={creditor} 
                                        placeholder="Who paid the favour"
                                        onChange={e => setCreditor(e.target.value)}
                            />
                            <TextField id='debtor-name' 
                                        label="Owed By" 
                                        name="Debtor" 
                                        value={debtor} 
                                        placeholder="Who owes the favour"
                                        onChange={e => setDebtor(e.target.value)}
                            />
                            <TextField id='date' 
                                        type="date" 
                                        label="Paid On" 
                                        name="PaidDate" 
                                        className={classes,TextField} 
                                        InputLabelProps={{shrink: true,}}
                            />
                            <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={classes.submit}
                                    startIcon={<SaveIcon />}
                            >
                                Record
                            </Button>
                    </form>
                </Grid>
            </Paper>
        </div>
    );
};

export default RecordFavourForm;



