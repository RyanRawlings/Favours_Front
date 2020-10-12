import React, { Fragment, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  removeButton: {
    width: "100%",
    minWidth: "100%"
  },
  removeIcon: {
    color: "red",
  },
  listItem: {
    marginTop: "1%",    
    borderRadius: "3px",
    maxWidth: "100%",
    '&$listItemColumn': {
        display: 'inline-block',
        verticalAlign: 'middle'
    }
  }

}));

export default function Rewards({ reward, index, removeReward }) {
  // console.log(reward)
  const classes = useStyles();  
  return (
      <Fragment>        
        <Paper className={classes.listItem}>
        <ListItem>        
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <span className={classes.listItemColumn}>{reward.rewardName}</span>
            </Grid>
            <Grid className={classes.rewardQuantity} item xs={'auto'} xl={'auto'} sm={2}>
              <span>{reward.rewardQuantity}</span>
            </Grid>
            <Grid item xs={12} sm={4}>
              <span className={classes.listItemColumn}>{reward.offeredBy}</span>
            </Grid>        
            <Grid item xs={12} sm={1}>
            <center>
              <Button className={classes.removeButton}
                variant="contained"
                onClick={() => removeReward(index)}
              ><DeleteIcon className={classes.removeIcon}/>
              </Button>
              </center>
            </Grid>
          </Grid>
        </ListItem>
        </Paper>
      </Fragment>
    );
  }