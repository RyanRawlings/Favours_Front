import React, { useState, useEffect, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import AccountBox from "@material-ui/icons/AccountBox";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import HeroImage from "../../assets/images/uts-hero-image.png";
import * as APIServices from "../../api/TestAPI";
import * as PublicRequestAPI from "../../api/PublicRequestAPI";
import * as FavourAPI from "../../api/FavourAPI";
import Cookie from "js-cookie";
import NavMenu from "../../components/navMenu/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Container from "@material-ui/core/Container";
import UserContext from "../../context/UserContext";
import "./RepayFavour.css";
import SaveIcon from "@material-ui/icons/Save";
import { GridOverlay, DataGrid } from "@material-ui/data-grid";
import { XGrid } from "@material-ui/x-grid";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import * as UserAPI from "../../api/TestAPI";
import LoadingGif from "../../assets/images/loading.gif";
import ImageDragAndDrop from "../../components/uploadImage/imageDragAndDrop";
import { Redirect } from "react-router-dom";
import PartyDetection from "../../components/partyDetection/index";
// import UserContext from "../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    width: "100%"
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch"
    },
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    },
    submit: {
      margin: theme.spacing(1)
    }
  },
  label: {
    fontSize: "25px"
  },
  noRowsIcon: {
    color: "green"
  }
}));

const columns = [
  { field: "id", headerName: "ID", width: 220 },
  { field: "favourType", headerName: "Favour Type", width: 200 },
  { field: "favourDebtor", headerName: "Owed By", width: 240 },
  { field: "favourCreditor", headerName: "Paid By", width: 240 },
  { field: "favourStatus", headerName: "Favour Status", width: 130 },
  { field: "favourDate", type: "date", headerName: "Paid On", width: 110 }
];

function CustomNoRowsOverlay(loading) {
  const classes = useStyles();

  return (
    <GridOverlay className={classes.root}>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      {loading === true ? (
        <center>
          <img src={LoadingGif} width="100px" height="100px" alt="Loading..." />
        </center>
      ) : (
        <div className={classes.label}>
          No Favours to Repay{" "}
          <FontAwesomeIcon
            className={classes.noRowsIcon}
            icon={faCheckCircle}
          />
        </div>
      )}
    </GridOverlay>
  );
}

const MultiRepay = props => {
  const [loading, setLoading] = useState(true);
  const [favoursSelected, setFavoursSelected] = useState([]);
  const { userData } = useContext(UserContext);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function fetchFavours() {
      const userId = userData.user._id
        ? userData.user._id
        : props.location.state.userData.user._id
        ? props.location.state.userData.user._id
        : "";

      try {
        const fetchFavours = await FavourAPI.getFavours({ userId: userId });

        // Store credit favours into variable
        const repayFavours = fetchFavours[0].credits;

        let userArray = [];
        repayFavours.forEach(element => {
          if (!userArray.includes(element.requestUser)) {
            userArray.push(element.requestUser);
          }
          if (!userArray.includes(element.owingUser)) {
            userArray.push(element.owingUser);
          }
        });

        const fetchUsers = await PublicRequestAPI.getPublicRequestUserDetails(
          userArray
        );

        const getUserEmail = userId => {
          if (fetchUsers) {
            for (let i = 0; i < fetchUsers.length; i++) {
              if (fetchUsers[i]._id === userId) {
                return fetchUsers[i].email;
              }
            }
          }
        };

        // If there are credit favour records, run through the iteration
        let newRow = {};
        let rows = [];
        let date = null;

        if (repayFavours.length > 0) {
          for (let i = 0; i < fetchFavours[0].credits.length; i++) {
            if (fetchFavours[0].credits[i].is_completed === false) {
              date = new Date(fetchFavours[0].credits[i].create_time);

              newRow = {
                // id: i + 1,
                id: fetchFavours[0].credits[i]._id,
                favourType: fetchFavours[0].credits[i].favourOwed,
                favourDebtor: getUserEmail(
                  fetchFavours[0].credits[i].owingUser
                ),
                favourCreditor: getUserEmail(
                  fetchFavours[0].credits[i].requestUser
                ),
                favourStatus:
                  fetchFavours[0].credits[i].is_completed === true
                    ? "Paid"
                    : "Unpaid",
                favourDate: date
              };

              rows.push(newRow);
            }
          }
        }
        setRows(rows);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    }

    fetchFavours();
  }, []);

  const extractColumn = (arr, column) => {
    return arr.map(x => x[column]);
  };

  const handleFavourSelection = data => {
    setFavoursSelected(data);
  };

  const classes = useStyles();

  const handleSubmit = () => {
    props.history.push({
      pathname: "/repay_selected_favours",
      state: { setOpen: false, favoursToBeRepayed: favoursSelected }
    });
  };
  return (
    <div className={classes.root}>
      <div className="container">
        <NavMenu props={props} />
        <div className="container_right">
          <div className={classes.root}>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <Paper className={classes.paper}>
              <form className={classes.form}>
                <div
                  style={{
                    backgroundColor: "white",
                    boxShadow: "0 2px 4px 0 rgba(0,0,0,0.2)",
                    transition: "0.3s",
                    marginTop: "1%",
                    height: "500px",
                    width: "1250px"
                  }}
                >
                  <DataGrid
                    components={{
                      noRowsOverlay: () => CustomNoRowsOverlay(loading)
                    }}
                    rows={rows ? rows : rows}
                    columns={columns}
                    pageSize={6}
                    checkboxSelection
                    onSelectionChange={e => handleFavourSelection(e.rows)}
                  />
                </div>

                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.submit}
                  startIcon={<AssignmentTurnedInIcon />}
                  disabled={favoursSelected.length > 0 ? false : true}
                >
                  Repay Favour
                </Button>
                <PartyDetection userData={userData} />
              </form>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiRepay;
