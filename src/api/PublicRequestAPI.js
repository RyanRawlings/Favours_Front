import axios from "axios";
import { toast } from "react-toastify";
import callAPI from "./utils/callAPI";

export const getPublicRequestUserDetails = data =>
  callAPI("post", "/api/user/get/user-emails", data);

export function getPublicRequests() {
  // Check cookies' data
  return new Promise((resolve, reject) => {
    document.cookie.split(";").map(item => {
      if (item.match("auth-token")) {
        console.log(item.replace(" auth-token=", ""));
      }
      return 0;
    });
    axios
      .get("/api/publicRequest/get")
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
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

export const createPublicRequest = data =>
  callAPI("post", "/api/publicRequest/create", data);

/*************************************************************************************************
 * Add reward into exsiting reward array
 *
 * @param {array} req contains favourid, newReward(array) and privided by newUserDetails(object)
 * @param {array} res response
 * @return {array} response -> contains the msg from backend "success" or "error"
 *
 *************************************************************************************************/
export function addReward(favourId, newReward, newUserDetails) {
  const query = {
    _id: favourId,
    newReward: newReward,
    newUserDetails: newUserDetails
  };
  return new Promise((resolve, reject) => {
    axios
      .post("/api/publicRequest/add-reward", query)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      })
      .catch(reject => {
        // console.log(reject.response);
        toast.error(reject.response.data);
      });
  });
}

/*************************************************************************************************
 * Transfer the public request into favours
 *
 * @param {array} req contains newFavour(object)
 * @param {array} res response
 * @return {array} response -> contains the msg from backend "success" or "error"
 *
 *************************************************************************************************/
export function claimPublicRequest(data) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/publicRequest/claim", data)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
          
        } else {
          reject(response.data);
        }
      })
      .catch(reject => {
        console.log(reject.response);
        toast.error(reject.response.data);
      });
  });
}

/*************************************************************************************************
 * Pass the requestid to backend and set its completed as true
 *
 * @param {array} req contains request id (objectid)
 * @param {array} res response
 * @return {array} response -> contains the msg from backend "success" or "error"
 *
 *************************************************************************************************/
export function deletePublicRequest(id) {
  const query = {
    _id: id
  };
  return new Promise((resolve, reject) => {
    axios
      .post("/api/publicRequest/delete", query)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      })
      .catch(reject => {
        console.log(reject.response);
        toast.error(reject.response.data);
      });
  });
}
