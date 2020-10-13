import React, { useState, useRef, forwardRef, useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import UserContext from "../../context/UserContext";
import * as APIServices from "../../api/TestAPI";
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
//   rewardQuantity: {
//     marginRight: "10%"
//   },
//   addButton: {
//     marginLeft: "5%"
//   },
//   offeredBy: {
//     marginLeft: "14%"
//   },
  listHeading: {
      border: "1px grey"
  }

}));

export default function RewardForm({ addReward }) {
    const classes = useStyles();
    const [value, setValue] = useState("");
    const { userData, setUserData } = useContext(UserContext);

    const [favourRewards, setFavourRewards] = useState([]);

    useEffect(() => {
      async function getFavourType() {
        const getFavourTypes = await APIServices.getFavourTypes();
        // Return array and set the Favours state
        const { favourTypes } = getFavourTypes;
        const favourTypesArray = Object.values(favourTypes);
        setFavourRewards(favourTypesArray);
      }

      getFavourType();
    }, []);

    // console.log(favourRewards);    
    const [rewardName, setRewardName] = useState("");
    const [rewardQuantity, setRewardQuantity] = useState(1);
    // Show the user email on screen
    const [offeredBy, setOfferedBy] = useState(userData.user.email);
    const [rewardId, setRewardId] = useState(null);

    const handleSubmit = e => {
      e.preventDefault();
      
      // Pass the user id instead
      addReward({rewardId: rewardId, rewardName: rewardName, rewardQuantity: rewardQuantity, offeredBy: offeredBy});
      setRewardName(null);
      setValue("");
    };

    const enableAddButton = () => {
        return rewardName !== null && rewardQuantity !== null && offeredBy !== null? false: true;
    }

    const setRewardIdHelper = (object, value) => {
      console.log("Helper is being called...");
      console.log("Object array", object);
      console.log("Value", value);
      const rewardsObject = Object.values(object);
      for (let i = 0; i < rewardsObject.length; i++) {
        // console.log(rewardsObject[i].Name);
        if (rewardsObject[i].Name === value) {
          // console.log(rewardsObject[i]._id.toString());
          setRewardId(rewardsObject[i]._id.toString());
        }
      }
      // console.log(rewardIdKey);
      // console.log(rewardId);
    }

    return (
      <form onSubmit={handleSubmit}>
         <Grid className={classes.listHeading} container spacing={1}>
            <Grid item xs={'auto'} xl={'auto'} sm={4}>
              {/* <TextField
                id="outlined-rewardName"
                label="Reward Name"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={e => {setRewardName(e.target.value)}}
              /> */}
              <Autocomplete
                id="combo-box-demo"
                options={favourRewards}
                getOptionLabel={(option) => option.Name}
                style={{ width: "auto" }}
                onInputChange={(event, newInputValue) => {
                  setRewardName(newInputValue);
                  setRewardIdHelper(favourRewards,newInputValue);
                }}
                renderInput={(params) => <TextField {...params} label="Reward Name" variant="outlined" />
              }
              />
            </Grid>
            <Grid item xs={'auto'} xl={'auto'} sm={2}>
              <TextField className={classes.rewardQuantity}
                id="outlined-rewardQuantity"
                label="Reward Quantity"
                variant="outlined"
                defaultValue={1}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={e => {setRewardQuantity(e.target.value)}}
              />
            </Grid>
            <Grid item xs={'auto'} xl={'auto'} sm={4}>
              <TextField className={classes.offeredBy}
                  id="outlined-offeredBy"
                  label="Offered By"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={true}
                  defaultValue={userData.user.email}
                  // placeholder={userData.email}
                />
            </Grid>
            <Grid className={classes.addButton} item xs={12} sm={1}>
              <Button
                variant="contained"
                type="submit"
                disabled={false}
                >Add
              </Button>
            </Grid>
          </Grid>
        </form>
    );
  }