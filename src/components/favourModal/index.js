import React, { useState, Fragment, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import LaunchIcon from "@material-ui/icons/Launch";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import NewRewardForm from "../rewards/NewRewardForm";
import Reward from "../rewards/index";
import * as PublicRequestAPI from "../../api/PublicRequestAPI";
import UserContext from "../../context/UserContext";
import ClaimModal from "../claimModal/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageDragAndDrop from "../../components/uploadImage/imageDragAndDrop";
import { SingleImageUpload } from "../uploadImage/singleImageUpload";
import { ForgiveFavour } from "../favours/ForgiveFavour";
import { DeleteFavour } from "../favours/DeleteFavour";
import { delay } from "q";
import * as UserFunctions from "../../utils/UserFunctions";

/****************************************************************************************************
 * Summary: Favour Modal is the main skeleton/foundation, for displaying Favours and Public Requests
 * once they have been created
 * 
 * Code Attribution: https://material-ui.com/
 ****************************************************************************************************/

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
    marginRight: "10%"
  },
  forgiveDebt: {
    marginTop: "4%",
    marginLeft: "1%",
    whiteSpace: "nowrap"
  }
}));

const FavourModal = ({
  FavourId,
  FavourTitle,
  Requester,
  FavourDescription,
  Rewards,
  Location,
  FavourImageKey,
  Complete,
  OwingUser,
  TriggerResetFavourList,
  TriggerResetPublicRequestList,
  DebtForgiven
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { userData, setUserData } = useContext(UserContext ? UserContext : {});
  const [rewards, setRewards] = useState(Rewards);
  const [currentPage, setCurrentPage] = useState(1);

  const [favourId, setFavourId] = useState(FavourId);
  const [favourTitle, setFavourTitle] = useState(FavourTitle);
  const [requester, setRequester] = useState(Requester);
  const [owingUser, setOwingUser] = useState(OwingUser);
  const [requesterEmail, setRequesterEmail] = useState(null);
  const [owingUserEmail, setOwingUserEmail] = useState(null);
  const [favourDescription, setFavourDescription] = useState(FavourDescription);
  const [favourImageKey, setFavourImageKey] = useState(FavourImageKey);
  const [publicRequestUserDetails, setPublicRequestUserDetails] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [changeReward, setChangeReward] = useState(false);

  /**************************************************************************************************
   * Summary: React useEffect hook bound to the FavourId and reward state variables to re-render on
   * change of Favour/Request and to check if request and reward count is 0 then execute auto delete
   ***************************************************************************************************/
  useEffect(() => {
    if (rewards) {
      if (Location === "/public_request" && rewards.length === 0) {
        const deletePublicRequest = async () => {
          try {          
                let response = await PublicRequestAPI.deletePublicRequest(favourId);

                if (response) {
                  toast.success(
                    "No reward left. Automatically delete the request..."
                  );

                  await delay(4000);
                  TriggerResetFavourList();
                } else {
                  toast.error("There was an error deleting the public request");
                }
              } catch (err) {
                toast.error("There was an error deleting the Public Request");
                console.error("There was an error deleting the Public Request " + err);
              }
        };
        deletePublicRequest();
      }
    }
  }, [favourId, rewards]);

  /**************************************************************************************************
   * Summary: Controls how the Favour or Public Request component is opened and to show more details
   ***************************************************************************************************/
  const handleOpen = () => {
    // Open modal on click
    setOpen(true);

    setRequester(Requester);
    setFavourTitle(FavourTitle);
    setFavourId(FavourId);
    setFavourDescription(FavourDescription);

    // If there is a change in the rewards update the reward state variable, this will trigger a
    // re-render
    if (changeReward) {
      setRewards(rewards);
    } else {
      setRewards(Rewards ? Rewards : []);
      setChangeReward(false);
    }

    // Fetching the user details to be displayed through the modal
    const getUserDetails = async () => {
      let userArray = [];

      // If opened on Public Request page
      if (Location === "/public_request") {
        // Get all of the unique user ids stored with each reward
        for (let i = 0; i < rewards.length; i++) {
          if (!userArray.includes(rewards[i].providedBy)) {
            userArray.push(rewards[i].providedBy);
          }
        }
        // Add the original requester to the array
        if (!userArray.includes(requester._id)) userArray.push(requester._id);
        // Add the current user to the array
        if (userDataAvailable === true) {
          if (!userArray.includes(userData.user._id))
            userArray.push(userData.user._id);
        }
      }
      // If opened on Manage Favours page
      else if (Location === "/manage_favours") {
        userArray.push(Requester);
        userArray.push(OwingUser);
      }

      try {
          // Returns an array of user objects      
          const getPublicRequestsUserDetails = await PublicRequestAPI.getPublicRequestUserDetails(
            userArray
          );        

          if (getPublicRequestsUserDetails) {
            // Return array and set the request user details state
            // console.log("Users returned: ", getPublicRequestsUserDetails );
            setPublicRequestUserDetails(getPublicRequestsUserDetails);
          } else {
            console.log("There was an issue with getting the data");
          }
      } catch (err) {
        console.error("An error occurred retrieving the data " + err);
        toast.error("An error occurred retrieving the data");
      }
    };

    getUserDetails();
  };

  /**************************************************************************************************
   * Summary: Controls how the Favour or Public Request component is closed
   ***************************************************************************************************/
  const handleClose = () => {
    setOpen(false);
  };

  /**************************************************************************************************
   * Summary: Controls how the Favour or Public Request component is closed, from a child component
   ***************************************************************************************************/
  const handleParentModalClose = () => {
    handleClose();
  };

  /**************************************************************************************************
   * Summary: Controls how rewards are added to existing Public Requests
   * Users can only add rewards on behalf of their own account, on add their details stored in the
   * UserContext is added to Public Request frontend and backend
   ***************************************************************************************************/
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

    // New reward data appeneded to existing reward state data
    const newReward = [
      ...rewards,
      {
        _id: reward.rewardId,
        item: reward.rewardName,
        quantity: reward.rewardQuantity,
        providedBy: reward.providedBy
      }
    ];

    try {
      const response = await PublicRequestAPI.addReward(
        favourId,
        newReward,
        newPublicRequestUserDetails
      );

      if (response) {
        setRewards(response.data.rewards);
        setChangeReward(true);
      }
    } catch (err) {
      console.error("There was an error adding the Reward " + err);
      toast.error("There was an error adding the Reward");
    }    
  };

  /**************************************************************************************************
   * Summary: Controls how rewards are removed from existing Public Requests
   * Users can only remove rewards that they have added through their account, on delete the reward
   * is removed from the Public Request frontend and backend
   ***************************************************************************************************/
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

    try {
        // Fetch new reward
        const response = await PublicRequestAPI.addReward(
          favourId,
          newReward,
          newPublicRequestUserDetails
        );

        if (response) {
          setRewards(newReward);
          setChangeReward(true);
          toast.success("Successfully removed reward from request");
        }
        
    } catch (err) {
      console.error("An error occurred removing the Reward " + err);
      toast.error("An error occurred removing the Reward");
    }
    
  };

  /**************************************************************************************************
   * Summary: Returns Material UI TextField or single email, based on the parameters passed,
   *
   * @param value If true the value return will be an email based on the userId passed
   * @param nameId The value to be assigned as the name and id values for the TextField element returned
   * @param label The value of the label to be assigned to the TextField element returned
   * @param disabled Determines whether the TextField element returned, can be interacted with
   ***************************************************************************************************/
  const getUserEmail = (userId, nameId, label, disabled, value) => {
    let result = UserFunctions.GetUserEmail(publicRequestUserDetails, userId, nameId, label, disabled, value, Location);

    return result? result : "";
  };

  /**************************************************************************************************
   * Summary: Deletes a Favour from the Database, based on the FavourId parameter passed
   *
   * @param FavourId the object id value for the Favour that is to be deleted
   ***************************************************************************************************/
  const deleteFavour = async FavourId => {
    DeleteFavour(
      userData,
      Requester,
      FavourTitle,
      FavourId,
      handleClose,
      TriggerResetFavourList,
      getUserEmail
    );
  };

  /**************************************************************************************************
   * Summary: Sets the debt_forgiven field for a Favour to true in the Database, based on the
   * FavourId parameter passed
   *
   * @param FavourId the object id value for the Favour that is to be forgiven
   ***************************************************************************************************/
  const forgiveFavour = async FavourId => {
    ForgiveFavour(
      userData,
      Requester,
      FavourTitle,
      FavourId,
      handleClose,
      TriggerResetFavourList,
      getUserEmail
    );
  };

  /**************************************************************************************************
   * Summary: Handles adding a new image to a Public Request and Favour
   *
   * @param data refers to the File array that is being handled by the ImageDragAndDrop component
   ***************************************************************************************************/

  const addFile = async data => {
    try {
      // If there is more than one file, show user error and reload the page
      if (data[1]) {
        toast.error("You can only upload one image...");
        setFileList([]);
      }
      // Else update file list
      let tempFileList = fileList;

      tempFileList.push(data);
      setFileList(tempFileList);
    } catch (error) {
      // If error occurs show user error and close modal
      toast.error("An error occurred in upload...  Window will refresh");

      await delay(3000);
      handleClose();
      TriggerResetFavourList();
    }
  };

  /**************************************************************************************************
   * Summary: Handles adding a new image to a Public Request and Favour
   *
   * @param data refers to the File array that is being handled by the ImageDragAndDrop component
   ***************************************************************************************************/
  const handleRepayFavour = async () => {
    console.log(SingleImageUpload(  FavourId,
      TriggerResetFavourList,
      fileList,
      handleClose,
      "Repay",
      null,
      userData,
      null,
      null,
      null,
      null,
      null));
  };

  /**************************************************************************************************
   * Summary: Returns a boolean value to determine whether a Favour should show the delete button
   ***************************************************************************************************/
  const showDeleteFavour = () => {
    if (userData.user._id === OwingUser) {
      return true;
    } else {
      return false;
    }
  };

  /**************************************************************************************************
   * Summary: Returns a boolean value to determine whether the userData stored in the UserContext
   * is still valid.
   ***************************************************************************************************/
  const userDataAvailable = () => {
    try {
      if (userData.user.email) {
        return true;
      }
    } catch (err) {
      return false;
    }
  };

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
                autoClose={2000}
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
                  id={
                    Location === "/public_request"
                      ? "requestTitle"
                      : "favourType"
                  }
                  name={
                    Location === "/public_request"
                      ? "requestTitle"
                      : "favourType"
                  }
                  label={
                    Location === "/public_request"
                      ? "Request Title"
                      : "Favour Type"
                  }
                  disabled={true}
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={favourTitle}
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
                ) : Location === "/manage_favours" ? (
                  <TextField
                    id="paidBy"
                    name="paidBy"
                    label="Paid By"
                    InputLabelProps={{
                      shrink: true
                    }}
                    disabled={true}
                    value={getUserEmail(Requester, "paidBy", "Paid By", true, true)}
                  />
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                {Location === "/manage_favours"
                  ?  <TextField
                  id="owingBy"
                  name="owingBy"
                  label="Owing By"
                  InputLabelProps={{
                    shrink: true
                  }}
                  disabled={true}
                  value={getUserEmail(OwingUser, "owingBy", "Owing By", true, true)}
                />                  
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
                />
              </Grid>
              <div className={classes.centeredDiv}>
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
              {Location === "/public_request" ? (
                <div className={classes.actionButtons}>
                  <ClaimModal
                    favourId={FavourId}
                    requester={Requester}
                    claimUser={userData}
                    description={FavourDescription}
                    favourOwed={rewards}
                    favourTitle={favourTitle}
                    handleParentModalClose={handleParentModalClose}
                    TriggerResetPublicRequestList={
                      TriggerResetPublicRequestList
                    }
                  />
                </div>
              ) : (
                ""
              )}

              {/***********************************************************************************
              * If the user is owed the Favour show the Delete Button and Forgive Debt Button.
              * The debt_forgiven boolean value from the Favour is passed as a prop (DebtForgiven) 
              * to this component. If the Favour has been Forgiven, user who was owed the debt
              * cannot Forgive the debt again, only Delete it
              *************************************************************************************/}
              {Location === "/public_request" ? (
                ""
              ) : Location === "/manage_favours" &&
                showDeleteFavour() === true ? (
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
                        disabled={DebtForgiven}
                      >
                        Forgive Debt
                      </Button>
                    </div>
                  </div>

                  {FavourImageKey ? (
                    <div className={classes.imageRepayFavours}>
                      <div>Uploaded Proof</div>
                      <img src={FavourImageKey} width="100px" height="100px" />
                    </div>
                  ) : (
                    <div className={classes.imageRepayFavours}>
                      Uploaded Proof: No file present
                    </div>
                  )}
                </>
              ) : 
              (
                <>
                  {/***********************************************************************************
                  * If the user is owing the Favour, then only show the Repay button.
                  * The is_completed boolean value from the Favour record is passed as a prop 
                  * (Complete) to this component. If the Favour has been Completed, it means that the 
                  * user has repayed the the Favour, and cannot Repay the Favour again. Once the Favour 
                  * has been Forgiven, the owing by user can delete the Favour.
                  *************************************************************************************/}
                  <div className={classes.repayFavour}>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handleRepayFavour}
                      disabled={Complete === false ? false : true}
                    >
                      Repay
                    </Button>
                  </div>
                  <div className={classes.repayFavour}>
                  {
                    DebtForgiven === true? 
                    <Button
                      key={"deleteFavour"}
                      onClick={() => deleteFavour(FavourId)}
                      color="primary"
                      variant="contained"
                    >
                    Delete
                    </Button>: ""
                  }
                  </div>
                  <div className={classes.imageRepayFavours}>
                    {Complete === true ? (
                      <div className={classes.imageRepayFavours}>
                        <div>Uploaded Proof</div>
                        <div>
                          {FavourImageKey ? (
                            <img
                              src={FavourImageKey}
                              width="100px"
                              height="100px"
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    ) : (
                      <ImageDragAndDrop addFile={addFile} />
                    )}
                  </div>
                </>
              )}
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default FavourModal;
