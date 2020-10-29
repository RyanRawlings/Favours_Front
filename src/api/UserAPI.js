import callAPI from "./utils/callAPI";
import axios from "axios";
import { toast } from "react-toastify";

/*************************************************************************************************
 * Returns jwt token and user details to be updated in UserContext and stored in Cookies client side
 *
 * @param {array} req contains email and password string of user trying to log in
 * @param {array} res response
 * @return {array} response -> contains array containing user details and jwt token.
 *
 *************************************************************************************************/

export function login(data) {
  // console.log("logindata:", data);
  return new Promise((resolve, reject) => {
    // console.log("login");
    axios
      .post("http://localhost:4000/api/user/login", data)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
          if (response.data.token !== undefined) {
            window.location.href = "/public_request";
          } else {
            toast.error(response.data.message);
          }
        } else {
          // console.log(response)
          reject(response.data);
        }
      })
      .catch(reject => {
        // console.log(reject.response)
        toast.error(reject.response.data);
      });
  });
}

/*************************************************************************************************
 * Returns jwt token and user details to be updated in UserContext and stored in Cookies client side
 *
 * @param {array} req contains email and password string of user trying to log in
 * @param {array} res response
 * @return {array} response -> contains array containing user details and jwt token.
 *
 *************************************************************************************************/

export function register(data) {
  console.log("registerdata:", data);
  return new Promise((resolve, reject) => {
    console.log("login");
    axios
      .post("http://localhost:4000/api/user/register", data)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
          window.location.href = "/login";
        } else {
          reject(response.data);
        }
      })
      .catch(reject => {
        //console.log(reject.response);
        toast.error(reject.response.data);
      });
  });
}

export const getUserDetails = () =>
  callAPI("get", "http://localhost:4000/api/user/profile");
export const getUsers = () =>
  callAPI("get", "http://localhost:4000/api/user/get");
export const getUserGroups = data =>
  callAPI("post", "http://localhost:4000/api/user/groups", data);
export const getGroupUserEmails = data =>
  callAPI("post", "http://localhost:4000/api/user/group-users", data);

export const getUser = data =>
  callAPI("post", "http://localhost:4000/api/user/get-one", data);

export const getLeaderboard = () =>
  callAPI("get", "http://localhost:4000/api/user/get-leaderboard");

export const createUserActivity = data =>
  callAPI("post", "http://localhost:4000/api/user/create/activity", data);
export const getUserActivity = data =>
  callAPI("post", "http://localhost:4000/api/user/get/activity", data);
export const partyDetection = data =>
  callAPI("post", "http://localhost:4000/api/user/party-detection", data);
