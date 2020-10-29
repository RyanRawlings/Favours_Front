import axios from "axios";
import { toast } from "react-toastify";
import callAPI from "./utils/callAPI";

export const getPublicRequestUserDetails = data =>
  callAPI(
    "post",
    "http://localhost:4000/api/publicRequest/get-user-emails",
    data
  );

export function getPublicRequests() {
  return new Promise((resolve, reject) => {
    document.cookie.split(";").map(item => {
      console.log("cookies:", item);
      if (item.match("auth-token")) {
        console.log(item.replace(" auth-token=", ""));
      }
    });
    axios
      .get("http://localhost:4000/api/publicRequest/get")
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
  callAPI("post", "http://localhost:4000/api/publicRequest/create", data);

export function addReward(favourId, newReward, newUserDetails) {
  const query = {
    _id: favourId,
    newReward: newReward,
    newUserDetails: newUserDetails
  };
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:4000/api/publicRequest/add-reward", query)
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

export function claimPublicRequest(data) {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:4000/api/publicRequest/claim", data)
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

export function deletePublicRequest(id) {
  const query = {
    _id: id
  };
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:4000/api/publicRequest/delete", query)
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
