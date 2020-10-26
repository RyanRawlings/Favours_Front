import React from "react";
import * as APIServices from "../api/TestAPI";
import TextField from "@material-ui/core/TextField";


const GetUserDetails = async (userDataAvailable, setPublicRequestUserDetails, requester, userData, Requester, OwingUser, rewards) => {
    // Create a new array for the Users
    let userArray = [];
    if (Location === "/public_request") {
      // Push the userIds stored on the rewards into the userArray
      for (let i = 0; i < rewards.length; i++) {
        if (!userArray.includes(rewards[i].providedBy)) {
          // console.log("iterative print", rewards[i].providedBy)
          userArray.push(rewards[i].providedBy);
        }
      }

      // Push the requesterUserId into the userArray
      if (!userArray.includes(requester._id)) userArray.push(requester._id);
      // Push the current into the userArray, in case they want to add a reward to the public request
      if (userDataAvailable === true) {
        if (!userArray.includes(userData.user._id))
          userArray.push(userData.user._id);
      }
    } else if (Location === "/manage_favours") {
      userArray.push(Requester);
      userArray.push(OwingUser);
    }

    // Get user details for the relevant userIds stored in the array
    const getPublicRequestsUserDetails = await APIServices.getPublicRequestUserDetails(
      userArray
    );

    if (getPublicRequestsUserDetails) {
      // Return array and set the request user details state
      setPublicRequestUserDetails(getPublicRequestsUserDetails);
      console.log(
        "getPublicRequestsUserDetails is:",
        getPublicRequestsUserDetails
      );
    } else {
      console.log("There was an issue with getting the data");
    }
  };

  const GetUserEmail = (publicRequestUserDetails, userId, nameId, label, disabled, value) => {
    // console.log(userId)
    console.log("get user email: ", userId, nameId, label, disabled, value);
    // console.log(publicRequestUserDetails);
    // Evaluate reward user id against data retrieved from db, and return relevant email
    if (publicRequestUserDetails) {
      for (let i = 0; i < publicRequestUserDetails.length; i++) {
        if (userId === publicRequestUserDetails[i]._id && value !== true) {
          // Return relevant user email
          if (Location === "/public_request" && value !== true) {
            return (
              <TextField
                id={nameId}
                name={nameId}
                label={label}
                InputLabelProps={{
                  shrink: true
                }}
                disabled={disabled}
                value={publicRequestUserDetails[i].requestUser.email}
              />
            );
          } else if (value === true) {
            return publicRequestUserDetails[i].email;
          } else {
            return (
              <TextField
                id={nameId}
                name={nameId}
                label={label}
                InputLabelProps={{
                  shrink: true
                }}
                disabled={disabled}
                value={publicRequestUserDetails[i].email}
              />
            );
          }
        }
      }
    } else {
      console.log("PublicRequests Object is undefined or null...");
    }
  };  

export { GetUserDetails, GetUserEmail };

