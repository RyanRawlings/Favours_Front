import React, { useState, useRef, forwardRef } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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

    const [rewardName, setRewardName] = useState(null);
    const [rewardQuantity, setRewardQuantity] = useState(null);
    const [offeredBy, setOfferedBy] = useState(null); 
  
    const handleSubmit = e => {
      e.preventDefault();
      // console.log({rewardName: rewardName, rewardQuantity: rewardQuantity, offeredBy: offeredBy});
      // if (!value) return;
      addReward({rewardName: rewardName, rewardQuantity: rewardQuantity, offeredBy: offeredBy});
      setRewardName(null);
      setRewardQuantity(null);
      setOfferedBy(null);
      setValue("");
    };

    const enableAddButton = () => {
        return rewardName !== null && rewardQuantity !== null && offeredBy !== null? false: true;
    }

    return (
      <form onSubmit={handleSubmit}>
         <Grid className={classes.listHeading} container spacing={1}>
            <Grid item xs={'auto'} xl={'auto'} sm={4}>
              <TextField
                id="outlined-rewardName"
                label="Reward Name"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={e => {setRewardName(e.target.value); enableAddButton();}}
              />
            </Grid>
            <Grid item xs={'auto'} xl={'auto'} sm={2}>
              <TextField className={classes.rewardQuantity}
                id="outlined-rewardQuantity"
                label="Reward Quantity"
                variant="outlined"                
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={e => {setRewardQuantity(e.target.value); enableAddButton();}}
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
                  onChange={e => {setOfferedBy(e.target.value); enableAddButton();}}
                />
            </Grid>        
            <Grid className={classes.addButton} item xs={12} sm={1}>
              <Button 
                variant="contained"
                type="submit"
                disabled={enableAddButton()? true : enableAddButton()}
                >Add
              </Button>
            </Grid>                    
          </Grid>
        </form>
    );
  }