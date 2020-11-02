import callAPI from "./utils/callAPI";
import axios from "axios";
import { toast } from "react-toastify";

export const storeImageData = data =>
  callAPI("post", "/api/image/update/mongo", data);

export const storeProfileImageData = data =>
  callAPI("post", "/api/user/upload-profile-image", data);

export async function uploadImageToS3(fileList, type) {
  let imageForm = new FormData();
  let result = [];

  if (type === "single") {
    imageForm.append("image", fileList[0][0]);
  } else if (type === "multiple") {
    for (let i = 0; i < fileList.length; i++) {
      imageForm.append("image", fileList[i][0]);
    }
  } else {
    toast.error("There was an error in image processing, please refresh the page");
    return console.error("Upload type not passed");
  }
  
  try {
    await axios
    .post("http://localhost:4000/api/image/upload", imageForm)
    .then(function(response) {
      result = ["200", response];
    })
    .catch(function(error) {
      toast.error(error);
      result = ["400", error];
    });
  } catch (err) {    
    result = ["400", err];
  }    
  return result;
}