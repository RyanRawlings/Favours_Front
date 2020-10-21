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
import ClaimModal from "../claimModal/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageDragAndDrop from "../../components/uploadImage/imageDragAndDrop";
import axios from "axios";
import * as ImageAPI from "../../api/ImageAPI";
import * as UserAPI from "../../api/UserAPI";
import * as FavourAPI from "../../api/FavourAPI";

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
    width: "100%",
    // marginLeft: "auto",
    // marginRight: "auto",
    overflow: "scroll",
    overflowX: "hidden",
    overflowY: "auto",
    border: "1px #1B9AAA solid",
    backgroundColor: "#F6F6F6",
    padding: "1% 1% 1% 1%",
    height: "100px"
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
  },
  rewardHeading: {
    marginLeft: "2%"
  },
  deleteFavour: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "2%"
  },
  imageRepayFavours: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "1%"
  },
  repayFavour: {
    marginLeft: "2%",
    marginBottom: "2%"
  },
  imageBox: {
    display: "inline-block",
    marginRight: "10%",

  },
  forgiveDebt: {
    marginTop: "4%",
    marginLeft: "1%",
    whiteSpace: "nowrap"
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
  PublicRequestData,
  User,
  CurrentPage,
  Complete,
  OwingUser

}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { userData, setUserData } = useContext(UserContext ? UserContext : {});
  // console.log("favourmodal props:", userData);
  // Rewards created for the Public Request
  const [rewards, setRewards] = useState(Rewards);
  const [currentPage, setCurrentPage] = useState(1);

  const [favourId, setFavourId] = useState(FavourId);
  const [favourTitle, setFavourTitle] = useState(FavourTitle);
  const [requester, setRequester] = useState(Requester);
  const [owingUser, setOwingUser] = useState(OwingUser);
  const [favourDescription, setFavourDescription] = useState(FavourDescription);

  // const [favourDate ,setFavourDate] = useState(FavourDate);
  // const [location, setLocation] = useState(Location);
  const [favourImageKey ,setFavourImageKey] = useState(FavourImageKey);

  const [publicRequestUserDetails, setPublicRequestUserDetails] = useState([]);

  const [isDeleted, setIsDeleted] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const [fileList, setFileList] = useState([]);
  const [changeReward, setChangeReward] = useState(false);

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const userDataAvailable = () => {
    try {
      if (userData.user.email) {
        return true;
      }
    } catch (err) {
      return false;
    }
  };
  // auto delete 0 reward request
  useEffect(() => {
    if (rewards) {
      if (rewards.length === 0) {
        const deletePublicRequest = async () => {
          console.log("favourid", favourId);
  
          let response = await APIServices.deletePublicRequest(favourId);
  
          if (response) {
            console.log("delete response:", response.message);
  
            toast.success("No reward left. Automatically delete the request...");
  
            await delay(5000);
            window.location.reload();
          } else {
            toast.error("There was an error deleting the public request");
          }
      }
      deletePublicRequest();
    }        
    }
  }, [favourId, rewards]);

  // Controls how the Favour or Public Request component is opened to show more details
  const handleOpen = () => {
    console.log("Open Clicked!!!!");
    // Open modal on click
    setOpen(true);

    // Need to reset the state variables based on the props newly passed to the modal component
    setFavourId(FavourId);
    setFavourTitle(FavourTitle);
    setFavourDescription(FavourDescription);
    setRequester(Requester);
    //
    if (changeReward) {
      setRewards(rewards);
    } else {
      setRewards(Rewards ? Rewards : []);
      setChangeReward(false);
    }

    // If it is an existing public request get the user details
    const getUserDetails = async () => {
      // Create a new array for the Users
      let userArray = [];
      if (Location === "/public_request") {
        // Push the userIds stored on the rewards into the userArray
        for (let i = 0; i < rewards.length; i++) {
          if (!userArray.includes(rewards[i].providedBy)) {
            // console.log("iterative print", rewards[i].providedBy)
            userArray.push(rewards[i].providedBy);
          }
        }

        // Push the requesterUserId into the userArray
        if (!userArray.includes(requester._id)) userArray.push(requester._id);
        // Push the current into the userArray, in case they want to add a reward to the public request
        if (userDataAvailable === true) {
          if (!userArray.includes(userData.user._id))
            userArray.push(userData.user._id);
        }      

      } else if (Location === "/all_list") {
        userArray.push(Requester);
        userArray.push(OwingUser);
      }


      // Get user details for the relevant userIds stored in the array
      // console.log("userArray:", userArray);
      // console.log("getUserdetial:", rewards);
      const getPublicRequestsUserDetails = await APIServices.getPublicRequestUserDetails(
        userArray
      );

      if (getPublicRequestsUserDetails) {
        // Return array and set the request user details state
        setPublicRequestUserDetails(getPublicRequestsUserDetails);
        console.log(
          "getPublicRequestsUserDetails is:",
          getPublicRequestsUserDetails
        );
      } else {
        console.log("There was an issue with getting the data");
      }
    };

    getUserDetails();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addReward = async reward => {
    setChangeReward(true);
    // add new user
    const newPublicRequestUserDetails = [
      ...publicRequestUserDetails,
      {
        _id: userData.user._id,
        firstname: userData.user.firstname,
        email: userData.user.email
      }
    ];

    setPublicRequestUserDetails(newPublicRequestUserDetails);
    // add new reward
    const newReward = [
      ...rewards,
      {
        _id: reward.rewardId,
        item: reward.rewardName,
        quantity: reward.rewardQuantity,
        providedBy: reward.providedBy
      }
    ];
    // console.log("newrewards:", newReward);

    const response = await APIServices.addReward(
      favourId,
      newReward,
      newPublicRequestUserDetails
    );
    setToastMessage(response.message);
    setRewards(response.data.rewards);
    setChangeReward(true);
    console.log("resultadd:", response.data.rewards);
  };

  const removeReward = async index => {
    setChangeReward(true);
    //slice reward
    const newReward = [...rewards];
    newReward.splice(index, 1);
    console.log("newReward is:", newReward);
    // fetch new user
    const newPublicRequestUserDetails = [
      ...publicRequestUserDetails,
      {
        _id: userData.user._id,
        firstname: userData.user.firstname,
        email: userData.user.email
      }
    ];
    setPublicRequestUserDetails(newPublicRequestUserDetails);
    // fetch new reward

    const response = await APIServices.addReward(
      favourId,
      newReward,
      newPublicRequestUserDetails
    );
    setToastMessage(response.message);
    // setRewards(response.data.rewards);
    setRewards(newReward);
    console.log("result removez:", response.data.rewards);
    setChangeReward(true);
    toast.success("Successfully removed reward from request");
  };

  const getUserEmail = (userId, nameId, label, disabled) => {
    // console.log(userId)
    console.log("get user email: ", userId, nameId, label, disabled);
    // console.log(publicRequestUserDetails);
    // Evaluate reward user id against data retrieved from db, and return relevant email
    if (publicRequestUserDetails) {
      for (let i = 0; i < publicRequestUserDetails.length; i++) {
        if (userId === publicRequestUserDetails[i]._id) {
          // Return relevant user email
          if (Location === "/public_request") {
            return (
              <TextField
                id={nameId}
                name={nameId}
                label={label}
                InputLabelProps={{
                  shrink: true
                }}
                disabled={disabled}
                value={publicRequestUserDetails[i].requestUser.email}
              />
            );
          } else {
          return (
            <TextField
              id={nameId}
              name={nameId}
              label={label}
              InputLabelProps={{
                shrink: true
              }}
              disabled={disabled}
              value={publicRequestUserDetails[i].email}
            />
          );
          }
        }
      }
    } else {
      console.log("PublicRequests Object is undefined or null...");
    }
  };

  const deleteFavour = async FavourId => {
    const response = await APIServices.deleteOneFavour({ _id: FavourId });
    if (response.ok === true) {
      setIsDeleted(true);
      setToastMessage(response.message);
      toast.success("Successfully deleted Favour");

      await delay(5000);
      setOpen(false);
      refreshPage();
    } else {
      toast.error("Error deleting the Favour, execution has halted");

      await delay(5000);
      setOpen(false);
      refreshPage();
    }
  };

  const forgiveFavour = async FavourId => {
    const response = await FavourAPI.forgiveFavour({ _id: FavourId });
    if (response) {
      toast.success("Successfully forgave favour debt... page will refresh to update");

      await delay(5000);
      setOpen(false);
      refreshPage();
    } else {
      toast.error("Error forgiving the favour debt... page will refresh to update");

      await delay(5000);
      setOpen(false);
      refreshPage();
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const showDeleteFavour = () => {
    if (userData.user._id === owingUser || FavourImageKey) {
      return true;
    } else {
      return false;
    }
  };

  const addFile = async data => {

    try {
      // If there is more than one file, show user error and reload the page
      if (data[1]) {        
        toast.error("You can only upload one image... Window will refresh");

        await delay(5000);
        window.location.reload();
      } 

      // Else update file list
      let tempFileList = fileList;
  
      tempFileList.push(data);        
      setFileList(tempFileList);
    } catch (error) {
      // If error occurs show user error and close modal
      toast.error("An error occurred in upload...  Window will refresh");

      await delay(5000);
      handleClose();
    }    
  };

  const handleSubmit = async () => {

    if (fileList.length > 1) {
      toast.error("You have tried to upload more than one image...");
      return console.log("More than one file added...");
    } else if (fileList.length === 0) {
      toast.error("You haven't uploaded an image.");
      return console.log("No file added...");
    }

    let imageForm = new FormData();

    for (let i = 0; i < fileList.length; i++) {
        // console.log(fileList[i][0]);
        imageForm.append("image", fileList[i][0]);
    }

    //   const uploadImagesToS3 = await ImageAPI.uploadS3Image(imageForm);
    const uploadToS3 = await axios.post("http://localhost:4000/api/image/upload", imageForm)
            .then( function(response) {
                toast.success("Successfully stored images on AWS... Now starting database processing");
                uploadToMongoDB(response);
            })
            .catch( function (error) {
                toast.error(error);
            })
  }

  const uploadToMongoDB = async (response) => {
    let imageArray = [];
    if (response) {
        for (let i = 0; i < response.data.locationArray.length; i++) {
            imageArray.push({ _id: FavourId, imageUrl: response.data.locationArray[i] });
        }        
    }
  
    imageArray.push({type: "Repay"});
  
    const storeImageData = await ImageAPI.storeImageData(imageArray);
    if (storeImageData) {
        toast.success("Completed image update process...");
        
        await delay(5000);
        window.location.reload();
    }
  }  

  // console.log(fileList, fileCount);

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<LaunchIcon />}
        onClick={handleOpen}
        className={classes.modalButton}
      >
        {Location === "/public_request"
          ? "View public request details"
          : "View favour details"}
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
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              <Grid className={classes.headingDiv} item xs={12}>
                <div className={classes.modalHeading}>
                  {Location === "/public_request" ? "Public Request" : "Favour"}
                </div>
                <div className={classes.closeButtonDiv}>
                  <IconButton
                    aria-label="delete"
                    className={classes.margin}
                    onClick={handleClose}
                  >
                    <CancelPresentationIcon
                      fontSize="default"
                      className={classes.closeButton}
                    />
                  </IconButton>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id={Location === "/public_request"? "requestTitle" : "favourType"}
                  name={Location === "/public_request"? "requestTitle" : "favourType"}
                  label={Location === "/public_request"? "Request Title" : "Favour Type"}
                  disabled={true}
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={favourTitle}
                  // onChange={e => setRequestTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {Location === "/public_request" ? (
                  <TextField
                    id="requestedBy"
                    name="requestedBy"
                    label="Requested By"
                    InputLabelProps={{
                      shrink: true
                    }}
                    disabled={true}
                    defaultValue={
                      requester.email
                        ? requester.email
                        : requester
                        ? requester
                        : ""
                    }
                  />
                ) : Location === "/all_list"?
                 (getUserEmail(Requester, "paidBy", "Paid By", true)) : ""} 
              </Grid>
              <Grid item xs={12} sm={6}>
              {Location === "/all_list"? 
              getUserEmail(OwingUser, "owingBy", "Owing By", true)
              : ""}
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
                {/*If the userData is available and if the Location is public request, then show the New Reward Form
                   Else return nothing*/}
                {userDataAvailable() === true ? (
                  Location === "/public_request" ? (
                    <NewRewardForm addReward={addReward} userData={userData} />
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>

              {Location === "/public_request" ? (
                <>
                  {/* <div className={classes.rewardHeading}>Reward Details</div> */}
                  <Grid item xs={12} sm={12}>
                    <Fragment>
                      <div className={classes.rewardContent}>
                        <List className="reward-list">
                          {rewards.map((reward, index) => (
                            <Reward
                              key={index}
                              index={index}
                              reward={reward}
                              removeReward={removeReward}
                              users={
                                publicRequestUserDetails
                                  ? publicRequestUserDetails
                                  : ""
                              }
                              location={Location}
                              userData={userData}
                            />
                          ))}
                        </List>
                      </div>
                    </Fragment>
                  </Grid>
                </>
              ) : (
                ""
              )}
              {
                Location === "/public_request"? 
                (
                  <div className={classes.actionButtons}>
                    <ClaimModal favourId={FavourId} requester={Requester}/>
                  </div>
                ) : ""
              }              
              {Location === "/public_request"? "": Location === "/all_list" && showDeleteFavour() === true ? 
              <>
              <div className={classes.deleteFavour}>
                  <Button
                    key={"deleteFavour"}
                    onClick={() => deleteFavour(FavourId)}
                    color="primary"
                    variant="contained"                
                  >
                    Delete
                  </Button>
                  <div className={classes.forgiveDebt}>
                    <Button
                      key={"forgiveFavour"}
                      onClick={() => forgiveFavour(FavourId)}
                      color="primary"
                      variant="contained"                
                    >
                      Forgive Debt
                    </Button>
                  </div> 
                </div>
              
                {FavourImageKey?
                <div className={classes.imageRepayFavours}>
                  <div>Uploaded Proof</div>
                    <img src={FavourImageKey} width="100px" height="100px"/>
                </div>:                 
                  <div className={classes.imageRepayFavours}>Uploaded Proof: No file present</div>
                }
                
              </>
               :<> 
                  <div className={classes.repayFavour}>
                    <Button 
                          color="primary"
                          variant="contained"
                          onClick={handleSubmit}
                          disabled={Complete === false? false: true}
                    >Repay
                    </Button>
                  </div>
                  <div className={classes.imageRepayFavours}>
                      {Complete === true? 
                              <div className={classes.imageRepayFavours}>
                                <div>Uploaded Proof</div>                                
                                <div>
                                    {FavourImageKey? 
                                    <img src={FavourImageKey} width="100px" height="100px"/> : ""
                                  }
                                </div>
                                
                              </div>
                              : <ImageDragAndDrop addFile={addFile}/>}
                  </div>                              
                </>
                }
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
