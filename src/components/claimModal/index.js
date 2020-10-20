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
const ClaimModal = () => {
  const classes = useStyles();
  const { userData } = useContext(UserContext);
  console.log(userData);
  const [open, setOpen] = useState(false);
  // todo upload successfully or not
  const [toastMsg, setToastMsg] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    //todo submit proof
  };

  const addFile = (data) => {
    let tempFileList = fileList;
    tempFileList.push(data);

    setFileList(tempFileList);
  }

  return (
    <div>
      {userData.token ? (
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleOpen}
        >
          Claim
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          size="large"
          href={"/login"}
        >
          Claim
        </Button>
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
                autoClose={5000}
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
                  <ImageDragAndDrop addFile={addFile}/>
                </Grid>

                <TextField
                  label="Snippet"
                  multiline
                  rows={4}
                  defaultValue="Thank you"
                  variant="outlined"
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
