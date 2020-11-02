import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import * as FavourAPI from "../../api/FavourAPI";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CounterButtonGroup from "../counterButtonGroup/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/***************************************************************************************************
* Summary: This component handles the process of adding new reward items to Public requests both
* New and Existing records.
* 
* Code Attribution: 
* https://www.digitalocean.com/community/tutorials/how-to-build-a-react-to-do-app-with-react-hooks
*
* Author: Kapehe Jorgenson
*
* Comment: Aspects of the todo list application within the tutorial linked above, was used
* to create the add new reward items feature.
****************************************************************************************************/

const useStyles = makeStyles(theme => ({
  listHeading: {
    border: "1px grey"
  }
}));

const NewRewardForm = ({ addReward, userData }) => {
  const classes = useStyles();
  const [,setValue] = useState("");
  const [favourRewards, setFavourRewards] = useState([]);


/***************************************************************************************************
* Summary: Get Favour types called once has the component is first mounted
****************************************************************************************************/  
  useEffect(() => {
    async function getFavourType() {
      try {
        const getFavourTypes = await FavourAPI.getFavourTypes();
        // Return array and set the Favours state
        const { favourTypes } = getFavourTypes;
        const favourTypesArray = Object.values(favourTypes);
        setFavourRewards(favourTypesArray);
      } catch (err) {
        toast.error("There was an error retrieving the Favour Reward types");
        console.error("There was an error retrieving the Favour Reward types " + err);
      }      
    }
    getFavourType();
  }, []);

  const [rewardName, setRewardName] = useState(null);
  const [rewardQuantity, setRewardQuantity] = useState(1);
  // Show the user email on screen
  const [providedBy] = useState(
    userData !== undefined ? userData.user.email : null
  );
  const [rewardId, setRewardId] = useState(null);

/***************************************************************************************************
* Summary: Handles when the user clicks the Add button, adds a new reward item to the list by
* calling the function that was passed in by props to the component.
****************************************************************************************************/    
  const handleSubmit = e => {
    e.preventDefault();

    // Pass the user id instead
    addReward({
      rewardId: rewardId,
      rewardName: rewardName,
      rewardQuantity: rewardQuantity,
      offeredBy: userData.user.email,
      providedBy: userData.user._id
    });

    toast.success(
      "Reward successfully added. Only you can remove the reward from the request"
    );

    setValue("");
    setRewardName(null);
  };

/***************************************************************************************************
* Summary: Iterates through the list of Favour Types to return the object id matching the Favour
* Name (value) passed as a parameter
****************************************************************************************************/      
  const setRewardIdHelper = (object, value) => {
    const rewardsObject = Object.values(object);
    for (let i = 0; i < rewardsObject.length; i++) {
      if (rewardsObject[i].Name === value) {
        setRewardId(rewardsObject[i]._id.toString());
      }
    }
  };

  const handleRewardIncrement = () => {
    setRewardQuantity(rewardQuantity + 1);
    return returnRewardQuantity();
  };

  const returnRewardQuantity = () => {
    return rewardQuantity;
  };

  const handleRewardDecrement = () => {
    if (rewardQuantity === 1) {
    } else {
      setRewardQuantity(rewardQuantity - 1);
      return returnRewardQuantity();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid className={classes.listHeading} container spacing={1}>
        <Grid item xs={"auto"} xl={"auto"} sm={4}>
          <Autocomplete
            id="combo-box-demo"
            options={favourRewards}
            getOptionLabel={option => option.Name}
            style={{ width: "auto" }}
            clearOnEscape={rewardName ? false : true}
            onInputChange={(event, newInputValue) => {
              setRewardName(newInputValue);
              setRewardIdHelper(favourRewards, newInputValue);
            }}
            renderInput={params => (
              <TextField {...params} label="Reward Name" />
            )}
          />
        </Grid>
        <Grid item xs={"auto"} xl={"auto"} sm={2}>
          <CounterButtonGroup
            handleRewardIncrement={handleRewardIncrement}
            handleRewardDecrement={handleRewardDecrement}
          />
        </Grid>
        <Grid item xs={"auto"} xl={"auto"} sm={4}>
          <TextField
            className={classes.offeredBy}
            id="outlined-offeredBy"
            label="Offered By"
            InputLabelProps={{
              shrink: true
            }}
            disabled={true}
            defaultValue={providedBy}
          />
        </Grid>
        <Grid className={classes.addButton} item xs={12} sm={1}>
          <Button
            variant="contained"
            type="submit"
            disabled={rewardName ? false : true}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewRewardForm;
