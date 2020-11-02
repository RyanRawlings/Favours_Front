import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from '@material-ui/core/styles';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),      
    },
    marginTop: "10%"
  },
  counterBox: {
      border: "1px black"
  },
  icons: {
      fontSize: "small"
  }
}));

/**************************************************************************************************************
* Code Attribution:
* Author: Anton Novik
* Url: https://stackoverflow.com/questions/59305603/increment-and-decrement-button-via-material-ui-buttongroup
* Comment: Updated solution to use react hook syntax
***************************************************************************************************************/

const CounterButtonGroup = ({ handleRewardIncrement, handleRewardDecrement}) => {
    const classes = useStyles();
    const [counter, setCounter] = useState(1);

    const handleIncrement = () => {
        const countIncrement = handleRewardIncrement();
        setCounter(countIncrement + 1);
    };

    const handleDecrement = () => {
        if ((counter) === 1 ) {

        } else {
            const countDecrement = handleRewardDecrement();
            setCounter(countDecrement - 1);
        }
        
    }

    return (
        <div>
            <center className={classes.counterBox}>
            <Badge badgeContent={counter} color="primary">
                <CardGiftcardIcon className={classes.icons}/>
            </Badge>
            <ButtonGroup 
                size="small" 
                aria-label="small outlined button group"
            >
                <Button onClick={handleIncrement}>+</Button>        
                <Button onClick={handleDecrement}>-</Button>
            </ButtonGroup>
            </center>
        </div>
    );
  }
  
export default CounterButtonGroup; 