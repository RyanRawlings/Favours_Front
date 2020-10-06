import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import LaunchIcon from '@material-ui/icons/Launch';
import Chip from '@material-ui/core/Chip';
import ChipInput from 'material-ui-chip-input';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%",
    paddingLeft: "10%",
    borderStyle: "none"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  createbutton_styling: {
    width: "100%",
    color: "white",
    marginTop: "3.5%",
    marginLeft: "3%",
    backgroundColor: "#292F36",      
    textTransform: "capitalize",
    verticalAlign: "middle",
    textAlign: "center",
    height: "35px",
    justifyContent: 'center',
    '&:hover': {
      color: "black",
      backgroundColor: "white"      
    }
},
submitButtonDiv: {
    marginLeft: "auto",
    marginRight: "auto"
},
headingDiv: {
    marginLeft: "-6%",
    marginTop: "-3.4%",
    paddingLeft: "2%",
    paddingTop: "2%",
    paddingBottom: "1%",
    backgroundColor: '#1B9AAA',
    width: "112%",
    maxWidth: "112%",
    color: "white"
},
formData: {
    marginTop: "4%"
}
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [chipData, setChipData] = useState(['Reward Favour']);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setChipData(['Reward Favour']);
  };

  const handleAddChip = (chip) => {    
    let appendedChipArray = chipData;
    appendedChipArray.push(chip.toString())
    setChipData(appendedChipArray);
    console.log(chipData);
  };

  const handleDeleteChip = (chip) => {
        let newChipData = chipData;
        let i = 0;
        while (i < newChipData.length) {
          if (chipData[i] === chip) {
            newChipData.splice(i, 1);
            console.log(chip, 'deleted from array')
          } else {
            ++i;
          }
        }
        setChipData(newChipData);
      };

  return (
    <div>
      <Button 
            variant="contained"
            className={classes.createbutton_styling} 
            type="button" 
            onClick={handleOpen}
            startIcon={<LaunchIcon />}
        >Create New Public Request</Button>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={open}>
            <div className={classes.paper}>
            <React.Fragment>
        <div className={classes.headingDiv}>
            <Typography variant="h6" gutterBottom>
                Create New Public Request
            </Typography>
        </div>
        <form className={classes.formData}>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
            <TextField
                required
                id="favourTitle"
                name="favourTitle"
                label="Favour Title"   
                InputLabelProps={{
                    shrink: true,
                    }}             
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                required
                id="requestedBy"
                name="requestedBy"
                label="Requested By"
                value="You"
                InputLabelProps={{
                    shrink: true,
                    }}
            />
            </Grid>
            <Grid item xs={12} sm={12}>
            <TextField
                required
                id="favourDescription"
                name="favourDescription"
                label="Favour Description"
                InputLabelProps={{
                    shrink: true,
                    }}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                id="datetime-local"
                label="Required before date"
                type="datetime-local"
                defaultValue={Date.now}
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
            />
            </Grid>
            <Grid item xs={12}>
                <ChipInput                     
                    label="Favour Rewards"
                    value={chipData}
                    onAdd={(chip) => handleAddChip(chip)}
                    onDelete={(chip) => handleDeleteChip(chip)}
                />            
            </Grid>
            <Grid className={classes.submitButtonDiv} item xs={6}>                
                <Button
                variant="contained"
                color="primary"
                className={classes.createbutton_styling}
                startIcon={<LaunchIcon />}
                >Submit Request</Button>
            </Grid>
        </Grid>        
        </form>
        </React.Fragment>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}