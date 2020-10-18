import React, { useState, Fragment, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import LaunchIcon from "@material-ui/icons/Launch";
import { useLocation } from "react-router-dom";
import Link from "@material-ui/core/Link";
import LoginSignupButtonGroup from "../loginSignupButtonGroup/index";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import NewRewardForm from "../rewards/NewRewardForm";
import Reward from "../rewards/index";
import * as APIServices from "../../api/TestAPI";
import UploadImage from "../uploadImage/index";
import UserContext from "../../context/UserContext";
import DeleteFavour from "../../components/deleteFavour/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheckSquare } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%",
    paddingLeft: "10%",
    borderStyle: "none"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    outline: "none"
  },
  modalContent: {
    backgroundColor: "white",
    maxHeight: "70%",
    overflowY: "auto",
    overflowX: "hidden",
    outline: "none",
    borderRadius: "6px"
  },
  createbutton_styling: {
    width: "100%",
    color: "white",
    marginTop: "3.5%",
    marginLeft: "3%",
    backgroundColor: "#292F36",
    textTransform: "capitalize",
    verticalAlign: "middle",
    textAlign: "center",
    height: "35px",
    justifyContent: "center",
    "&:hover": {
      color: "black",
      backgroundColor: "white"
    }
  },
  rewardContent: {
    padding: "1% 1% 1%",
    width: "120%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  submitButtonDiv: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  headingDiv: {
    backgroundColor: "#1B9AAA",
    width: "112%",
    maxWidth: "112%",
    color: "white",
    display: "flex"
  },
  closeButtonDiv: {
    dislay: "inline-block",
    marginLeft: "40%"
  },
  closeButton: {
    color: "red"
  },
  modalHeading: {
    dislay: "inline-block",
    fontSize: "20px",
    minWidth: "50%",
    marginTop: "2%"
  },
  margin: {
    marginTop: "0%"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  modalButton: {
    width: "140%",
    fontFamily: "'Roboto', 'Helvetica', 'Arial'",
    textTransform: "capitalize",
    backgroundColor: "#1B9AAA",
    "&:hover": {
      backgroundColor: "white",
      color: "black"
    }
  },
  centeredDiv: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex"
  },
  deleteRecordFromDB: {
    fontSize: "16px",
    marginLeft: "1%",
    display: "inline-block",
    backgroundColor: "#1B9AAA",
    color: "white",
    width: "100%",
    borderRadius: "3px",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
      border: "1px #1B9AAA solid",
      borderRadius: "3px"
    }
  },
  deleteButtonFromDB: {
    display: "inline-block",
    backgroundColor: "#1B9AAA",
    color: "white",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
      border: "1px #1B9AAA solid",
      borderRadius: "3px"
    }
  },
  deleteAction: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "10%",
    display: "flex"
  },
  completeFavour: {
    backgroundColor: "#1B9AAA",
    color: "white",
    borderRadius: "3px",
    width: "100%"
  },
  actionButtons: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "1%"
  }
}));

