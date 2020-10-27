import React from 'react';
import { useContext } from "react";
import * as ImageAPI from "../../api/ImageAPI";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { delay } from "q";
import * as FavourAPI from "../../api/FavourAPI";
import * as UserAPI from "../../api/UserAPI";
import { GetUserIdFromEmail } from "../../utils/UserFunctions";

const SingleImageUpload = (FavourId, 
 TriggerResetFavourList, 
 fileList, 
 handleClose, 
 type, 
 favourValidation,
 userData, 
 debtor,
 creditor,
 favourName,
 favourDescription,
 userList) => {
  if (type === "Repay") {
    imageUploadRepayFavour(FavourId,
                           TriggerResetFavourList,
                           fileList,
                           handleClose);

  } else if (type === "Record") {
    imageUploadCreateFavour(TriggerResetFavourList,
                            fileList,
                            handleClose,
                            favourValidation,
                            userData,
                            debtor,
                            creditor,
                            favourName,
                            favourDescription,
                            userList);
  }
  
}

async function imageUploadCreateFavour(TriggerResetFavourList, 
                                       fileList, 
                                       handleClose, 
                                       favourValidation,   
                                       userData,
                                       debtor,
                                       creditor, 
                                       favourName,
                                       favourDescription,
                                       userList) {
  
    let favourValidationResult = favourValidation();
    
    if (favourValidationResult[0] === false) {
      toast.error(favourValidationResult[1])
      return console.log(favourValidationResult[1])
    } 

    if (debtor === userData.user.email) {
      if (fileList.length > 1) {
        toast.error("You have tried to upload more than one image...");
        return console.log("More than one file added...");
      } else if (fileList.length === 0) {
        toast.error("You haven't uploaded an image.");
        return console.log("No file added...");
      }
    } else if (debtor !== userData.user.email) {
      createFavourMongo(null, favourValidationResult, "creditor", TriggerResetFavourList, handleClose, userData,  debtor,creditor,favourName,favourDescription, userList);
      return console.log("No file upload required.");
    }

  let imageForm = new FormData();
  imageForm.append('image', fileList[0][0]);
  
  const uploadToS3 = await axios.post("http://localhost:4000/api/image/upload", imageForm)
          .then( function(response) {
            createFavourMongo(response, favourValidationResult, "debtor", TriggerResetFavourList, handleClose, userData, debtor,
              creditor,
              favourName,
              favourDescription,
              userList);
          })
          .catch( function (error) {
              toast.error(error);
          })
  }
  
  async function createFavourMongo(response,
                                   favourValidationResult,
                                   type,
                                   TriggerResetFavourList,
                                   handleClose,
                                   userData, 
                                   debtor,
                                   creditor,
                                   favourName,
                                   favourDescription,
                                   userList) {

  let newFavour = {};
  if (favourValidationResult[0] === true) {
    let requestUser = await GetUserIdFromEmail(creditor, userList);
    let owingUser = await GetUserIdFromEmail(debtor, userList);

    const newFavourData = {
      requestUser: requestUser,
      owingUser: owingUser,
      description: favourDescription,
      favourOwed: favourName,
      is_completed: false,
      debt_forgiven: false,
      proofs: {
        is_uploaded: false,
        uploadImageUrl: null,
        snippet: ""
      }
    };  
  
    const createNewFavour = await FavourAPI.createFavour(newFavourData);
  
    if (createNewFavour) {
      let userId = userData.user._id;
      let action = "Created new favour " + createNewFavour.favourOwed.toString();
      let newActivityData = {
        userId: userId,
        action: action
      }
  
      const newUserActivity = await UserAPI.createUserActivity(newActivityData);
  
      if (newUserActivity) {
        console.log("new user action log: 200");
      }
  
      if (
        createNewFavour.success === true &&
        createNewFavour.success !== null
      ) {
        toast.success(createNewFavour.message);                   
        
      } else if (
        createNewFavour.success === true &&
        createNewFavour.success !== null
      ) {
        toast.error(createNewFavour.message);
      }
    }
    
    newFavour = createNewFavour;
    
  } else {
    toast.error(favourValidationResult[1]);
  }
  
  if (type === "debtor") {
    let imageArray = [];
    if (response) {
        for (let i = 0; i < response.data.locationArray.length; i++) {
            imageArray.push({ _id: newFavour._id, imageUrl: response.data.locationArray[i] });
        }        
    }
  
    imageArray.push({type: "Record"});
  
    const storeImageData = await ImageAPI.storeImageData(imageArray);
    if (storeImageData) {        
      toast.success("Successfully created Favour");
  
      await delay(3000);  
      TriggerResetFavourList();
      handleClose();
    } 
  } else if (type === "creditor") {
  
    await delay(3000);
    TriggerResetFavourList();
    handleClose();
  }
}


async function imageUploadRepayFavour(FavourId, TriggerResetFavourList, fileList, handleClose) {
  if (fileList.length > 1) {
      toast.error("You have tried to upload more than one image...");
      return console.log("More than one file added...");

    } else if (fileList.length === 0) {
      toast.error("You haven't uploaded an image.");
      return console.log("No file added...");
    }

    let imageForm = new FormData();

    for (let i = 0; i < fileList.length; i++) {
      imageForm.append("image", fileList[i][0]);
    }

    const uploadToS3 = await axios
      .post("http://localhost:4000/api/image/upload", imageForm)
      .then(function(response) {
        updateRepayedFavourMongo(response, FavourId, handleClose, TriggerResetFavourList);
      })
      .catch(function(error) {
        toast.error(error);
      });
  };

  const updateRepayedFavourMongo = async (response, FavourId, handleClose, TriggerResetFavourList) => {
    let imageArray = [];

    if (response) {
      for (let i = 0; i < response.data.locationArray.length; i++) {
        imageArray.push({
          _id: FavourId,
          imageUrl: response.data.locationArray[i]
        });
      }
    }

    imageArray.push({ type: "Repay" });

    const storeImageData = await ImageAPI.storeImageData(imageArray);
    if (storeImageData) {
      toast.success("Successfully uploaded image...");
      
      await delay(3000);
      handleClose();
      TriggerResetFavourList();
    } else {

      await delay(3000);
      handleClose();
      TriggerResetFavourList();
    }              
}


export { SingleImageUpload }; 