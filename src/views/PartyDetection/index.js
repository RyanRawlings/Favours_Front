import React, { Fragment, useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./style.scss";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrayingHands, faUser,faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
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
import NewFavour from "../../components/favours/NewFavourForm";
import { Link } from "react-router-dom";
import * as FavourAPI from "../../api/FavourAPI";
import UserContext from "../../context/UserContext";
import ButtonGroup from "@material-ui/core/ButtonGroup";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';

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
    display: "inline-block",
    marginRight: "40%",
    marginLeft: "-40%"
  },
  createbutton: {
    display: "inline-block",
    marginTop: "-0.3%",
    marginLeft: "1%",
    fontSize: "1e"
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
  },
  headingButtonsContainer: {
    display: "flex"
  },
  icons: {
    transform: "translateY(-0.1em)"
  },
  listlinks: {  
    textDecoration: "none",
  },
  filterIcon_debit: {
    marginLeft: "10%",
    color: "#32CD32"
    },
  filterIcon_credit: {
    marginLeft: "10%",
    color: "red"
    },
    actionbutton: {
      textTransform: "capitalize",
      width: "100px",
      backgroundColor: "#1B9AAA",
      color: "white",
      borderColor: "white",
      '&:hover': {
        color: 'black',
        backgroundColor: "rgba(0, 0, 0, 0.04)"
      }
    },

    filterIcon_forgiven: {
      marginLeft: "10%",
      color: "#0D4F8B",
    }
}));

