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
import * as APIServices from "../../api/TestAPI";
import Toast from "../toast/index";
import RecordFavour from "../../views/RecordFavour/RecordFavour";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    overflowY: "auto",
    overflowX: "hidden",
    outline: "none",
    borderRadius: "6px",
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
    height: "10%",
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
  newRewardFormDiv: {
    marginLeft: "auto",
    marginRight: "auto"
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

export default function NewFavourForm() {
  const classes = useStyles();

  // User information from JWT
  const { userData, setUserData } = useContext(UserContext);

  // Rewards created for the Public Request
  const [rewards, setRewards] = useState([]);

  // Public Request Form Fields
  const [requestTitle, setRequestTitle] = useState("");
  const [requestedBy] = useState(userData.user.email);
  const [requestTaskDescription, setRequestTaskDescription] = useState("");

  // Toast details
  const [isSuccessful, setIsSuccessful] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  // Toastify
  const recordNotification = () => {
    if ( isSuccessful !== null && isSuccessful === true){
      toast.success(toastMessage);
    } else if (isSuccessful !== null && isSuccessful === false) {
      toast.error(toastMessage);
    }
  }

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
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

  // Todo: update for Favour object
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
    createPublicRequest(newRequestData);
  };

  // Todo: update to the Favour function
  const createPublicRequest = async data => {
    const response = await APIServices.createPublicRequest(data);
    if (response) {
      // Set toast details
      setIsSuccessful(true);
      setToastMessage('Successfully created the Public Request! the window will close automatically');
      toast.success("Successfully created the Public Request");
      
      // Reset the rewards state variable
      setRewards([]);

      // Hold execution for 3s then close the modal
      await delay(5000);
      handleClose();
    } else {
      // Set toast details
      setIsSuccessful(false);
      setToastMessage("There was an issue creating the Public Request!");
      toast.success("Successfully created the Public Request");
      
      await delay(5000);
      handleClose();
    }
  };

  const showToast = () => {
    if (
      (isSuccessful === true && isSuccessful !== null) ||
      (isSuccessful === true && isSuccessful !== null)
    ) {
      return <Toast IsSuccessful={isSuccessful} Message={toastMessage} />;
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
        Create New Favour
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
              <div className={classes.modalHeading}>Create New Favour</div>
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
            <RecordFavour />            
          </Grid> 
        </Fade>
      </Modal>
    </div>
  );
}
