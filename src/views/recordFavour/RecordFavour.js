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
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
    paper: {
        padding: theme.spacing(2),
        paddingLeft: '15%',
        height: "auto"
    },  
    form: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
    },   
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: "auto",
        marginRight: "auto"
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
    paidBy: {
        display: "inline-block"
    },
    favourType: {
        display: "inline-block"
    },
    formContent: {
      marginLeft: "auto",
      marginRight: "auto",
    },
    recordButton: {
      marginLeft: "auto",
      marginRight: "auto"
    }
  }));

const RecordFavourForm = () => {
    const classes = useStyles();
    const [favourType, setFavourType] = useState([]);
    const [debtor, setDebtor] = useState(null);
    const [creditor, setCreditor] = useState(null);
    const [favourstatus, setFavourStatus] = useState('');
    const [favourTypeId, setFavourTypeId] = useState(null);
    const [favourName, setFavourName] = useState(null);
    const [favourDescription, setFavourDescription] = useState(null);
    const [favourDate, setFavourDate] = useState(null);
  
    useEffect(() => {
      async function getFavourType() {
        const getFavourTypes = await APIServices.getFavourTypes();
        // Return array and set the Favours state
        const { favourTypes } = getFavourTypes;
        const favourTypesArray = Object.values(favourTypes);
        setFavourType(favourTypesArray);
      }
  
      getFavourType();
    }, []);

    const setFavourIdHelper = (object, value) => {
        // console.log("Helper is being called...");
        // console.log("Object array", object);
        // console.log("Value", value);
        
        const favourTypesArray = Object.values(object);
        for (let i = 0; i < favourTypesArray.length; i++) {
          // console.log(rewardsObject[i].Name);
          if (favourTypesArray[i].Name === value) {
            // console.log(rewardsObject[i]._id.toString());
            setFavourTypeId(favourTypesArray[i]._id.toString());
          }
        }
        // console.log(rewardIdKey);
        // console.log(rewardId);
      }

      const enableSubmitButton = () => {
        // If the required details are entered return true
        // Else return false
        // If error return false
        try {
          if (favourName !== null && debtor !== null && creditor !== null && favourDate !== null && favourDescription !== null) {
            return false;
          } else {
            return true;
          } 
        } catch (err) {
          return true;
        }
    
      }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
              <div className={classes.formContent}>
                <Grid container spacing={3}>
                    <form className={classes.form} >
                            {/* <TextField id='favour-type' 
                                        label="Favour Type" 
                                        name="FavourType" 
                                        value={favourtype} 
                                        placeholder="Select your Favour Type"
                                        onChange={e => setFavourType(e.target.value)}
                            /> */}
                            <Autocomplete                               
                                className={classes.favourType}
                                id='favour-type' 
                                label="Favour Type" 
                                name="FavourType" 
                                options={favourType} 
                                getOptionLabel={(option) => option.Name}
                                placeholder="Select your Favour Type"
                                // onChange={e => setFavourType(e.target.value)}
                                onInputChange={(event, newInputValue) => {
                                    setFavourName(newInputValue);
                                    setFavourIdHelper(favourType, newInputValue);                                            
                                    }}
                                    renderInput={(params) => <TextField {...params} required label="Favour Type" />
                                    
                                }
                            />
                            <TextField className={classes.paidBy}
                                        required
                                        id='creditor-name' 
                                        label="Paid By" 
                                        name="Creditor" value={creditor} 
                                        placeholder="Who paid the favour"
                                        onChange={e => setCreditor(e.target.value)}
                            />
                            <TextField id='debtor-name' 
                                        required
                                        label="Owed By" 
                                        name="Debtor" 
                                        value={debtor} 
                                        placeholder="Who owes the favour"
                                        onChange={e => setDebtor(e.target.value)}
                            />
                              {/* <TextField id='favour-description'  
                                        label="Description" 
                                        name="FavourDescription" 
                                        placeholder = "Add description of this favour"
                                        multiline
                                        rowsMax={2}
                                        value={favourDescription}
                                        onChange={e => setFavourDescription(e.target.value)}
                            /> */}
                            <TextField id='favour-date' 
                                        required
                                        type="date" 
                                        label="Paid On" 
                                        name="PaidDate" 
                                        className={classes,TextField} 
                                        InputLabelProps={{shrink: true,}}
                                        onChange={e => setFavourDate(e.target.value)}
                            />
                            <TextareaAutosize
                              required
                              id="outlined-textarea"
                              label="Task Description *"
                              placeholder="Task Description *"
                              rowsMin={6}
                              variant="outlined"
                              style={{
                                height: "30%",
                                width: "85%",
                                fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                                resize: "none"
                              }}
                              onChange={e => setFavourDescription(e.target.value)}
                            />
                            <div className={classes.recordButton}>
                              <Button
                                      type="submit"
                                      variant="contained"
                                      color="primary"
                                      size="large"
                                      className={classes.submit}
                                      disabled={enableSubmitButton() && enableSubmitButton() === true? true: false}
                                      startIcon={<SaveIcon />                                      
                                    }
                              >
                                  Record
                              </Button>
                            </div>
                    </form>
                </Grid>
                </div>
            </Paper>
        </div>
    );
};

export default RecordFavourForm;



