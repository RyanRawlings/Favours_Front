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
      fontSize: "40px"
  }
}));

export default function CounterButtonGroup({ handleRewardIncrement, handleRewardDecrement}) {
    const classes = useStyles();
    const [counter, setCounter] = useState(1);

    const handleIncrement = () => {
        console.log("Increment Clicked!");        
        const countIncrement = handleRewardIncrement();
        setCounter(countIncrement + 1);
    };

    const handleDecrement = () => {
        console.log("Decrement Clicked!");
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
                // orientation="vertical"
                >
                <Button onClick={handleIncrement}>+</Button>        
                <Button onClick={handleDecrement}>-</Button>
            </ButtonGroup>
            </center>
        </div>
    );
  }
