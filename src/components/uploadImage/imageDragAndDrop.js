import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  thumbsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: "-35%"
  },
  thumb: {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    width: 100,
    height: 100,

  },
  thumbInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  },
  img: {
    display: 'block',
    width: 'auto',
    height: '100%'
  },
  infoText: {
    marginLeft: "auto",
    marginRight: "auto",
  }
}));

export default function Previews({props, addFile}) {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      
      addFile(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })))
    }
  });

  const thumbs = files.map(file => (
    <div className={classes.thumb} key={file.name}>
      <div className={classes.thumbInner}>
        <img
          src={file.preview}
          className={classes.img}
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        {files.length > 0? 
        <div className={classes.imgDiv}>
          <div className={classes.thumbsContainer}>
            {thumbs}
          </div>
        </div> : <div className={classes.infoText}>Browse for files</div>}
      </div>
      

    </section>
  );
}