import callAPI from "./utils/callAPI";
import axios from "axios";
import UserContext from "../context/UserContext";
import { toast } from "react-toastify";

export function login(data) {
  console.log("logindata:", data);
  return new Promise((resolve, reject) => {
    console.log("login");
    axios
      .post("http://localhost:4000/api/user/login", data)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
          window.location.href = "/public_request";
        } else {
          reject(response.data);
        }
      })
      .catch(reject => {
        toast.error(reject.response.data);
      });
  });
}
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

export const test = () => callAPI("get", "http://localhost:4000/api/get/count");
export const debitIOUList = () =>
  callAPI("get", "http://localhost:4000/api/get/debit_list");
export const deleteOneFavour = data =>
  callAPI("post", "http://localhost:4000/api/favour/delete", data);
// export const login = data => {
//   callAPI("post", "http://localhost:4000/api/user/login", data);
// };
// export const register = data =>
//   callAPI("post", "http://localhost:4000/api/user/register", data);
export const uploadImage = data =>
  callAPI("post", "http://localhost:4000/api/file/image-upload", data);
export const updateImageKey = data =>
  callAPI("post", "http://localhost:4000/api/file/image-update-key", data);
export const getImageFromS3 = data =>
  callAPI("post", "http://localhost:4000/api/get/get-s3-image", data);
export const deleteImageFromS3 = data =>
  callAPI("get", "http://localhost:4000/api/file/delete-s3-image", data);
export const getUserDetails = () =>
  callAPI("get", "http://localhost:4000/api/profile");

export const getFavourTypes = () =>
  callAPI("get", "http://localhost:4000/api/get/get-favourType");

export const createPublicRequest = data =>
  callAPI("post", "http://localhost:4000/api/publicRequest/create", data);

// export const getPublicRequests = () =>
//   callAPI("get", "http://localhost:4000/api/publicRequest/get");

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
export const getPublicRequestUserDetails = data =>
  callAPI(
    "post",
    "http://localhost:4000/api/publicRequest/get-user-emails",
    data
  );

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
