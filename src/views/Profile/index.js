import React, { useEffect, useState, useContext, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./style.scss";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import NavMenu from "../../components/navMenu/index";
import ImageDragAndDrop from "../../components/uploadImage/imageDragAndDrop";
import * as UserAPI from "../../api/UserAPI";
import UserContext from "../../context/UserContext";
import DateDiff from "date-diff";
import Pagination from "../../components/pagination/index";
import SortObjectsArray from 'sort-objects-array';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as ImageAPI from "../../api/ImageAPI";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  container: {
    margin: "2px"
  },
  icons: {
    transform: "translateY(-0.1em)"
  },
  largeIcon: {
    margin: "auto",
    width: "50%",
    height: "60%"
  },
  profileCard: {
    margin: "0% 0% 0% 2%",
    width: "25%",
    float: "left",
    height: "80vh"
  },
  profileCardContent: {
    height: "100%"
  },
  personalDetailsCard: {
    margin: "3% 2% 2% 2%",
    height: "80vh"
  },
  avatar: {
    marginTop: "10%",
    height: "210px",
    width: "210px"
  },
  cardItems: {
    margin: "2% 2% 2% 2%",
    position: "relative",
    transition: "top ease 0.5s",
    top: "0",
    "&:hover": {
      top: "-10px",
      boxShadow: "3px 3px 5px 3px #ccc"
    }
  },
  personalDetails: {
    marginTop: "6%",
  },
  saveButton: {
    fontSize: "10px",
    textTransform: "capitalize",
    marginTop: "5.5%",
    display: "inline",
    whiteSpace: "nowrap",
    marginLeft: "-50%",
    maxHeight: "30px"
  },
  actionButtons: {
    display: "flex"
  }
}));

export default function Profile(props) {
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  const classes = useStyles();
  const [personalDetails, setPersonalDetails] = useState({});
  const [userActivity, setUserActivity] = useState([]);
  const { userData } = useContext(UserContext);
  const [fileList, setFileList] = useState([]);
  const [user, setUser] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [userActivityPerPage, setUserActivityPerPage] = useState(8);

  useEffect(() => {
    async function getUserData() {
      const user = await UserAPI.getUser({ _id: userData.user._id});
      
      if (user) {
        console.log(user);
        setUser(user)
      }
      // setPersonalDetails(userDetailData.result[0]);
    }

    getUserData();
  }, []);

  useEffect(() => {
    async function getUserActions() {
      const userActions = await UserAPI.getUserActivity({ _id: userData.user._id});
      
      for (let i = 0; i < userActions.length; i++) {
        let diff = new DateDiff();
        let recency = Date.diff(new Date(),new Date(userActions[i].time)).minutes()
        let minutes = Math.floor(recency); 
        userActions[i]["recency"] = minutes;
      }
      let sortedUserActions = SortObjectsArray(userActions, "recency", "asc")
      setUserActivity(sortedUserActions);
    }

    getUserActions();
  }, []);

  // console.log("personalDetails:", personalDetails);

  const delay = ms => new Promise(res => setTimeout(res, ms));

    //Get current activity
    const indexOfLastUserActivity = currentPage * userActivityPerPage;
    const indexOfFirstUserActivity = indexOfLastUserActivity - userActivityPerPage;
  
    const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleSubmit = async () => {

    if (fileList.length > 1) {
      toast.error("You have tried to upload more than one image...");
      return console.log("More than one file added...");
    } else if (fileList.length === 0) {
      toast.error("You haven't uploaded an image.");
      return console.log("No file added...");
    }

    let imageForm = new FormData();
    imageForm.append('image', fileList[0][0]);

    const uploadToS3 = await axios.post("http://localhost:4000/api/image/upload", imageForm)
            .then( function(response) {
                toast.success("Successfully stored image on AWS...");
                uploadToMongoDB(response);
            })
            .catch( function (error) {
                toast.error(error);
            });
  }

  const uploadToMongoDB = async (response) => {
    let newProfileImageData = {
      _id: userData.user._id,
      imageUrl: response.data.locationArray[0],
    }
    console.log(newProfileImageData)

    const storeProfileImageData = await ImageAPI.storeProfileImageData(newProfileImageData);
    if (storeProfileImageData) {
      toast.success("Completed image update process...refreshing the page");
      
      await delay(5000)
      window.location.reload();
  } 
  } 

  const addFile = data => {
    let tempFileList = fileList;
    tempFileList.push(data);

    setFileList(tempFileList);
  };

  return (
    <div className={classes.root}>
      <div className="container">
        <NavMenu props={props} />
        <div className="container_right">
          <Paper className={classes.container}>
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
            <div className="container_right_bottom">
              <Card className={classes.profileCard}>
                <CardContent className={classes.profileCardContent}>
                  <center>                    
                      <Avatar className={classes.avatar}>
                      {
                        user? 
                          <img src={user.profileImageUrl} width="230px" height="230px" alt="profile image" /> 
                          : ""
                      }
                      </Avatar>       
                    <div className={classes.actionButtons}>                  
                    <ImageDragAndDrop addFile={addFile}/>
                    <Button 
                        variant="contained"
                        color="primary"
                        className={classes.saveButton}
                        onClick={() => handleSubmit()}
                    >Save image to account</Button>
                    </div>
                    </center>
                  <table className={classes.personalDetails}>
                    <tbody>
                      <tr>
                        <td>First Name: {user.firstname}</td>
                      </tr>
                      <tr>
                        <td>Last Name: {user.lastname}</td>
                      </tr>
                      <tr>
                        <td>Email: {user.email}</td>
                      </tr>
                      <tr>
                        <td>Created Date: {new Date(user.last_update).getDate() + "/" + new Date(user.last_update).getMonth() + "/" + new Date(user.last_update).getFullYear()}</td>
                      </tr>
                      <tr>
                        <td>Last Update: {new Date(user.last_update).getDate() + "/" + new Date(user.last_update).getMonth() + "/" + new Date(user.last_update).getFullYear()}</td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </Card>
              <Card className={classes.personalDetailsCard}>
                  <CardContent className={classes.personalDetailsCardContent}>Recent Activity
              <Fragment>                    
              {userActivity?
                userActivity
                .slice(indexOfFirstUserActivity, indexOfLastUserActivity)
                .map((item, index) => {
                  return (                    
                    <Card className={classes.cardItems}key={index + "card"}>
                    <CardContent key={index + "cardContent"}>{item.action} <span style={{fontSize: "10px"}}>{item.recency} minutes ago</span></CardContent>
                  </Card>
                )}) : ""}
                </Fragment>
                </CardContent>
                {userActivity ? (
                <Pagination
                  favoursPerPage={userActivityPerPage}
                  totalFavours={
                    userActivity ? userActivity.length : 0
                  }
                  paginate={paginate}  
                />
              ) : (
                ""
              )}
                </Card>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}
