import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import LaunchIcon from "@material-ui/icons/Launch";
import { useLocation } from "react-router-dom";
import UploadImage from "../uploadImage/index";
import Link from "@material-ui/core/Link";
import LoginSignupButtonGroup from "../LoginSignupButtonGroup/index";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    height: "40%",
    width: "80%",
    outline: "none"
  },
  table: {
    width: "100%",
    height: "auto",
    color: "white"
  },
  tableCell: {
    whiteSpace: "normal",
    wordBreak: "break-word",
    width: "80%"
  },
  headerRow: {
    width: "400px",
    backgroundColor: "#1B9AAA",
    color: "white",
    "& $headerTableCellLeft": {
      color: "white"
    },
    "& $headerTableCellRight": {
      whiteSpace: "normal",
      wordBreak: "break-word",
      width: "80%",
      color: "white"
    }
  },
  row: {
    width: "400px"
  },
  modalButton: {
    width: "110%",
    fontFamily: "'Roboto', 'Helvetica', 'Arial'",
    textTransform: "capitalize",
    backgroundColor: "#1B9AAA",
    "&:hover": {
      backgroundColor: "white",
      color: "black"
    }
  },
  imagebox: {
    marginLeft: "0"
  },
  btnGroup: {
    paddingLeft: "1%",
    verticalAlign: "middle",
    width: "30%"
  },
  overrides: {
    MuiTableCell: {
      head: {
        color: "white"
      }
    }
  }
}));

export default function FavourModal({
  FavourId,
  FavourTitle,
  Requester,
  FavourDescription,
  FavourDate,
  Location,
  FavourImageKey
}) {
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
    createData("Favour Title: ", FavourTitle),
    createData("Requested by:", Requester),
    createData("Favour Description: ", FavourDescription),
    createData("Date Requested: ", FavourDate)
  ];

  const { pathname } = Location;

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
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
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow className={classes.headerRow}>
                    <TableCell
                      variant="head"
                      align="left"
                      className={classes.headerTableCellLeft}
                    >
                      <span style={{ color: "white" }}>Favour Details</span>
                    </TableCell>
                    <TableCell
                      variant="head"
                      align="left"
                      className={classes.headerTableCellRight}
                    >
                      <span style={{ color: "white" }}>Information</span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow
                      key={row.toString() + index}
                      className={classes.row}
                    >
                      <TableCell
                        key={row[0] + "-cell-one".concat(index)}
                        align="left"
                      >
                        {row.FavourDetails}
                      </TableCell>
                      <TableCell
                        key={row[0] + "-cell-two".concat(index)}
                        className={classes.tableCellRight}
                        align="left"
                      >
                        {row.Information}
                      </TableCell>
                    </TableRow>
                  ))}                           
                    <TableRow key="image-row" className={classes.row}>
                      <TableCell key={"image-row" + "-cell-one"}>
                        Upload proof image
                      </TableCell>
                      <TableCell
                        key={"image-row" + "-cell-two"}
                        className={classes.tableCellRight}
                      >
                        <div className={classes.imagebox}>
                          <UploadImage
                            FavourId={FavourId}
                            FavourImageKey={FavourImageKey}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
