import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  btnContainer: {
    // padding: "50px"
  },
  thumbsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: "-10%"
  },
  thumb: {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    width: 100,
    height: 100
  },
  thumbInner: {
    display: "flex",
    minWidth: 0,
    overflow: "hidden"
  },
  img: {
    display: "block",
    width: "auto",
    height: "100%"
  },
  infoText: {
    // marginLeft: "auto",
    // marginRight: "auto",
    padding: "10px 5px 10px 5px",
    margin: "0% 0 4% 0",
    border: "dotted 1px"
  },
  profileImageText: {
    fontSize: "10px",
    textTransform: "capitalize",
    marginTop: "2%",
    whiteSpace: "nowrap",
    dispay: "inline"
  }
}));

export default function Previews({ props, addFile }) {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const location = useLocation();
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );

      addFile(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  // console.log("Props", props)
  
  const thumbs = 
  files.map((file, index) => (
    location.pathname ==="/public_request"?      
      <div style={{ marginBottom: "1%", marginLeft: "10%"}} key={index}>
         Filename: {file.name}
      </div> : 
    location.pathname ==="/all_list"?      
      <div style={{ marginTop: "15%", width: "100%"}}key={index}>
          <span style={{color: "black"}}>Filename: {file.name}</span>
      </div> :     
      location.pathname ==="/profile"?      
      <div style={{ marginTop: "15%", width: "100%", fontSize: "10px"}}key={index}>
          <span style={{color: "black"}}>File uploaded click save</span>
      </div> : 
    <div className={classes.thumb} key={file.name}>
      <div className={classes.thumbInner}>  
        <img src={file.preview} className={classes.img} />
      </div>
     </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {files.length > 0 ? (
          <div className={classes.imgDiv}>
            <div className={classes.thumbsContainer}>{thumbs}</div>
          </div>
        ) : ( 
          (location.pathname === "/profile"?
          <div style={{marginLeft: "10%"}}>
          <Button 
              className={classes.profileImageText}
              color="primary"
              variant="contained">
            Click to add          
          </Button> 
          </div>:
            <Button className={classes.infoText}>
            Drag or click to browse proof file
          </Button>
          )
          
        )}
      </div>
    </section>
  );
}
