import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import UserContext from "../../context/UserContext";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import { ToastContainer, toast } from "react-toastify";
import TextField from "@material-ui/core/TextField";
import ImageDragAndDrop from "../../components/uploadImage/imageDragAndDrop";
import axios from "axios";
import * as APIServices from "../../api/TestAPI";
import * as ImageAPI from "../../api/ImageAPI";
import { delay } from "q";

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
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    outline: "none"
  },
  header: {
    backgroundColor: "#1B9AAA",
    width: "100%",
    maxWidth: "100%",
    color: "white",
    // display: "flex",
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
    // marginLeft: "auto",
    // marginRight: "auto",
    // marginBottom: "2%",
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
  favourOwed
}) => {
  const classes = useStyles();
  const { userData } = useContext(UserContext);
  console.log(userData);
  const [open, setOpen] = useState(false);
  // todo upload successfully or not
  const [fileList, setFileList] = useState([]);
  const [snippet, setSnippet] = useState("Thank you");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    //post imagekey, completed true
    console.log("filelist:,", fileList);

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
    const uploadToS3 = await axios
      .post("http://localhost:4000/api/image/upload", imageForm)
      .then(function(response) {
        toast.success(
          "Successfully stored images on AWS... Now starting database processing"
        );
        uploadToMongoDB(response);
        transferToFavour(response);
        console.log("uploads3 response:", response.data.locationArray);
      })
      .catch(function(error) {
        toast.error(error);
      });
    console.log("uploadToS3 is:", uploadToS3);

    //const transferToFavour = await axios.post("http://localhost:4000/api/publicRequest/claim",query)
  };

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
    console.log("queryfor favour data is:", query);
    let msg = await APIServices.claimPublicRequest(query);
    console.log("msg  data is:", msg);
  };

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

    const storeImageData = await ImageAPI.storeImageData(imageArray);
    if (storeImageData) {
      toast.success("Completed image update process...");

      await delay(5000);
      window.location.reload();
    }
  };

  const addFile = data => {
    let tempFileList = fileList;
    tempFileList.push(data);

    setFileList(tempFileList);
  };

  const handleDelete = async () => {
    console.log("favourid", favourId);

    let response = await APIServices.deletePublicRequest(favourId);

    if (response) {
      console.log("delete response:", response.message);

      toast.success("successfully deleted public request");

      await delay(3000);
      window.location.reload();
    } else {
      toast.error("There was an error deleting the public request");
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
