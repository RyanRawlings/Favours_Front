import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import * as APIServices from '../../api/TestAPI';
import Toast from '../toast/index'


const useStyles = makeStyles(theme => ({
    trashIcon: {
        color: "red",
      },
}));

export default function DeleteFavour({ FavourId }) {
    const classes = useStyles();
    const deleteFavour = async (FavourId) => {
        const response = await APIServices.deleteOneFavour({_id: FavourId});
        if (response.ok === true) {
            
        }

    }

  return (      
        <div className={classes.btnGroup}>
            <Button key={'deleteFavour'}
                onClick={() => deleteFavour(FavourId)}
            >            
                <FontAwesomeIcon 
                        key={'deleteFavour'} 
                        className={classes.trashIcon} 
                        icon={faTrash} 
                />
            </Button>
        </div>
     );
}
