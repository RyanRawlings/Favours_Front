import callAPI from "./utils/callAPI";
import axios from "axios";
import UserContext from "../context/UserContext";

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
          reject(response.response);
        }
      })
      .catch(reject);
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
          reject(response.response);
        }
      })
      .catch(reject);
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
export const uploadImage = (data) =>
  callAPI("post", "http://localhost:4000/api/file/image-upload", data);
export const updateImageKey = (data) =>
  callAPI("post", "http://localhost:4000/api/file/image-update-key", data);
export const getImageFromS3 = (data) =>
  callAPI("post", "http://localhost:4000/api/get/get-s3-image", data);
export const deleteImageFromS3 = data =>
  callAPI("get", "http://localhost:4000/api/file/delete-s3-image", data);
export const getUserDetails = () =>
  callAPI("get", "http://localhost:4000/api/profile");

export const getFavourTypes = () => 
  callAPI("get", "http://localhost:4000/api/get/get-favourType");

export const createPublicRequest = (data) => 
callAPI("post", "http://localhost:4000/api/publicRequest/create-publicRequest", data);

export const getPublicRequests = () => 
callAPI("get", "http://localhost:4000/api/publicRequest/get-publicRequest");  

export const getPublicRequestUserDetails = (data) => 
callAPI("post", "http://localhost:4000/api/publicRequest/get-user-emails", data);  
