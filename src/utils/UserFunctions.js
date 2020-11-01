import React from "react";
import * as PublicRequestAPI from "../api/PublicRequestAPI";
import TextField from "@material-ui/core/TextField";

/**************************************************************************************************************
* Summary: This method is used by the favourModal (shared by Favours and Public Requests) to fetch and 
* update the email values for the userIds directly stored with the records in the database. These userIds are 
* pushed into a userArray, that is passed to the getPublicRequestUserDetails api, to retrieve the 
* corressponding email values in an Array. This array is finally stored in a state variable, where it is
* available for use by other methods.
*
* @param userDataAvailable Function -> Method that returns Boolean value to check whether the userData is still
* valid
* @param setPublicRequestUserDetails Function -> Method that updates the publicRequestUserDetails state 
* variable on the PublicRequest page
* @param requester Array -> Array with the user details about the requester.
* @param userData Array -> Array with the user details about the currently logged in user
* @param Requester String -> object id/ userId for the Requester of the Public Request/ Favour
* @param OwingUser String -> object id/ userId for the OwingUser of the Favour
* @param rewards Array -> Array of the rewards attached to a Public Request
***************************************************************************************************************/
const GetUserDetails = async (
  userDataAvailable,
  setPublicRequestUserDetails,
  requester,
  userData,
  Requester,
  OwingUser,
  rewards
) => {
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
  const getPublicRequestsUserDetails = await PublicRequestAPI.getPublicRequestUserDetails(
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


/**************************************************************************************************************
* Summary: Depending on what is passed through as parameters, the value returned will be an email value wrapped
* in a JSX element or just the email value itself.
*
* @param publicRequestUserDetails Array -> emails of all users relating to a particular Public Request
* @param userId String -> the objectId of the currently logged in user
* @param nameId String -> the value to be used as the id and name properties of the returned JSX element
* @param label String -> the value to be used as the label property of the returned JSX element
* @param disabled Boolean -> the value used to determine if the returned JSX element is disabled or not
* @param value Boolean -> the value used to determine whether to return JSX element or just String value
* @returns -> The userId matching the userEmail provided
***************************************************************************************************************/
const GetUserEmail = (
  publicRequestUserDetails,
  userId,
  nameId,
  label,
  disabled,
  value
) => {
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

/**************************************************************************************************************
* Summary: Returns the user id from the userList, that matches the email value also provided as a parameter
*
* @param email -> email address of a user
* @param userList -> array containing user details [userId, userEmail]
* @returns -> The userId matching the userEmail provided
***************************************************************************************************************/
const GetUserIdFromEmail = async (email, userList) => {
  for (let i = 0; i < userList.length; i++) {
    if (email === userList[i].email) {
      return userList[i]._id;
    }
  }
};

export { GetUserDetails, GetUserEmail, GetUserIdFromEmail };
