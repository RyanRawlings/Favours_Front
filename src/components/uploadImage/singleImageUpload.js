import React from 'react';
import * as ImageAPI from "../../api/ImageAPI";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { delay } from "q";

const SingleImageUpload = ({ FavourId, TriggerResetFavourList, fileList, handleClose }) => {

    const executeImageUpload = async () => {
        async function singleImageUpload () {
            if (fileList.length > 1) {
                toast.error("You have tried to upload more than one image...");
                return console.log("More than one file added...");
          
              } else if (fileList.length === 0) {
                toast.error("You haven't uploaded an image.");
                return console.log("No file added...");
              }
          
              let imageForm = new FormData();
          
              for (let i = 0; i < fileList.length; i++) {
                imageForm.append("image", fileList[i][0]);
              }
        
              const uploadToS3 = await axios
                .post("http://localhost:4000/api/image/upload", imageForm)
                .then(function(response) {
                  uploadToMongoDB(response);
                })
                .catch(function(error) {
                  toast.error(error);
                });
            };
          
            const uploadToMongoDB = async response => {
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
          
              const storeImageData = await ImageAPI.storeImageData(imageArray);
              if (storeImageData) {
                toast.success("Successfully uploaded image...");
                
                await delay(3000);
                handleClose();
                TriggerResetFavourList();
              } else {
                await delay(3000);
                handleClose();
                TriggerResetFavourList();
              }              
        }
        
        singleImageUpload();
    }
    
}

export default SingleImageUpload; 