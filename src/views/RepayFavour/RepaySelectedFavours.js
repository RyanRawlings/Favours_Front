import React, { useState, useEffect, useContext, Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import NavMenu from "../../components/navMenu/index";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ImageDragAndDrop from "../../components/uploadImage/imageDragAndDrop";
import * as ImageAPI from "../../api/ImageAPI";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        overflow: "auto",
        overflowX: "hidden"
    },
    paper: {
        padding: theme.spacing(5),
        height: "100vh",
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


const RepaySelectedFavours = (props) => {
  const classes = useStyles();
  const [favoursToBeRepayed] = useState(props.location.state.favoursToBeRepayed? props.location.state.favoursToBeRepayed : []);
  const [fileList, setFileList] = useState([]);
  const [fileCount, setFileCount] = useState(0);
  const location = useLocation();

  const addFile = (data) => {
    let tempFileList = fileList;
    tempFileList.push(data);
    let tempFileCount = fileCount;
    tempFileCount += 1;

    setFileList(tempFileList);
    setFileCount(tempFileCount);
  }

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const handleSubmit = async () => {
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
            imageArray.push({ _id: favoursToBeRepayed[i].id, imageUrl: response.data.locationArray[i] });
        }        
    }
  
    imageArray.push({type: "Repay"});
    console.log("Sending off the data to the server now");
  
    const storeImageData = await ImageAPI.storeImageData(imageArray);
    if (storeImageData) {
        toast.success("Completed image update process... Taking you back to the Repay favours screen");
        
        await delay(5000)
        props.history.push("/repay_favour");
    }
  }   

return (
<div className={classes.root}>
    <div className="container">
    <NavMenu props={props} />
    <div className="container_right">
        <div >                      
            <Paper className={classes.paper}>
                <div className={classes.headingDiv}>
                    <Typography variant="h5"
                            className={classes.heading}
                    >Favours Selected to be Repayed
                    </Typography>
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        variant="contained"
                        className={classes.repayButton}
                        disabled={props.location.state.favoursToBeRepayed.length === fileList.length? false: true}
                    >Repay Favours
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
                    {favoursToBeRepayed?
                        favoursToBeRepayed.map((item, index) => { return (     
                            // <Container maxWidth="xs">
                            <div className={classes.paperItem}>
                                <form className={classes.form}>
                                    <Grid className={classes.favourContainer} container spacing={3}>
                                    <Grid item xs={12} sm={3} className={classes.favourImageBox}>
                                        <div className={classes.imageBox}>
                                            <ImageDragAndDrop props={props} addFile={addFile}/>
                                        </div>
                                    </Grid>
                                        <Grid item xs={12} sm={3} className={classes.favourTypeTextField}>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            id="favourType"
                                            label="Favour Type"
                                            disabled={true}
                                            value={item.favourType}
                                        />
                                        </Grid>
                                        <Grid item xs={12} sm={3} className={classes.favourCreditorTextField}>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            id="favourCreditor"
                                            label="Paid By"
                                            disabled={true}
                                            value={item.favourCreditor}
                                        />
                                        </Grid>
                                        <Grid item xs={12} sm={3} className={classes.favourDebtorTextField}>
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
                            // </Container>                                                                    
                        )}): ""}
                </Fragment>                   
            </Paper>                                               
        </div>            
    </div>
    </div>
</div>
);
}


export default RepaySelectedFavours;