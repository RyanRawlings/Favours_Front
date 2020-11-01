import * as ImageAPI from "../../api/ImageAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { delay } from "q";
import * as FavourAPI from "../../api/FavourAPI";
import * as UserAPI from "../../api/UserAPI";
import { GetUserIdFromEmail } from "../../utils/UserFunctions";

/**************************************************************************************************************
* Summary: This is component handles the single image upload process, uploading the image to s3 and
* subsequently updating the relevant Favour/Public Request record in MongoDb with the public url. It it is 
* used to Create and Repay Favours.
*
* @param FavourId String -> Id of the Favour the image is being uploaded for
* @param TriggerResetFavourList Function -> state update method, that changes a state variable tied to the 
* useEffect hook that retrieves the Favours List
* @param fileList Array -> Array of File objects to uploaded to s3
* @param handleClose Function -> Function that updates the state variable that controls the open and close of 
* the favourModal
* @param type String -> Refers to the action being performed by the user
* @param favourValidation Function -> Function that returns an Array, with Boolean whether the user passed 
* valid data to the Favour
* @param userData Array -> Array of user details relating to the currently logged in user
* @param debtor String -> The user id for the Favour debtor, the person who will be owed the Favour
* @param creditor String -> The user id for the Favour creditor, the person who will owe/repay the Favour
* @param favourName String -> The Favour type selected
* @param favourDescription String -> The description added to the Favour
* @param userList Array -> The list of userId relating to the Favour/Public Request record
***************************************************************************************************************/

const SingleImageUpload = (
  FavourId,
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
  userList
) => {
  if (type === "Repay") {
    imageUploadRepayFavour(
      FavourId,
      TriggerResetFavourList,
      fileList,
      handleClose,
      userData
    );
  } else if (type === "Record") {
    imageUploadCreateFavour(
      TriggerResetFavourList,
      fileList,
      handleClose,
      favourValidation,
      userData,
      debtor,
      creditor,
      favourName,
      favourDescription,
      userList
    );
  }
};


/**************************************************************************************************************
* Image upload function for creating Favours
***************************************************************************************************************/
async function imageUploadCreateFavour(
  TriggerResetFavourList,
  fileList,
  handleClose,
  favourValidation,
  userData,
  debtor,
  creditor,
  favourName,
  favourDescription,
  userList
) {
  /**************************************************************************************************************
  * Array returned, result of validation at index 0, accompanying message at index 1
  ***************************************************************************************************************/
  let favourValidationResult = favourValidation();

  if (favourValidationResult[0] === false) {
    toast.error(favourValidationResult[1]);
    return console.log(favourValidationResult[1]);
  }

  /***************************************************************************************************************
  * Validation relating to the file uploaded. If no image is required the createFavourMongo is immediately called.
  * (When the user is creating a Favour they owe to someone else, an image won't be required)
  ***************************************************************************************************************/ 
  if (debtor === userData.user.email) {
    if (fileList.length > 1) {
      toast.error("You have tried to upload more than one image...");
      return console.log("More than one file added...");
    } else if (fileList.length === 0) {
      toast.error("You haven't uploaded an image.");
      return console.log("No file added...");
    }
  } else if (debtor !== userData.user.email) {
    createFavourMongo(
      null,
      favourValidationResult,
      "creditor",
      TriggerResetFavourList,
      handleClose,
      userData,
      debtor,
      creditor,
      favourName,
      favourDescription,
      userList
    );
    return console.log("No file upload required.");
  }

  /**************************************************************************************************************
  * Call made to the uploadImageToS3 async method within the ImageAPI. It too will return an Array with a Boolean
  * value representing the result of the upload at index 0 and the data response from the server at index 1
  ***************************************************************************************************************/ 
  try {
    const response = await ImageAPI.uploadImageToS3(fileList, "single");
    if (response[0] === "200") {
      createFavourMongo(
        response,
        favourValidationResult,
        "debtor",
        TriggerResetFavourList,
        handleClose,
        userData,
        debtor,
        creditor,
        favourName,
        favourDescription,
        userList
      );
    }
  } catch (err) {
    toast.error("There was an error uploading the image");
    console.error("There was an error in the s3 upload " + err);
  }
  
}

