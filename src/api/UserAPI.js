import callAPI from "./utils/callAPI";
import axios from "axios";
import { toast } from "react-toastify";
import { delay } from "q";

/*************************************************************************************************
 * Returns jwt token and user details to be updated in UserContext and stored in Cookies client side
 *
 * @param {array} req contains email and password string of user trying to log in
 * @param {array} res response
 * @return {array} response -> contains array containing user details and jwt token.
 *
 *************************************************************************************************/

export async function login(data) {
  try {
    const response = await axios.post("/api/user/login", data);    
    if (response.status >= 200 && response.status < 300) {   
      if (!response.data.message) {
        toast.success("Successfully logged into account, taking you to the Public Request screen");
        
        await delay(3000);
        window.location.href = "/public_request";
        return response.data;
      } else {
        toast.error(response.data.message);
      }

    } else {
      toast.error(response.data);
      return response.data;
    }
  } catch {
    toast.error("There was an error logging into your account");
  }
}

// export async function login(data) {
//   // console.log("logindata:", data);
//   return new Promise((resolve, reject) => {
//     // console.log("login");
//     axios
//       .post("/api/user/login", data)
//       .then(response => {
//         if (response.status >= 200 && response.status < 300) {
//           resolve(response.data);
//           if (response.data.token !== undefined) {
//             window.location.href = "/public_request";
//           } else {
//             toast.error(response.data.message);
//           }
//         } else {
//           // console.log(response)
//           reject(response.data);
//         }
//       })
//       .catch(reject => {
//         // console.log(reject.response)
//         toast.error(reject.response.data);
//       });
//   });
// }

/*************************************************************************************************
 * Returns jwt token and user details to be updated in UserContext and stored in Cookies client side
 *
 * @param {array} req contains email and password string of user trying to log in
 * @param {array} res response
 * @return {array} response -> contains array containing user details and jwt token.
 *
 *************************************************************************************************/

export async function register(data) {
  try {
    const response = await axios.post("/api/user/register", data);    
    if (response.status >= 200 && response.status < 300) {  
      if (!response.data.message) {
        toast.success("Successfully created account, taking you to the login screen");

        await delay(3000);
        window.location.href = "/login";
        return response.data;
      } else {
        toast.error(response.data.message);
      }
    } else {
      toast.error(response.data.message);
      return response.data;
    }
  } catch {
    toast.error("There was an error creating your account");
  }
}

// export async function register(data) {
//   return new Promise((resolve, reject) => {
//     axios
//       .post("/api/user/register", data)
//       .then(response => {
//         if (response.status >= 200 && response.status < 300) {
//           resolve(response.data);
          
//           window.location.href = "/login";
//           toast.success("Account successfully created, you've been taken to the login page");
//         } else {
//           reject(response.data);
//         }
//       })
//       .catch(reject => {
//         toast.error(reject.response.data);
//       });
//   });
// }

export const getUserDetails = () => callAPI("get", "/api/user/profile");

export const getUsers = () => callAPI("get", "/api/user/get");

export const getUserGroups = data => callAPI("post", "/api/user/groups", data);

export const getGroupUserEmails = data =>
  callAPI("post", "/api/user/group-users", data);

export const getUser = data => callAPI("post", "/api/user/get-one", data);

export const getLeaderboard = () => callAPI("get", "/api/user/get-leaderboard");

export const createUserActivity = data =>
  callAPI("post", "/api/user/create/activity", data);

export const getUserActivity = data =>
  callAPI("post", "/api/user/get/activity", data);

export const partyDetection = data =>
  callAPI("post", "/api/user/party-detection", data);
