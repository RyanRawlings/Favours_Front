import callAPI from "./utils/callAPI";
import axios from "axios";

export const storeImageData = data =>
  axios.post("http://localhost:4000/api/image/update/mongo", data);

export const storeProfileImageData = data => 
  axios.post("/api/user/upload-profile-image", data);