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
import "./RecordFavour.css";
import SaveIcon from "@material-ui/icons/Save";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import * as UserAPI from "../../api/UserAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as FavourAPI from "../../api/FavourAPI";
import { useLocation } from "react-router-dom";
import ImageDragAndDrop from "../../components/uploadImage/imageDragAndDrop";
import axios from "axios";
import * as ImageAPI from "../../api/ImageAPI";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    height: "100%",
    width: "auto"
  },
  form: {
    "& > *": {
      width: "25ch"
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
      marginLeft: "auto",
      marginRight: "auto"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    },
    submit: {
      margin: theme.spacing(1)
    }
  },
  formContent: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  recordButton: {
    marginLeft: "15%",
    marginTop: "5%",
    paddingBottom: "5%"
  },
  textArea: {
    marginTop: "4%",
    marginBottom: "4%"
  },
  imageBox: {
    marginLeft: "10%",
    marginTop: "5%",
    border: "1px solid",
    borderRadius: "3px",
    padding: "0% 1% 1%",
    height: "5%",
    color: "white"
  },
  uploadProof: {
    marginTop: "5%",
    marginLeft: "2%"
  }
}));

const RecordFavourForm = ({ TriggerResetFavourList, userData, handleClose }) => {
  const classes = useStyles();
  const [favourType, setFavourType] = useState([]);
  const [debtor, setDebtor] = useState(null);
  const [creditor, setCreditor] = useState(null);
  const [favourstatus, setFavourStatus] = useState("");
  const [favourTypeId, setFavourTypeId] = useState(null);
  const [favourName, setFavourName] = useState(null);
  const [favourDescription, setFavourDescription] = useState(null);
  const [favourDate, setFavourDate] = useState(null);
  const [userList, setUserList] = useState([]);
  const [fileList, setFileList] = useState([]);

  const location = useLocation();

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

  useEffect(() => {
    async function getUserList() {
      const getUsers = await UserAPI.getUsers();

      // Return array of users
      if (getUsers) {
        setUserList(getUsers);
        console.log("Users set...");
      } else {
        console.log("Error occurred fetching the user data... Please refresh");
      }
    }

    getUserList();
  }, []);

  const delay = ms => new Promise(res => setTimeout(res, ms));

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
  };

  const enableSubmitButton = () => {
    // If the required details are entered return true
    // Else return false
    // If error return false
    try {
      if (
        favourName !== null &&
        debtor !== null &&
        creditor !== null &&
        favourDescription !== null
      ) {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      return true;
    }
  };

  const getUserIdFromEmail = email => {
    for (let i = 0; i < userList.length; i++) {
      if (email === userList[i].email) {
        return userList[i]._id;
      }
    }
  };

  const favourValidation = () => {
    // let validationResult = true;
    if (creditor === debtor) {
      // toast.error("You have set the creditor and debtor to the same value");
      // validationResult = false;
      return [false, "You have set the creditor and debtor to the same value"];
    }
    if (debtor === userData.user.email && fileList.length === 0) {
      // toast.error("You have to provide proof to create favours other people owe you");
      // validationResult = false;
      return [
        false,
        "You have to provide proof to create favours other people owe you"
      ];
    }
    if (favourName === null) {
      // toast.error("You haven't choosen a Favour type");
      // validationResult = false;
      return [false, "You haven't choosen a Favour type"];
    }

    return [true, "Success"];
  };

  console.log(debtor);

  const handleSubmit = async () => {
    // console.log(favourValidation());
    let favourValidationResult = favourValidation();
    
    if (favourValidationResult[0] === false) {
      toast.error(favourValidationResult[1])
      return console.log(favourValidationResult[1])
    } 

    if (debtor === userData.user.email) {
      if (fileList.length > 1) {
        toast.error("You have tried to upload more than one image...");
        return console.log("More than one file added...");
      } else if (fileList.length === 0) {
        toast.error("You haven't uploaded an image.");
        return console.log("No file added...");
      }
    } else if (debtor !== userData.user.email) {
      uploadToMongoDB(null, favourValidationResult, "creditor");
      return console.log("No file upload required.");
    }
  
    let imageForm = new FormData();
    imageForm.append('image', fileList[0][0]);

    const uploadToS3 = await axios.post("http://localhost:4000/api/image/upload", imageForm)
            .then( function(response) {
                uploadToMongoDB(response, favourValidationResult, "debtor");
            })
            .catch( function (error) {
                toast.error(error);
            })
    }

  const uploadToMongoDB = async (response, favourValidationResult, type) => {
    let newFavour = {};
    if (favourValidationResult[0] === true) {
      // console.log(favourTypeId);
      const newFavourData = {
        requestUser: getUserIdFromEmail(creditor),
        owingUser: getUserIdFromEmail(debtor),
        description: favourDescription,
        favourOwed: favourName,
        is_completed: false,
        debt_forgiven: false,
        proofs: {
          is_uploaded: false,
          uploadImageUrl: null,
          snippet: ""
        }
      };
  
      const createNewFavour = await FavourAPI.createFavour(newFavourData);
  
      if (createNewFavour) {
        let userId = userData.user._id;
        let action = "Created new favour " + createNewFavour.favourOwed.toString();
        let newActivityData = {
          userId: userId,
          action: action
        }

        const newUserActivity = await UserAPI.createUserActivity(newActivityData);

        if (newUserActivity) {
          console.log("new user action log: 200");
        }

        if (
          createNewFavour.success === true &&
          createNewFavour.success !== null
        ) {
          toast.success(createNewFavour.message); 
          TriggerResetFavourList();          
          
        } else if (
          createNewFavour.success === true &&
          createNewFavour.success !== null
        ) {
          toast.error(createNewFavour.message);
        }
      }
      
      newFavour = createNewFavour;
      
    } else {
      toast.error(favourValidationResult[1]);
    }

    if (type === "debtor") {
      let imageArray = [];
      console.log("new Favour", newFavour);
      if (response) {
          for (let i = 0; i < response.data.locationArray.length; i++) {
              imageArray.push({ _id: newFavour._id, imageUrl: response.data.locationArray[i] });
          }        
      }
    
      imageArray.push({type: "Record"});
    
      const storeImageData = await ImageAPI.storeImageData(imageArray);
      if (storeImageData) {        
          handleClose();
          TriggerResetFavourList();
      } 
    } else if (type === "creditor") {
      toast.success("Successfully created Favour");

      await delay(3000);

      handleClose();
      TriggerResetFavourList();
    }


  };

  const addFile = data => {
    let tempFileList = fileList;
    tempFileList.push(data);

    setFileList(tempFileList);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.formContent}>
        {/* <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              /> */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                className={classes.favourType}
                id="favour-type"
                label="Favour Type"
                name="FavourType"
                options={favourType}
                getOptionLabel={option => option.Name}
                placeholder="Select your Favour Type"
                // onChange={e => setFavourType(e.target.value)}
                onInputChange={(event, newInputValue) => {
                  setFavourName(newInputValue);
                  setFavourIdHelper(favourType, newInputValue);
                }}
                renderInput={params => (
                  <TextField {...params} required label="Favour Type" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                className={classes.paidBy}
                required
                id="creditor-name"
                label="Paid By"
                name="Creditor"
                options={userList ? userList : []}
                getOptionLabel={option => option.email}
                // onChange={e => setCreditor(e.target.value)}
                onInputChange={(event, newInputValue) => {
                  setCreditor(newInputValue);
                }}
                renderInput={params => (
                  <TextField {...params} required label="Paid By" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <div className={classes.secondRow}> */}
              <Autocomplete
                id="debtor-name"
                required
                label="Owed By"
                name="Debtor"
                options={userList ? userList : []}
                getOptionLabel={option => option.email}
                // onChange={e => setDebtor(e.target.value)}
                onInputChange={(event, newInputValue) => {
                  setDebtor(newInputValue);
                }}
                renderInput={params => (
                  <TextField {...params} required label="Owed By" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="favour-date"
                type="date"
                label="Paid On"
                name="PaidDate"
                InputLabelProps={{ shrink: true }}
                onChange={e => setFavourDate(e.target.value)}
              />
            </Grid>
            {/* </div> */}
            <TextareaAutosize
              required
              id="outlined-textarea"
              label="Task Description *"
              placeholder="Task Description *"
              rowsMin={6}
              variant="outlined"
              className={classes.textArea}
              style={{
                height: "30%",
                width: "100%",
                fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                resize: "none"
              }}
              onChange={e => setFavourDescription(e.target.value)}
            />
            {userData? debtor === userData.user.email?
            <div className={classes.imageBox}>
              <ImageDragAndDrop addFile={addFile} />
            </div>
            : "" : ""
            }
            <div className={classes.recordButton}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.submit}
                disabled={
                  enableSubmitButton() && enableSubmitButton() === true
                    ? true
                    : false
                }
                onClick={() => handleSubmit()}
                startIcon={<SaveIcon />}
              >
                Record
              </Button>
            </div>
            {/* </form> */}
          </Grid>
        </div>
      </Paper>
    </div>
  );
};

export default RecordFavourForm;
