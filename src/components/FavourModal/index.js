import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LaunchIcon from '@material-ui/icons/Launch';
import { useLocation } from 'react-router-dom';
import UploadImage from '../../components/UploadImage/index';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    height: "50%",
    width: "70%"
  },
  table: {
    width: "100%",
    height: "100%"
  },
  tableCell: {
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    width: "80%"

  },
  row: {
      width: "400px"
  },
  modalButton: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial'",
    textTransform: "capitalize",
    backgroundColor: "#1B9AAA",
    '&:hover': {
        backgroundColor: "white",
        color: 'black'
    }
  },
  imagebox: {
    marginLeft: "0"
  }

}));

export default function FavourModal({ FavourId, FavourTitle, Requester, FavourDescription,  FavourDate, Location, FavourImageKey}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function createData(FavourDetails, Information) {
    return { FavourDetails, Information };
  }
  
  const rows = [
    createData('Favour Title: ', FavourTitle ),
    createData('Requested by:', Requester),
    createData('Favour Description: ', FavourDescription),
    createData('Date Requested: ', FavourDate),
  ];
  
  const { pathname } = Location;

  return (
    <div>
        <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<LaunchIcon />}
        onClick={handleOpen}
        className={classes.modalButton}
      >
        View favour details
      </Button>
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
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow className={classes.row}>
                    <TableCell align="left">Favour Details</TableCell>
                    <TableCell className={classes.tableCellRight} align="left">Information</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row, index) => (
                    <TableRow key={row.toString() + index} className={classes.row}>
                    <TableCell key={row[0] + '-cell-one'.concat(index)} align="left">{row.FavourDetails}</TableCell>
                    <TableCell key={row[0] + '-cell-two'.concat(index)} className={classes.tableCellRight} align="left">{row.Information}</TableCell>                   
                    </TableRow>
                ))}
                <TableRow key="button-row" className={classes.row}>
                <TableCell key={"button-row" + '-cell-one'}>Respond to this 
                  {pathname === "/all_list"? " Favour" : " Request"}
                  </TableCell>
                    <TableCell key={"button-row" + '-cell-two'} className={classes.tableCellRight}><Button variant="contained" color="primary" component="span" onClick={() => { alert('clicked') }}>Yes</Button></TableCell>
                </TableRow>
                {pathname === '/all_list'? 
                <TableRow key="image-row" className={classes.row}>
                  <TableCell key={"image-row" + '-cell-one'}>Upload an Image</TableCell>
                  <TableCell key={"image-row" + '-cell-two'} className={classes.tableCellRight}><div className={classes.imagebox}><UploadImage FavourId={FavourId} FavourImageKey={FavourImageKey}/></div></TableCell>
                </TableRow>
                : ""
                }
                </TableBody>
            </Table>            
            </TableContainer>                        
          </div>
        </Fade>
      </Modal>
    </div>
  );
}