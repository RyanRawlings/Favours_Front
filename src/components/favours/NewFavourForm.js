import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import LaunchIcon from "@material-ui/icons/Launch";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import RecordFavour from "../../components/favours/RecordFavour";

/**********************************************************************************************
 * Summary: Modal skeleton for the component to create new Favours.
 * 
 * Code Attribution: 
 * - https://material-ui.com/
 ***********************************************************************************************/
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
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  modalContent: {
    backgroundColor: "white",
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

const NewFavourForm = ({ TriggerResetFavourList }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            <Grid className={classes.headingDiv} item xs={12}>
              <div className={classes.modalHeading}>Create New Favour</div>
              <div className={classes.closeButtonDiv}>
                <IconButton
                  aria-label="delete"
                  className={classes.margin}
                  onClick={handleClose}
                >
                  <CancelPresentationIcon
                    fontSize="small"
                    className={classes.closeButton}
                  />
                </IconButton>
              </div>
            </Grid>
            <RecordFavour
              TriggerResetFavourList={TriggerResetFavourList}
              handleClose={handleClose}
            />
          </Grid>
        </Fade>
      </Modal>
    </div>
  );
};

export default NewFavourForm;
