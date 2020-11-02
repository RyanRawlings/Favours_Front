import React, { useEffect, useState, useContext, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import NavMenu from "../../components/navMenu/index";
import ImageDragAndDrop from "../../components/uploadImage/imageDragAndDrop";
import * as UserAPI from "../../api/UserAPI";
import UserContext from "../../context/UserContext";
import Pagination from "../../components/pagination/index";
import SortObjectsArray from "sort-objects-array";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as ImageAPI from "../../api/ImageAPI";
import Button from "@material-ui/core/Button";
import { delay } from "q";
import PartyDetection from "../../components/partyDetection/index";

/*********************************************************************************
 * DateDiff required for calculating how recent the user activities were 
 * performed, an error is thrown when this import is deleted
**********************************************************************************/ 
import DateDiff from "date-diff";

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
    height: "80vh"
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
    marginTop: "6%"
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
  },
  partyDetection: {
    fontSize: "10px",
    textTransform: "capitalize",
    marginTop: "10%",
    display: "inline",
    whiteSpace: "nowrap",
    maxHeight: "30px"
  }
}));

/*************************************************************************************************
 * Summary: This page is where the user can see all of their activity in the system, they can 
 * upload a profile image and activate the party detection functionality
 *************************************************************************************************/
const Profile = props => {
  const classes = useStyles();
  const [userActivity, setUserActivity] = useState([]);
  const { userData } = useContext(UserContext);
  const [fileList, setFileList] = useState([]);
  const [user, setUser] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [userActivityPerPage] = useState(5);
  const [imageUploaded, setImageUploaded] = useState(null);
  const [imageUploadComponent, setImageUploadComponent] = useState(null);

  /*************************************************************************************************
   * Summary: Returns the extended user details for the current logged in user. The data is
   * re-rendered if the user uploads a new profile image, so that the s3 url can be inserted as the
   * source for the image tag. API call wrapped in a try catch for error handling
   *************************************************************************************************/
  useEffect(() => {
    async function getUserData() {
      try {
        const user = await UserAPI.getUser({ _id: userData.user._id });

        if (user) {
          setUser(user);
          setImageUploaded(false);
          setImageUploadComponent(<ImageDragAndDrop addFile={addFile} />);
        }
      } catch (err) {
        toast.error("There was error retrieving your details, please refresh the page");
      }      
    }

    getUserData();
  }, [imageUploaded]);

  /*************************************************************************************************
   * Summary: Returns the user activity details. Date.diff used to determine how long ago the
   * activity or action was performed (recency). API is re-called as user paginates through their 
   * activity, to recalculate the time value. The API call and business logic is wrapped in a 
   * try catch for error handling.
   *************************************************************************************************/
  useEffect(() => {
    async function getUserActions() {
      try {
      const userActions = await UserAPI.getUserActivity({
        _id: userData.user._id
      });

      for (let i = 0; i < userActions.length; i++) {
        let delta = Date.diff(
          new Date(),
          new Date(userActions[i].time)
        ).seconds();
        
        userActions[i]["delta"] = delta;

        let days = Math.floor(delta / 86400);
        let hours = Math.floor(delta / 3600) % 24;
        let minutes = Math.floor(delta / 60) % 60;

        if (days && hours && minutes) {
          userActions[i][
            "recency"
          ] = `${days} days, ${hours} hours and ${minutes} minutes ago`;
        } else if (!days && hours && minutes) {
          userActions[i][
            "recency"
          ] = `${hours} hours and ${minutes} minutes ago`;
        } else if (!days && !hours && minutes) {
          userActions[i]["recency"] = `${minutes} minutes ago`;
        }
      }

      if (userActions.length > 0) {
        let sortedUserActions = SortObjectsArray(userActions, "delta", "asc");
        setUserActivity(sortedUserActions);
      } else {
        userActions.push({ action: "No activity to show" });
        setUserActivity(userActions);
      }
    } catch (err) {      
      toast.error("There was an error process your user activity details, please refresh the page");      
    }
    }
    getUserActions();
  }, [currentPage]);

  /*************************************************************************************************
   * Summary: Pagination details
   *************************************************************************************************/
  const indexOfLastUserActivity = currentPage * userActivityPerPage;
  const indexOfFirstUserActivity =
    indexOfLastUserActivity - userActivityPerPage;

  const paginate = pageNumber => setCurrentPage(pageNumber);

  /*************************************************************************************************
   * Summary: Handles the upload process of the profile images to s3. Creates new form data based
   * on the File Array, and calls the image upload API. The API call is wrapped in try catch for 
   * error handling.
   *************************************************************************************************/  
  const handleSubmit = async () => {
    if (fileList.length > 1) {
      toast.error("You have tried to upload more than one image...");
      return console.log("More than one file added...");
    } else if (fileList.length === 0) {
      toast.error("You haven't uploaded an image.");
      return console.log("No file added...");
    }

    try {
      const response = await ImageAPI.uploadImageToS3(fileList, "single");

      if (response[0] === "200") {
        uploadToMongoDB(response[1]);
      } else if (response[0] === "400") {
        toast.error("There was an error in uploading the profile image");
        console.error("There was an error in uploading the profile image to the database " + response[1]);
      }   
    } catch (err) {
      toast.error("There was an error uploading the profile image");
      console.error("There was an error uploading the profile image to the database " + err);
    }
    
  };

  /*************************************************************************************************
   * Summary: If the profile image upload to s3 is successful, this function will subsequently be
   * called to update the imageUrl field for the relevant user to the aws s3 url passed back by the
   * server.
   *************************************************************************************************/    
  const uploadToMongoDB = async response => {
    try {
      let newProfileImageData = {
        _id: userData.user._id,
        imageUrl: response.data.locationArray[0]
      };
  
      const storeProfileImageData = await ImageAPI.storeProfileImageData(
        newProfileImageData
      );

      if (storeProfileImageData) {
        toast.success("Successfully uploaded image");
        await delay(3000);
        setImageUploaded(true);
        setImageUploadComponent(null);
      }
    } catch (err) {
      toast.error("There was an error in uploading the profile image")
    }    
  };

  /*************************************************************************************************
   * Summary: Inserts a new File object into the File Array
   *************************************************************************************************/
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
              autoClose={3000}
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
                      {user ? (
                        <img
                          src={user.profileImageUrl}
                          width="230px"
                          height="230px"
                          alt="profile image"
                        />
                      ) : (
                        ""
                      )}
                    </Avatar>
                    <div className={classes.actionButtons}>
                      {imageUploadComponent}
                      {/* <ImageDragAndDrop addFile={addFile}/> */}
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.saveButton}
                        onClick={() => handleSubmit()}
                      >
                        Save image to account
                      </Button>
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
                        <td>
                          Created Date:{" "}
                          {user.create_time
                            ? new Date(user.create_time).getDate() +
                              "/" +
                              new Date(user.create_time).getMonth() +
                              "/" +
                              new Date(user.create_time).getFullYear()
                            : ""}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Last Update:{" "}
                          {user.last_update
                            ? new Date(user.last_update).getDate() +
                              "/" +
                              new Date(user.last_update).getMonth() +
                              "/" +
                              new Date(user.last_update).getFullYear()
                            : ""}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <center>
                    <PartyDetection userData={userData} />
                  </center>
                </CardContent>
              </Card>
              <Card className={classes.personalDetailsCard}>
                <CardContent className={classes.personalDetailsCardContent}>
                  Recent Activity
                  <Fragment>
                    {userActivity
                      ? userActivity
                          .slice(
                            indexOfFirstUserActivity,
                            indexOfLastUserActivity
                          )
                          .map((item, index) => {
                            return (
                              <Card
                                className={classes.cardItems}
                                key={index + "card"}
                              >
                                <CardContent key={index + "cardContent"}>
                                  {item.action}{" "}
                                  <span style={{ fontSize: "10px" }}>
                                    {item.recency}
                                  </span>
                                </CardContent>
                              </Card>
                            );
                          })
                      : ""}
                  </Fragment>
                </CardContent>
                {userActivity ? (
                  <Pagination
                    favoursPerPage={userActivityPerPage}
                    totalFavours={userActivity ? userActivity.length : 0}
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
};

export default Profile;