export default function AllIOUList(props) {
  const [favours, setFavours] = useState([]);
  const [allFavours, setAllFavours] = useState([]);
  const [creditFavours, setCreditFavours] = useState([]);
  const [debitFavours, setDebitFavours] = useState([]);
  const [forgivenFavours, setForgivenFavours] = useState([]);

  const [loading, setLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [favoursPerPage, setFavoursPerPage] = useState(4);
  const { userData } = useContext(UserContext);
  const location = useLocation();
  const [searchBarPlaceHolder, setSearchBarPlaceHolder] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [activeButton, setActiveButton] = useState("all");

  const [open, setOpen] = useState(false);
  let severity = isDeleted === true && isDeleted !== null ? "success" : "error";

  useEffect(() => {
    async function fetchAllIOUList() {
      // const fetchFavours = await APIServices.allIOUList();
      const { _id } = userData.user
      const fetchFavours = await FavourAPI.getFavours({userId: _id});

      if (fetchFavours) {
        console.log(fetchFavours[0].credits.concat(fetchFavours[1].debits));
        setAllFavours(fetchFavours[0].credits.concat(fetchFavours[1].debits,fetchFavours[2].forgivenFavours));

        console.log(fetchFavours[0].credits);
        setCreditFavours(fetchFavours[0].credits);

        console.log(fetchFavours[1].debits);
        setDebitFavours(fetchFavours[1].debits);

        console.log(fetchFavours[2].forgivenFavours);
        setForgivenFavours(fetchFavours[2].forgivenFavours);
      }

      // console.log("result", fetchFavours[0].credits.concat(fetchFavours[1].debits,fetchFavours[2].forgivenFavours));
      // setFavours(fetchFavours[0].credits.concat(fetchFavours[1].debits).concat(fetchFavours[1].forgivenFavours));
      // setSearchResult(fetchFavours[0].credits.concat(fetchFavours[1].debits).concat(fetchFavours[1].forgivenFavours));
      setFavours(fetchFavours[0].credits.concat(fetchFavours[1].debits,fetchFavours[2].forgivenFavours));
      setSearchResult(fetchFavours[0].credits.concat(fetchFavours[1].debits,fetchFavours[2].forgivenFavours));
      setLoading(false);
    }
    

    fetchAllIOUList();
  }, []);

  const classes = useStyles();

  const updateActiveFavours = async sliceType => {
    if (sliceType === "all") {
      setFavours(allFavours);
      setSearchResult(allFavours);
    } else if (sliceType === "credit") {
      setFavours(creditFavours);
      setSearchResult(creditFavours);
    } else if (sliceType === "debit") {
      setFavours(debitFavours);
      setSearchResult(debitFavours);
    } else if (sliceType === "forgiven") {
      setFavours(forgivenFavours);
      setSearchResult(forgivenFavours);
    }
  }

//search keywords or reward item
const handleSearch = input => {
  console.log("input:", input);
  console.log(favours);
  setSearchBarPlaceHolder(input);
  let newData = [];
  let tempData = [];

  favours.map(item => {
    console.log("item:", item);
    tempData = Object.entries(item);
    // console.log("converted data: ", tempData);

    //check favours array
    let checkFavour;
    let tempVar = null;
    
    tempData.map(i => {
      tempVar = i[1].toString();
      if (tempVar.toLowerCase().match(input.toLowerCase())) {
        checkFavour = true;
      }
    });
    if (
      // item.requestUser.firstname.toLowerCase().match(input.toLowerCase()) ||
      // item.requestUser.lastname.toLowerCase().match(input.toLowerCase()) ||
      item.description.toString().toLowerCase().match(input.toLowerCase()) ||
      item.favourOwed.toString().toLowerCase().match(input.toLowerCase()) ||
      checkFavour
    ) {
      newData.push(item);
    }
    return 0;
  });

  setLoading(false);
  setSearchResult(newData);
  
  // console.log("searchResult", searchResult);
};

  const refreshPage = () => {
    window.location.reload();
  };

  //Get current favours
  const indexOfLastFavour = currentPage * favoursPerPage;
  const indexOfFirstFavour = indexOfLastFavour - favoursPerPage;

  const paginate = pageNumber => setCurrentPage(pageNumber);
  const pageReset = 1;

  const pageUpdates = (pageView) => {
    if (pageView === "all") {
      updateActiveFavours("all"); 
      setActiveButton("all"); 
      setCurrentPage(1);      
    } else if (pageView === "debit") {
      updateActiveFavours("debit"); 
      setActiveButton("debit"); 
      setCurrentPage(1);
    } else if (pageView === "credit") {
      updateActiveFavours("credit"); 
      setActiveButton("credit"); 
      setCurrentPage(1);
    } else if (pageView === "forgiven") {
      updateActiveFavours("forgiven"); 
      setActiveButton("forgiven"); 
      setCurrentPage(1);
    }
  }

  // const buttonPress = () => {

  // }

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
                <div className={classes.headingButtonsContainer}>
                <div className={classes.searchBar}>
                  <SearchBar onSearch={handleSearch}
                              placeHolder={searchBarPlaceHolder}/>
                </div>
                <div className={classes.createbutton}>
                  <NewFavour />
                </div>
                <div className={classes.createbutton}>
                  <NewPublicRequest />
                </div>
                </div>
                <div className={classes.btnBox}>
                  {/* <FavoursListButtonGroup /> */}
                  <div className={classes.listlinks}>
                      <ButtonGroup className={classes.buttons}>
                        <Button 
                          onClick={() => {pageUpdates("all"); console.log("Page after button press", currentPage)}} 
                          className={classes.actionbutton} 
                          style={{backgroundColor: activeButton === "all"? "rgba(0, 0, 0, 0.04)" : "#1B9AAA",
                                  color: activeButton === "all"? "black" : "white"}}
                        >All</Button>
                        <Button 
                          onClick={() => { pageUpdates("debit");console.log("Page after button press", currentPage)}}
                          className={classes.actionbutton}
                          style={{backgroundColor: activeButton === "debit"? "rgba(0, 0, 0, 0.04)" : "#1B9AAA",
                                  color: activeButton === "debit"? "black" : "white"}}
                        >Debit <FontAwesomeIcon 
                                    className={classes.filterIcon_debit} 
                                    icon={faThumbsUp} 
                                />
                        </Button>
                        <Button 
                          onClick={() => { pageUpdates("credit") ; console.log("Page after button press", currentPage)}} 
                          className={classes.actionbutton}
                          style={{backgroundColor: activeButton === "credit"? "rgba(0, 0, 0, 0.04)" : "#1B9AAA",
                                  color: activeButton === "credit"? "black" : "white"}}
                        >Credit 
                          <FontAwesomeIcon 
                            className={classes.filterIcon_credit} 
                            icon={faThumbsDown} 
                          />
                        </Button>
                        <Button 
                          onClick={() => { pageUpdates("forgiven") ; console.log("Page after button press", currentPage)}} 
                          className={classes.actionbutton}
                          style={{backgroundColor: activeButton === "forgiven"? "rgba(0, 0, 0, 0.04)" : "#1B9AAA",
                                  color: activeButton === "forgiven"? "black" : "white"}}
                        >Forgiven 
                          <FontAwesomeIcon 
                            className={classes.filterIcon_forgiven} 
                            icon={faPrayingHands} 
                          />
                        </Button>
                      </ButtonGroup>
                  </div>
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
              {console.log(searchResult)}

                <React.Fragment>
                  {searchResult? (
                    searchResult
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
                                  Favour Type:&nbsp;<strong>{data.favourOwed}</strong>&nbsp;|&nbsp;Status:&nbsp;<strong>{data.is_completed === true? "Paid": "Unpaid"}</strong>&nbsp;|&nbsp;Debt Forgiven:&nbsp;<strong>{data.debt_forgiven === true? "Yes": "No"}</strong>&nbsp;|&nbsp;Debit or Credit:&nbsp;<strong>{userData.user._id === data.owingUser ? "Debit": "Credit"}</strong>&nbsp;
                                </div>
                                <div className="btn" key={key + "-btnDiv"}>
                                  <div className={classes.modal}>
                                    <FavourModal
                                      FavourId={data._id}
                                      FavourTitle={data.favourOwed}
                                      Requester={data.requestUser}                                      
                                      FavourDescription={data.description}
                                      FavourDate={data.create_time}
                                      Location={location.pathname}
                                      FavourImageKey={data.proofs.uploadImageUrl}
                                      Complete={data.is_completed}
                                      OwingUser={data.owingUser}
                                    />
                                  </div>
                                  <div className={classes.button}>
                                    {/* <Button key={key+ '-btn'}><FontAwesomeIcon key={key+ '-icon'} className={classes.trashIcon} icon={faTrash} /></Button> */}
                                    {/* <DeleteFavour FavourId={data._id}/> */}
                                    {/* <Button
                                      key={key + "deleteFavour"}
                                      onClick={() => deleteFavour(data._id)}
                                    >
                                      <FontAwesomeIcon
                                        key={key + "deleteFavour"}
                                        className={classes.trashIcon}
                                        icon={faTrash}
                                      />
                                    </Button> */}
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
              {searchResult ? (
                <Pagination
                  favoursPerPage={favoursPerPage}
                  totalFavours={
                    searchResult ? searchResult.length : 0
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