export default function FavourModal({
  FavourId,
  FavourTitle,
  Requester,
  FavourDescription,
  Rewards,
  FavourDate,
  Location,
  FavourImageKey,
  ModalType,
  PublicRequestData
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { userData, setUserData } = useContext(UserContext);

  // Rewards created for the Public Request
  const [rewards, setRewards] = useState(Rewards ? Rewards : []);

  const [favourId, setFavourId] = useState(FavourId);
  const [favourTitle, setFavourTitle] = useState(FavourTitle);
  const [requester, setRequester] = useState(Requester);
  const [favourDescription, setFavourDescription] = useState(FavourDescription);
  // const [favourDate ,setFavourDate] = useState(FavourDate);
  // const [location, setLocation] = useState(Location);
  // const [favourImageKey ,setFavourImageKey] = useState(FavourImageKey);

  const [publicRequestUserDetails, setPublicRequestUserDetails] = useState(PublicRequestData? PublicRequestData : []);

  const [isDeleted, setIsDeleted] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Controls how the Favour or Public Request component is opened to show more details
  const handleOpen = () => {
    // Open modal on click
    setOpen(true);
    console.log(FavourId);

    // If it is an existing public request get the user details
    const getUserDetails = async () => {
      // Create a new array for the Users
      let userArray = [];

      // Push the userIds stored on the rewards into the userArray
      for (let i = 0; i < rewards.length; i++) {
        if (!userArray.includes(rewards[i].providedBy)) {
          userArray.push(rewards[i].providedBy);
        }
      }
      // Push the requesterUserId into the userArray
      if (!userArray.includes(requester._id)) userArray.push(requester._id);

      // Get user details for the relevant userIds stored in the array
      const getPublicRequestsUserDetails = await APIServices.getPublicRequestUserDetails(userArray);

      if (getPublicRequestsUserDetails) {
        // Return array and set the request user details state
        setPublicRequestUserDetails(getPublicRequestsUserDetails.getPublicRequests);        
      } else {
        console.log("There was an issue with getting the data");
      }
    };

    if (Location === "/public_request") {
      getUserDetails();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addReward = reward => {
    // const newRewardItem = reward.reward;
    const newReward = [...rewards, reward];
    // console.log(newReward);
    setRewards(newReward);
  };

  const removeReward = index => {
    const newReward = [...rewards];
    newReward.splice(index, 1);
    setRewards(newReward);
  };

  const getUserEmail = (userId, nameId, label, disabled) => {
    // Evaluate reward user id against data retrieved from db, and return relevant email
    if(publicRequestUserDetails) {
      for (let i = 0; i < publicRequestUserDetails.length; i++) {
        if (userId === publicRequestUserDetails[i]._id) {
          // Return relevant user email
          return (
            <TextField
              id={nameId}
              name={nameId}
              label={label}
              InputLabelProps={{
                shrink: true
              }}
              disabled={disabled}
              defaultValue={publicRequestUserDetails[i].requestUser.email}
            />
          );
        }
      }
    } else {
      console.log("PublicRequests Object is undefined or null...")
    }
    
  };

  const deleteFavour = async FavourId => {
    console.log(FavourId)

    const response = await APIServices.deleteOneFavour({ _id: FavourId });
    if (response.ok === true) {
      setIsDeleted(true);
      setToastMessage(response.message);
      setOpen(true);
      refreshPage();
    } else {
      setIsDeleted(false);
      setToastMessage(response.message);
      setOpen(true);
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const showDeleteFavour = () => {
    if (Location === "/all_list" && userData.user.email === requester.email) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<LaunchIcon />}
        onClick={handleOpen}
        className={classes.modalButton}
      >
        {Location === "/public_request"? "View public request details": "View favour details"}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Grid container className={classes.modalContent} spacing={3}>
              <Grid className={classes.headingDiv} item xs={12}>                
              <div className={classes.modalHeading}>{Location === "/public_request"? "Public Request" : "Favour"}</div>
                <div className={classes.closeButtonDiv}>
                  <IconButton
                    aria-label="delete"
                    className={classes.margin}
                    onClick={handleClose}
                  >
                    <CancelPresentationIcon
                      fontSize="medium"
                      className={classes.closeButton}
                    />
                  </IconButton>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="requestTitle"
                  name="requestTitle"
                  label="Request Title"
                  disabled={true}
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={favourTitle}
                  // onChange={e => setRequestTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {Location === "/public_request"?
                  <TextField
                  id="requestedBy"
                  name="requestedBy"
                  label="Requested By"
                  InputLabelProps={{
                    shrink: true
                  }}
                  disabled={true}
                  defaultValue={requester.email}
                />
                                 : (
                  <TextField
                    id="requestedBy"
                    name="requestedBy"
                    label="Requested By"
                    InputLabelProps={{
                      shrink: true
                    }}
                    disabled={true}
                    defaultValue={userData.user.email}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextareaAutosize
                  id="outlined-textarea"
                  label="Task Description"
                  placeholder="Task Description"
                  rowsMin={6}
                  variant="outlined"
                  disabled={true}
                  style={{
                    height: "100%",
                    width: "100%",
                    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                    resize: "none"
                  }}
                  value={favourDescription}
                  // onChange={e => setRequestTaskDescription(e.target.value)}
                />
              </Grid>              
              <div className={classes.centeredDiv}>
                {Location === "/public_request"? (<NewRewardForm addReward={addReward} />) : ""}
              </div>
              <Fragment>
                <div className={classes.rewardContent}>
                  <List className="reward-list">
                    {rewards.map((reward, index) => (
                      <Reward
                        key={index}
                        index={index}
                        reward={reward}
                        removeReward={removeReward}
                        users={publicRequestUserDetails}
                      />
                    ))}
                  </List>
                </div>
              </Fragment>
              {showDeleteFavour()?
              (<>
              <div className={classes.centeredDiv}>
                <UploadImage
                  FavourId={FavourId}
                  FavourImageKey={FavourImageKey}
                />
              </div>
                             
              <button className={classes.deleteButtonFromDB}
                      key={"deleteFavour"}
                      onClick={() => deleteFavour(FavourId)}
              >
                <div
                  >
                    <FontAwesomeIcon
                      key={"deleteFavour"}
                      className={classes.trashIcon}
                      icon={faTrash}
                    />
                </div>
              </button>
              </>) :
                <div className={classes.actionButtons}>
                <button className={classes.deleteRecordFromDB}
                     key={"deleteFavour"}
                     onClick={() => deleteFavour(FavourId)}>
                  {Location === "/public_request"? "Delete request" : "Delete favour"}
                <div className={classes.deleteButtonFromDB}>
                    <div>
                      <FontAwesomeIcon
                        key={"deleteFavour"}
                        className={classes.trashIcon}
                        icon={faTrash}
                      />
                  </div>
                </div>
                </button>
              <button className={classes.completeFavour}>
              <div className={classes.deleteRecordFromDB}>{Location === "/public_request"? "" : "Complete favour"}</div>
              <div                  
                  // onClick={() => deleteFavour(FavourId)}
                  >
                    <FontAwesomeIcon
                      key={"completeFavour"}
                      className={classes.trashIcon}
                      icon={faCheckSquare}
                    />
                </div>
              </button>
              </div>
              }
              
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
