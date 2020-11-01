import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import UserContext from "../../context/UserContext";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import { toast } from "react-toastify";
import TextField from "@material-ui/core/TextField";
import ImageDragAndDrop from "../../components/uploadImage/imageDragAndDrop";
import * as ImageAPI from "../../api/ImageAPI";
import { delay } from "q";
import * as UserAPI from "../../api/UserAPI";
import * as PublicRequestAPI from "../../api/PublicRequestAPI";

/**************************************************************************************************
* Summary: Claim modal, allows users to upload proof to claim public requests
* 
* Code Attribution: https://material-ui.com/
**************************************************************************************************/
const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  },
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
    boxShadow: theme.shadows[5],
    outline: "none"
  },
  header: {
    backgroundColor: "#1B9AAA",
    width: "100%",
    maxWidth: "100%",
    color: "white",
    dislay: "inline-block",
    fontSize: "20px",
    minWidth: "50%"
  },
  modalContent: {
    backgroundColor: "white",
    maxWidth: "unset",
    maxHeight: "70%",
    overflowY: "auto",
    overflowX: "hidden",
    outline: "none",
    borderRadius: "6px"
  },
  body: {
    display: "flex",
    flexDirection: "column",
    margin: "0 50px 0 50px"
  },
  actionButtons: {
    display: "flex",
    margin: "4% auto 2% auto"
  },
  uploadImage: {
    marginBottom: "5%"
  }
}));

const ClaimModal = ({
  favourId,
  requester,
  claimUser,
  description,
  favourTitle,
  favourOwed,
  handleParentModalClose,
  TriggerResetPublicRequestList
}) => {
  const classes = useStyles();
  const { userData } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [snippet, setSnippet] = useState("Thank you");

  /**************************************************************************************************
   * Summary: Handles open and close actions for Claim modal
   ***************************************************************************************************/

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /**************************************************************************************************
   * Summary: Handles the submission of the image proof, uses similar logic to the SingleImageUpload
   * component, but exists separately to control the creation of new Favours records
   ***************************************************************************************************/
  const handleSubmit = async () => {
    //post imagekey, completed true

    if (fileList.length > 1) {
      toast.error("You have tried to upload more than one image...");
      return console.log("More than one file added...");
    } else if (fileList.length === 0) {
      toast.error("You haven't uploaded an image.");
      return console.log("No file added...");
    }

    try {
      const response = await ImageAPI.uploadImageToS3(fileList, "single");

      if (response) {
        uploadToMongoDB(response);
        transferToFavour(response);
      }
  
      let userId = userData.user._id;
      let action = "Claimed a public request";
      let newActivityData = {
        userId: userId,
        action: action
      };
  
      const newUserActivity = await UserAPI.createUserActivity(newActivityData);
    } catch (err) {
      console.error("An error occurred claiming the Public Request " + err);
      toast.error("An error occurred claiming the Public Request");
    }
    
  };

  /**************************************************************************************************
   * Summary: Handles the creation of Favours based on the rewards stored on the Public Request
   ***************************************************************************************************/

  const transferToFavour = async imageFile => {
    imageFile = imageFile.data.locationArray;
    let query = [];
    favourOwed.map(favour => {
      query.push({
        _id: favourId,
        requestUser: userData.user._id,
        owingUser: favour.providedBy,
        description: snippet,
        favourOwed: favour.item,
        is_completed: true,
        debt_forgiven: false,
        proofs: {
          is_uploaded: true,
          uploadImageUrl: imageFile[imageFile.length - 1],
          snippet: snippet
        }
      });
    });

    try {
      const response = await PublicRequestAPI.claimPublicRequest(query);
      if (response) {
        toast.success("Successfully claimed Public Request");
      }
    } catch (err) {
      console.error("An error occurred while claiming the Public Request " + err)
      toast.error("An error occurred while claiming the Public Request");
    }
    

  };

  /**************************************************************************************************
   * Summary: Handles the post s3 image upload, updating the Image URL for the new Favours
   ***************************************************************************************************/
  const uploadToMongoDB = async response => {
    let imageArray = [];
    if (response) {
      for (let i = 0; i < response.data.locationArray.length; i++) {
        imageArray.push({
          _id: favourId,
          imageUrl: response.data.locationArray[i]
        });
      }
    }

    imageArray.push({
      type: "ClaimPublicRequest",
      uploadedBy: userData.user._id,
      snippet: snippet
    });

    try {
      const storeImageData = await ImageAPI.storeImageData(imageArray);
      if (storeImageData) {
        toast.success("Completed image update process...");
  
        await delay(3000);
        handleClose();
        handleParentModalClose();
        TriggerResetPublicRequestList();
      }
    } catch (err) {
      console.error("An error occurred uploading the image " + err);
      toast.error("An error occurred uploading the image");
    }
    
  };

  /**************************************************************************************************
   * Summary: Handles adding new images to the fileList array, based on the file passed to the
   * ImageDragAndDrop function
   ***************************************************************************************************/

  const addFile = data => {
    let tempFileList = fileList;
    tempFileList.push(data);

    setFileList(tempFileList);
  };

  /**************************************************************************************************
   * Summary: Handles the delete of Public Requests, users can only delete public requests they create
   ***************************************************************************************************/

  const handleDelete = async () => {
    try {
      let response = await PublicRequestAPI.deletePublicRequest(favourId);

      if (response) {
        let userId = userData.user._id;
        let action = `Deleted Public Request ${favourTitle} - ${favourOwed.length} Reward(s)`;
        let newActivityData = {
          userId: userId,
          action: action
        };
  
        const newUserActivity = await UserAPI.createUserActivity(newActivityData);
  
        console.log("delete response:", response.message);
  
        toast.success("Successfully deleted public request");
  
        await delay(3000);
        handleClose();
        handleParentModalClose();
        TriggerResetPublicRequestList();
      } else {
        toast.error("There was an error deleting the public request");
        TriggerResetPublicRequestList();
      }
    } catch (err) {
      console.error("An error occurred deleting the public request " + err);
      toast.error("An error occurred deleting the public request");
    }
  
  };

  return (
    <div>
      {userData.token ? (
        requester ? (
          userData.user.email === requester.email ? (
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleDelete}
            >
              Delete
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleOpen}
            >
              Claim
            </Button>
          )
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="large"
            href={"/login"}
          >
            Claim
          </Button>
        )
      ) : (
        ""
      )}

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
            <Grid
              container
              xs={12}
              className={classes.modalContent}
              spacing={3}
            >
              <Grid item xs={12} className={classes.header}>
                Please upload proof
              </Grid>
              <Grid container xs={12} className={classes.body}>
                <Grid item xs={12} className={classes.uploadImage}>
                  <ImageDragAndDrop addFile={addFile} />
                </Grid>

                <TextField
                  label="Snippet"
                  multiline
                  rows={4}
                  defaultValue="Thank you"
                  variant="outlined"
                  onChange={e => setSnippet(e.target.value)}
                />
                <div className={classes.actionButtons}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
export default ClaimModal;
