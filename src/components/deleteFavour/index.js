import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import * as APIServices from "../../api/TestAPI";
import Toast from "../toast/index";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles(theme => ({
  trashIcon: {
    color: "red"
  }
}));

export default function DeleteFavour({ FavourId }) {
  const classes = useStyles();
  const deleteFavour = async FavourId => {
    const response = await APIServices.deleteOneFavour({ _id: FavourId });
    if (response.ok === true) {
      toast.success("Favour successfully deleted");
    } else {
      toast.error("Error deleting Favour");
    }
  };

  return (
    <div className={classes.btnGroup}>
      <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
      />      
      <Button key={"deleteFavour"} onClick={() => deleteFavour(FavourId)}>
        <FontAwesomeIcon
          key={"deleteFavour"}
          className={classes.trashIcon}
          icon={faTrash}
        />
      </Button>
    </div>
  );
}
