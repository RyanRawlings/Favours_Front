import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./style.scss";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import NavMenu from "../../components/navMenu/index";
import FavoursListButtonGroup from "../../components/favoursListButtonGroup/index";
import * as APIServices from "../../api/TestAPI";
import LoadingGif from "../../assets/images/loading.gif";
import Pagination from "../AllIOUList/Pagination";
import FavourModal from "../../components/favourModal/index";
import LaunchIcon from "@material-ui/icons/Launch";
import SearchBar from "../../components/searchBar/index";
import { useLocation } from "react-router-dom";
import LoadingSkeleton from "../../components/loadingSkeleton/index";
import DeleteFavour from "../../components/deleteFavour/index";
// import Toast from '../../components/toast/index';
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import NewPublicRequest from "../../components/publicRequests/newPublicRequestForm";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  container: {
    marginLeft: "1%",
    marginRight: "1%",
    marginTop: "-0.5%"
  },
  card_container: {
    margin: "20px",
    position: "relative",
    top: "0",
    transition: "top ease 0.5s",
    "&:hover": {
      top: "-10px",
      boxShadow: "3px 3px 5px 3px #ccc"
    }
  },
  icons: {
    transform: "translateY(-0.1em)"
  },
  btnBox: {
    marginLeft: "1%",
    marginTop: "1%"
  },
  heading: {
    marginLeft: "1%"
  },
  trashIcon: {
    color: "red"
  },
  button: {
    display: "inline-block"
  },
  modal: {
    display: "inline-block"
  },
  createbutton: {
    display: "inline-block"
  },

  createbutton_styling: {
    width: "100%",
    marginTop: "4%",
    marginLeft: "1%",
    backgroundColor: "#292F36",
    textTransform: "capitalize",
    verticalAlign: "middle",
    textAlign: "center",
    height: "35px",
    justifyContent: "center",
    "&:hover": {
      color: "black",
      backgroundColor: "white"
    }
  },
  searchBar: {
    display: "inline-block",
    marginLeft: "1%"
  }
}));

export default function AllIOUList(props) {
  const [favours, setFavours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [favoursPerPage, setFavoursPerPage] = useState(4);
  const location = useLocation();

  const [open, setOpen] = useState(false);
  let severity = isDeleted === true && isDeleted !== null ? "success" : "error";

  useEffect(() => {
    async function fetchAllIOUList() {
      const fetchFavours = await APIServices.debitIOUList();
      // Return array and set the Favours state
      setFavours(fetchFavours);
      setLoading(false);
    }

    fetchAllIOUList();
  }, []);

  const classes = useStyles();

  const deleteFavour = async FavourId => {
    const response = await APIServices.deleteOneFavour({ _id: FavourId });
    console.log(response);
    if (response.ok === true) {
      setIsDeleted(true);
      setToastMessage(response.message);
      setOpen(true);
    } else {
      setIsDeleted(false);
      setToastMessage(response.message);
      setOpen(true);
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  //Get current posts
  const indexOfLastFavour = currentPage * favoursPerPage;
  const indexOfFirstFavour = indexOfLastFavour - favoursPerPage;

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className={classes.root}>
      <div className="container">
        <NavMenu props={props} />
        <div className="container_right">
          <Paper className={classes.container}>
            <div className="container_right_bottom">
              <div className={classes.headingContainer}>
                <h2 className={classes.heading}>
                  Your favours <FontAwesomeIcon icon={faUser} />
                </h2>
                <div className={classes.searchBar}>
                  <SearchBar />
                </div>
                <div className={classes.createbutton}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<LaunchIcon />}
                    className={classes.createbutton_styling}
                  >
                    Create a new favour
                  </Button>
                </div>
                <div className={classes.createbutton}>
                  {/* <Button
                variant="contained"
                color="primary"
                startIcon={<LaunchIcon />}
                className={classes.createbutton_styling}
                onClick={() => openRequestModal}
                >Create a new public request
              </Button> */}
                  <NewPublicRequest />
                </div>
                <div className={classes.btnBox}>
                  <FavoursListButtonGroup />
                </div>
              </div>
              <div className="cards_container">
                <Collapse in={open}>
                  <Alert
                    severity={severity}
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setOpen(false);
                          refreshPage();
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    {toastMessage}
                  </Alert>
                </Collapse>
                {/* {isDeleted === true ? <Alert variant="filled" severity="success">Successful in deleting favour</Alert> : ""}
              {isDeleted === false ? <Alert variant="filled" severity="success">Unsuccessful in deleting favour</Alert> : ""} */}
                <React.Fragment>
                  {favours.allFavours ? (
                    favours.allFavours
                      .slice(indexOfFirstFavour, indexOfLastFavour)
                      .map((data, key) => {
                        return (
                          <Card
                            className={classes.card_container}
                            key={key + "-card"}
                          >
                            <CardContent key={key + "-cardContent"}>
                              <div className="card" key={key + "-cardDiv"}>
                                <div
                                  className="card_left"
                                  key={key + "-cardDescription"}
                                >
                                  {data.FavourDescription}
                                </div>
                                <div className="btn" key={key + "-btnDiv"}>
                                  <div className={classes.modal}>
                                    <FavourModal
                                      FavourId={data._id}
                                      FavourTitle={data.FavourTitle}
                                      Requester={data.FavourRequestingUserId}
                                      FavourDescription={data.FavourDescription}
                                      FavourDate={data.FavourDateStamp}
                                      Location={location}
                                      FavourImageKey={data.FavourImageKey}
                                    />
                                  </div>
                                  <div className={classes.button}>
                                    {/* <Button key={key+ '-btn'}><FontAwesomeIcon key={key+ '-icon'} className={classes.trashIcon} icon={faTrash} /></Button> */}
                                    {/* <DeleteFavour FavourId={data._id}/> */}
                                    <Button
                                      key={key + "deleteFavour"}
                                      onClick={() => deleteFavour(data._id)}
                                    >
                                      <FontAwesomeIcon
                                        key={key + "deleteFavour"}
                                        className={classes.trashIcon}
                                        icon={faTrash}
                                      />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })
                  ) : (
                    <center>
                      {" "}
                      <LoadingSkeleton />
                    </center>
                  )
                  // <center><img src={LoadingGif} width="100px" height="100px" alt="Loading..."/></center>
                  }
                </React.Fragment>
              </div>
              {favours.allFavours ? (
                <Pagination
                  favoursPerPage={favoursPerPage}
                  totalFavours={
                    favours.allFavours ? favours.allFavours.length : 0
                  }
                  paginate={paginate}
                />
              ) : (
                ""
              )}
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}
