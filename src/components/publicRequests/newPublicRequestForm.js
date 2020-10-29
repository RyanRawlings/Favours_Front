import React, { useState, Fragment, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import RewardForm from "../../components/rewards/NewRewardForm";
import Reward from "../../components/rewards/index";
import Button from "@material-ui/core/Button";
import LaunchIcon from "@material-ui/icons/Launch";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import AppBar from "@material-ui/core/AppBar";
import UserContext from "../../context/UserContext";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import * as PublicRequestAPI from "../../api/PublicRequestAPI";
import SaveIcon from "@material-ui/icons/Save";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import * as UserAPI from "../../api/UserAPI";
import { Title } from "material-ui-icons";
import { delay } from "q";

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
    padding: theme.spacing(2, 4, 3)
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
    width: "100%",
    height: "10%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  submitButtonDiv: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "2%"
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
  newRewardFormDiv: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "-5%"
  },
  rewardList: {
    overflow: "scroll",
    overflowX: "hidden",
    overflowY: "auto",
    height: "60px",
    border: "1px #1B9AAA solid",
    backgroundColor: "#F6F6F6",
    padding: "1% 1% 1% 1%"
  },
  rewardTitle: {
    fontSize: "16px",
    marginLeft: "1%"
  }
}));

const NewPublicRequestForm = () => {
  const classes = useStyles();

  // User information from JWT
  const { userData, setUserData } = useContext(UserContext);

  const location = useLocation();

  // Rewards created for the Public Request
  const [rewards, setRewards] = useState([]);

  // Public Request Form Fields
  const [requestTitle, setRequestTitle] = useState(null);
  const [requestedBy] = useState(userData ? userData.user.email : null);
  const [requestTaskDescription, setRequestTaskDescription] = useState(null);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /*****************************************************************************************
   * Summary: Add new reward to reward state array variable
   ******************************************************************************************/
  const addReward = reward => {
    const newReward = [...rewards, reward];
    setRewards(newReward);
  };

  /*****************************************************************************************
   * Summary: Remove reward from reward state array variable
   ******************************************************************************************/
  const removeReward = index => {
    const newReward = [...rewards];
    newReward.splice(index, 1);
    setRewards(newReward);
  };

  /*************************************************************************************************
   * Summary: On submit pass the state data into new object array and call createPublicRequestHelper
   * to call the API
   **************************************************************************************************/

  const handleSubmitRequest = () => {
    // Create mutable version of rewards state variable
    let newRewards = rewards;

    // Add the UserId from the Context to each of the reward objects
    newRewards.forEach(element => (element["offeredById"] = userData.user._id));

    // Create the new Public Request object
    const newRequestData = {
      requestTitle: requestTitle,
      requestedBy: requestedBy,
      requestTaskDescription: requestTaskDescription,
      rewards: newRewards
    };

    // Pass the new object to the helper function to call the API
    createPublicRequestHelper(newRequestData);
  };

  /*******************************************************************************************
   * Summary: Calls the api to create new public request, if response is not null or undefined
   * a new UserActivity record is written to MongoDB
   ********************************************************************************************/

  const createPublicRequestHelper = async data => {
    const response = await PublicRequestAPI.createPublicRequest(data);
    if (response) {
      // console.log(response)
      let userId = userData.user._id;
      if (response.newPublicRequest) {
      }
      let action = `Created new Public Request ${response.newPublicRequest.title} - ${response.newPublicRequest.rewards.length} Reward(s)`;
      let newActivityData = {
        userId: userId,
        action: action
      };

      const newUserActivity = await UserAPI.createUserActivity(newActivityData);

      // // Set toast details
      toast.success("Successfully created the Public Request");

      // Reset the rewards state variable
      setRewards([]);

      // Hold execution for 3s then close the modal
      await delay(3000);
      handleClose();
    } else {
      // Set toast details
      toast.error("Error creating the Public Request");

      await delay(3000);
      handleClose();
    }
  };

  /*****************************************************************************************
   * Summary: Extra validation to ensure the required data has some value before the create
   * process begins
   ******************************************************************************************/

  const enableSubmitButton = () => {
    try {
      if (
        requestTitle !== null &&
        requestTaskDescription !== null &&
        rewards.length > 0
      ) {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      return true;
    }
  };

  /*****************************************************************************************
   * Summary: Checks whether UserContext data is still available, client side
   ******************************************************************************************/

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
        className={classes.createbutton_styling}
        type="button"
        onClick={handleOpen}
        startIcon={<LaunchIcon />}
      >
        Create New Public Request
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        disableAutoFocus={true}
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
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
                Create New Public Request
              </div>
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
                required
                id="requestTitle"
                name="requestTitle"
                label="Request Title"
                InputLabelProps={{
                  shrink: true
                }}
                onChange={e => setRequestTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="requestedBy"
                name="requestedBy"
                label="Requested By"
                InputLabelProps={{
                  shrink: true
                }}
                defaultValue={requestedBy}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextareaAutosize
                required
                id="outlined-textarea"
                label="Task Description *"
                placeholder="Task Description *"
                rowsMin={6}
                variant="outlined"
                style={{
                  height: "70%",
                  width: "100%",
                  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                  resize: "none"
                }}
                onChange={e => setRequestTaskDescription(e.target.value)}
              />
            </Grid>
            {userDataAvailable ? (
              <div className={classes.newRewardFormDiv}>
                <RewardForm addReward={addReward} userData={userData} />
              </div>
            ) : (
              ""
            )}
            <Fragment>
              <div className={classes.rewardContent}>
                <List className={classes.rewardList}>
                  {rewards.map((reward, index) => (
                    <Reward
                      key={index}
                      index={index}
                      reward={reward}
                      removeReward={removeReward}
                      location={location.pathname}
                      userData={userData}
                    />
                  ))}
                </List>
              </div>
            </Fragment>
            <div className={classes.submitButtonDiv} item xs={6}>
              <Button
                variant="contained"
                color="primary"
                disabled={
                  enableSubmitButton() && enableSubmitButton() === true
                    ? true
                    : false
                }
                startIcon={<SaveIcon />}
                onClick={() => handleSubmitRequest()}
              >
                Record
              </Button>
            </div>
          </Grid>
        </Fade>
      </Modal>
    </div>
  );
};

export default NewPublicRequestForm;
