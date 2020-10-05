import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import NavMenu from '../../components/NavMenu/index';
import { useLocation } from 'react-router-dom';
import * as APIServices from '../../api/TestAPI';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { uploadFile } from "react-s3";
import S3FileUpload from "react-s3";

require('dotenv/config');
const axios = require("axios");
const FormData = require('form-data');

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    display: 'inline-block',
    marginTop: "-60%",
    textTransform: 'capitalize'    
  },
}));

export default function UploadImage({ FavourId, FavourImageKey }) {
    const { current } = React.useRef(FavourImageKey);
    const classes = useStyles();
    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);
    const [fileToUpload, setFileToUpload] = useState(null);
    const location = useLocation();

    const handleCloudUpload = async e => {
      e.preventDefault();
      let form = new FormData();
      form.append('image', fileToUpload);
      const response = await axios.post("/api/file/image-upload", form);
      console.log(response);
      const { data } = response;         
      // Create separate function to update the key on the Favour in the database
      if (data.imageUrl) {
        const response = await APIServices.updateImageKey(({ FavourId: FavourId, FavourImageKey: data.imageUrl}));
        console.log(response);
      }
    }

    const handleImageUpload = async e => {
        const [file] = e.target.files;
        if (file) {
          const reader = new FileReader();
          const { current } = uploadedImage;
          current.file = file;
          reader.onload = e => {
            current.src = e.target.result;
          };
          const blob = reader.readAsDataURL(file);
          // const response = await APIServices.uploadImage({image: blob});
          setFileToUpload(file);
        }
      };

    return (<div>
        <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          justifyContent: "left"
        }}
      >
        <form onSubmit={handleCloudUpload}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={imageUploader}
          style={{
            display: "none"
          }}
        />
        <div                                
          style={{
            height: "100px",
            width: "100px",                        
            display: "inline-block"
          }}
          onClick={() => imageUploader.current.click()}
        >          
        <img
            ref={uploadedImage}
            style={{
              width: "100px",
              height: "100px",
              position: "absolute"
            }}
          />
        <img            
            src={current}
            style={{
              width: "100px",
              height: "100px",
              position: "absolute"
            }}
          />
        </div>
        <div className={classes.button}>
        <Button
        type="submit"
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
      >
        Upload
      </Button>
      </div>
      </form>
      </div>
      </div>)
}