/**************************************************************************************************************
* Method creates a new Favour in MongoDB
***************************************************************************************************************/ 
async function createFavourMongo(
  response,
  favourValidationResult,
  type,
  TriggerResetFavourList,
  handleClose,
  userData,
  debtor,
  creditor,
  favourName,
  favourDescription,
  userList
) {
  let newFavour = {};

  if (favourValidationResult[0] === true) {
    let requestUser;
    let owingUser;

    /**************************************************************************************************************
    * New Favour data object is created to be passed to the createFavour API.
    ***************************************************************************************************************/ 
    try {
      requestUser = await GetUserIdFromEmail(creditor, userList);
      owingUser = await GetUserIdFromEmail(debtor, userList);

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

      /**************************************************************************************************************
      * If a valid response is returned from the server a new user activity / action object is created to be passed
      * to the createUserActivity api.
      ***************************************************************************************************************/ 
      if (createNewFavour) {
        let userId = userData.user._id;
        let action =
          "Created new favour " + createNewFavour.favourOwed.toString();
        let newActivityData = {
          userId: userId,
          action: action
        };
  
        const newUserActivity = await UserAPI.createUserActivity(newActivityData);
  
        if (newUserActivity) {
          console.log("new user action log: 200");
        }
        
        /**************************************************************************************************************
        * Handles whether to show success or error toast message to the user.
        ***************************************************************************************************************/ 
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
    } catch (err) {
      console.error("There was an error creating the Favour and UserActivity")
    }
  } else {
    toast.error(favourValidationResult[1]);
  }

  /**************************************************************************************************************
  * If an image was uploaded to s3, with the creation of the Favour, this block will update the public url
  * returned by the server to MongoDB.
  ***************************************************************************************************************/ 
  try {
    if (type === "debtor") {
      let imageArray = [];
      if (response) {
        for (let i = 0; i < response.data.locationArray.length; i++) {
          imageArray.push({
            _id: newFavour._id,
            imageUrl: response.data.locationArray[i]
          });
        }
      }

      imageArray.push({ type: "Record" });

      const storeImageData = await ImageAPI.storeImageData(imageArray);
      
      /**************************************************************************************************************
      * If the server returns a valid response, display success message to the user and update the state variables
      * to refire the Favours list retrievla and closing of the Modal.
      ***************************************************************************************************************/ 
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
  } catch (err) {
    toast.error("An image processing issue occurred");
    console.error("There was an error updating the record in MongoDB " + err);
  }
}

/**************************************************************************************************************
* Method repays a Favour
***************************************************************************************************************/ 
async function imageUploadRepayFavour(
  FavourId,
  TriggerResetFavourList,
  fileList,
  handleClose,
  userData
) {

  /**************************************************************************************************************
  * Validation, only one File provided by the user for upload
  ***************************************************************************************************************/ 
  if (fileList.length > 1) {
    toast.error("You have tried to upload more than one image...");
    return console.log("More than one file added...");
  } else if (fileList.length === 0) {
    toast.error("You haven't uploaded an image.");
    return console.log("No file added...");
  }

  /**************************************************************************************************************
  * Calls the uploadImageS3 async function from the ImageAPI file. Returns an array(2), with the result of the
  * upload at index 0 and the accompanying message at index 1
  ***************************************************************************************************************/ 
  try {
    const response = await ImageAPI.uploadImageToS3(fileList, "single");

    if (response[0] === "200") {
      updateRepayedFavourMongo(
        response,
        FavourId,
        handleClose,
        TriggerResetFavourList,
        userData
      );
    }

  } catch (err) {
    console.error("There was an error uploading the images to s3");
    toast.error("An error occurred in image processing");
  }
}

/**************************************************************************************************************
* Method takes the response from the uploadToS3 API, and updates the relevant Favour record in Mongo db
***************************************************************************************************************/ 
const updateRepayedFavourMongo = async (
  response,
  FavourId,
  handleClose,
  TriggerResetFavourList,
  userData
) => {

  /**************************************************************************************************************
  * Creates an Array to be passed to the storeImageData API (only one element will be pushed into the Array).
  ***************************************************************************************************************/ 
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

  /**************************************************************************************************************
  * Call storeImageData API, if server returns valid response create new user activity / action object to pass
  * to the createUserActivity API. 
  ***************************************************************************************************************/   
  try {
    const response = await ImageAPI.storeImageData(imageArray);
    if (response) {      

      let userId = userData.user._id;
        let action =
          "Repayed a Favour";
        let newActivityData = {
          userId: userId,
          action: action
        };
  
        /**************************************************************************************************************
        * Call createUserActivity API, if server returns valid response, show success message to the user and use
        * the state functions passed as props to update Favours List on the Manage Favours page and to close the Modal         
        ***************************************************************************************************************/   
        const newCreateUserActivity = await UserAPI.createUserActivity(newActivityData);
        
        if (newCreateUserActivity) {
          toast.success("Successfully uploaded image...");

          await delay(3000);
          handleClose();
          TriggerResetFavourList();
        }      
    } else {
      await delay(3000);
      handleClose();
      TriggerResetFavourList();
    }
  } catch (err) {
    console.error("There was an error updating the records in MongoDB");
  }  
};

export { SingleImageUpload };
