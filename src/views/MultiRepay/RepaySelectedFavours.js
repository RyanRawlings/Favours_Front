import React, { useState, Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import NavMenu from "../../components/navMenu/index";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ImageDragAndDrop from "../../components/uploadImage/imageDragAndDrop";
import * as ImageAPI from "../../api/ImageAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { delay } from "q";

/*****************************************************************************************
* Summary: This is the page that allows the user to upload multiple proof images and 
* subsequently repay multiple favours at once.
*
* Code Attribution: Material UI -> https://material-ui.com/
*****************************************************************************************/
const useStyles = makeStyles(theme => ({
  root: {},
  paper: {
    padding: theme.spacing(5),
    height: "100%",
    backgroundColor: "#fcfcfc"
  },
  heading: {
    marginBottom: "4%"
  },
  favourContainer: {
    marginTop: "-4%"
  },
  paperItem: {
    padding: "5% 5% 5%",
    borderRadius: "3px",
    backgroundColor: "#ffffff",
    marginBottom: "1%",
    width: "100%",
    maxHeight: "10%",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: "0.3s"
  },
  favourTypeTextField: {
    backgroundColor: "#ffffff"
  },
  favourCreditorTextField: {
    backgroundColor: "#ffffff"
  },
  favourDebtorTextField: {
    backgroundColor: "#ffffff"
  },
  favourImageBox: {
    backgroundColor: "#ffffff"
  },
  imageBox: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "-10%"
  },
  form: {
    backgroundColor: "white"
  },
  repayButton: {
    marginLeft: "10%",
    height: "10%"
  },
  headingDiv: {
    display: "flex"
  }
}));

const RepaySelectedFavours = props => {
  const classes = useStyles();
  const [favoursToBeRepayed] = useState(
    props.location.state.favoursToBeRepayed
      ? props.location.state.favoursToBeRepayed
      : []
  );
  const [fileList, setFileList] = useState([]);
  const [fileCount, setFileCount] = useState(0);

/*****************************************************************************************
* Summary: This method adds a new file object to the File Array (fileList) state variable 
* and increments the fileCount by one (can't use fileArray.length to determine how many 
* elements exist).
*****************************************************************************************/
  const addFile = data => {
    let tempFileList = fileList;
    tempFileList.push(data);
    let tempFileCount = fileCount;
    tempFileCount += 1;

    setFileList(tempFileList);
    setFileCount(tempFileCount);
  };

/*****************************************************************************************
* Summary: As the user clicks the Repay Favours button, the uploadImageToS3 api is called.
* The mulitple value passed as parameter, changes how the fileList array variable is 
* processed before uploading the images to s3.
*****************************************************************************************/  
  const handleSubmit = async () => {
    try {
      const response = await ImageAPI.uploadImageToS3(fileList, "multiple");
      if (response) {
        if(response[0] === "200") {
          uploadToMongoDB(response[1]);
        } else {
          toast.error(response[1]);
        }
      } else {
        toast.error("There was an error uploading the image(s)")
      }
      
    } catch (err) {
      toast.error("There was an error in image processing " + err);
    }
  };

/*****************************************************************************************
* Summary: If the upload to s3 was successful, the response will return an Array of urls.
* The position of these urls match the order of the fileList.
*****************************************************************************************/    
  const uploadToMongoDB = async response => {
    try {    
      let imageArray = [];
      if (response) {
        for (let i = 0; i < response.data.locationArray.length; i++) {
          imageArray.push({
            _id: favoursToBeRepayed[i].id,
            imageUrl: response.data.locationArray[i]
          });
        }
      }

      imageArray.push({ type: "Repay" });

      /*****************************************************************************************
      * Summary: storeImageData api is called to update the imageUrl fields on the respective
      * Favours. If that is completed successfully the user will recieve a toast message and
      * will be returned to the Multi Repay screen.
      *****************************************************************************************/    
      const storeImageData = await ImageAPI.storeImageData(imageArray);
      if (storeImageData) {
        toast.success(
          "Completed image upload process... Taking you back to the Repay favours screen"
        );

        await delay(3000);
        props.history.push("/multi_repay");
      }
  } catch (err) {
    toast.error("There was an error in image processing, please refresh the page");
    }
  };

  return (
    <div className={classes.root}>
      <div className="container">
        <NavMenu props={props} />
        <div className="container_right">
          <div>
            <Paper className={classes.paper}>
              <div className={classes.headingDiv}>
                <Typography variant="h5" className={classes.heading}>
                  Favours Selected to be Repayed
                </Typography>
                {console.log(
                  props.location.state.favoursToBeRepayed.length ===
                    fileList.length
                )}
                <Button
                  onClick={handleSubmit}
                  color="primary"
                  variant="contained"
                  className={classes.repayButton}
                  disabled={
                    props.location.state.favoursToBeRepayed.length ===
                    fileList.length
                      ? false
                      : true
                  }
                >
                  Repay Favours
                </Button>
              </div>
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
              <Fragment>
                {favoursToBeRepayed
                  ? favoursToBeRepayed.map((item, index) => {
                      return (
                        <div className={classes.paperItem}>
                          <form className={classes.form}>
                            <Grid
                              className={classes.favourContainer}
                              container
                              spacing={3}
                            >
                              <Grid
                                item
                                xs={12}
                                sm={3}
                                className={classes.favourImageBox}
                              >
                                <div className={classes.imageBox}>
                                  <ImageDragAndDrop
                                    props={props}
                                    addFile={addFile}
                                  />
                                </div>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={3}
                                className={classes.favourTypeTextField}
                              >
                                <TextField
                                  variant="outlined"
                                  fullWidth
                                  id="favourType"
                                  label="Favour Type"
                                  disabled={true}
                                  value={item.favourType}
                                />
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={3}
                                className={classes.favourCreditorTextField}
                              >
                                <TextField
                                  variant="outlined"
                                  fullWidth
                                  id="favourCreditor"
                                  label="Paid By"
                                  disabled={true}
                                  value={item.favourCreditor}
                                />
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={3}
                                className={classes.favourDebtorTextField}
                              >
                                <TextField
                                  variant="outlined"
                                  fullWidth
                                  id="favourDebtor"
                                  label="Owed to"
                                  disabled={true}
                                  value={item.favourDebtor}
                                />
                              </Grid>
                            </Grid>
                          </form>
                        </div>
                      );
                    })
                  : ""}
              </Fragment>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepaySelectedFavours;
