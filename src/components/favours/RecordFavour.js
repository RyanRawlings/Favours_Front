import React, { useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import UserContext from "../../context/UserContext";
import SaveIcon from "@material-ui/icons/Save";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import * as UserAPI from "../../api/UserAPI";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as FavourAPI from "../../api/FavourAPI";
import ImageDragAndDrop from "../uploadImage/imageDragAndDrop";
import { SingleImageUpload } from "../uploadImage/singleImageUpload";

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

const RecordFavourForm = ({ TriggerResetFavourList, handleClose }) => {
  const classes = useStyles();
  const [favourType, setFavourType] = useState([]);
  const [debtor, setDebtor] = useState(null);
  const [creditor, setCreditor] = useState(null);
  const [, setFavourTypeId] = useState(null);
  const [favourName, setFavourName] = useState(null);
  const [favourDescription, setFavourDescription] = useState(null);
  const [, setFavourDate] = useState(null);
  const [userList, setUserList] = useState([]);
  const [fileList, setFileList] = useState([]);

  const { userData } = useContext(UserContext);

  /**************************************************************************************************
   * Summary: Returns the Types of Favours that can be selected in an Array, on page load
   ***************************************************************************************************/

  useEffect(() => {
    async function getFavourType() {
      const getFavourTypes = await FavourAPI.getFavourTypes();
      // Return array and set the Favours state
      const { favourTypes } = getFavourTypes;
      const favourTypesArray = Object.values(favourTypes);
      setFavourType(favourTypesArray);
    }

    getFavourType();
  }, []);

  /**************************************************************************************************
   * Summary: Returns all Users in an Array, on page load
   ***************************************************************************************************/

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

  /**************************************************************************************************
   * Summary: On Input Change to the Favour dropdown list, update the FavourId state variable with
   * the corressponding object id.
   ***************************************************************************************************/

  const setFavourIdHelper = (object, value) => {
    const favourTypesArray = Object.values(object);
    for (let i = 0; i < favourTypesArray.length; i++) {
      if (favourTypesArray[i].Name === value) {
        setFavourTypeId(favourTypesArray[i]._id.toString());
      }
    }
  };

  /**************************************************************************************************
   * Summary: Additional layer of validation, will return a boolean as to whether the Record button
   * should be enabled/disabled
   ***************************************************************************************************/

  const enableSubmitButton = () => {
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

  /**************************************************************************************************
   * Summary: Favour validation to ensure the integrity of the data, before the image upload function
   * is called
   ***************************************************************************************************/

  const favourValidation = () => {
    if (creditor === debtor) {
      return [false, "You have set the creditor and debtor to the same value"];
    }
    if (debtor === userData.user.email && fileList.length === 0) {
      return [
        false,
        "You have to provide proof to create favours other people owe you"
      ];
    }
    if (favourName === null) {
      return [false, "You haven't choosen a Favour type"];
    }

    return [true, "Success"];
  };

  /**************************************************************************************************
   * Summary: Handles the image upload to s3, on success Favour is created in Mongo db. On success of
   * the creation of the Favour, a new UserActivity record is also created in Mongo db
   ***************************************************************************************************/

  const handleSubmit = async () => {
    SingleImageUpload(
      "",
      TriggerResetFavourList,
      fileList,
      handleClose,
      "Record",
      favourValidation,
      userData,
      debtor,
      creditor,
      favourName,
      favourDescription,
      userList
    );
  };

  /**************************************************************************************************
   * Summary: Handles adding a new file to the fileList state variable Array
   ***************************************************************************************************/

  const addFile = data => {
    let tempFileList = fileList;
    tempFileList.push(data);

    setFileList(tempFileList);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.formContent}>
          <ToastContainer
            position="top-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
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
                onInputChange={(event, newInputValue) => {
                  setCreditor(newInputValue);
                }}
                renderInput={params => (
                  <TextField {...params} required label="Paid By" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            {userData ? (
              debtor === userData.user.email ? (
                <div className={classes.imageBox}>
                  <ImageDragAndDrop addFile={addFile} />
                </div>
              ) : (
                ""
              )
            ) : (
              ""
            )}
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
          </Grid>
        </div>
      </Paper>
    </div>
  );
};

export default RecordFavourForm;
