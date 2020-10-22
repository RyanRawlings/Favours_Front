import React, { Fragment, useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./style.scss";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faTrash,
  faThumbsUp,
  faThumbsDown,
  faUsers,
  faSprayCan
} from "@fortawesome/free-solid-svg-icons";
import NavMenu from "../../components/navMenu/index";
import FavoursListButtonGroup from "../../components/favoursListButtonGroup/index";
import * as APIServices from "../../api/TestAPI";
import LoadingGif from "../../assets/images/loading.gif";
import PublicRequestIcon from "../../assets/images/public-requests-alternate.png";
import Pagination from "../AllIOUList/Pagination";
import FavourModal from "../../components/favourModal/index";
import { useLocation } from "react-router-dom";
import SearchBar from "../../components/searchBar/index";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import UserContext from "../../context/UserContext";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  container: {
    backgroundColor: "#fcfbfb",
    marginLeft: "1%",
    marginRight: "1%",
    marginTop: "0%"
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
    marginLeft: "1%"
  },
  heading: {
    marginLeft: "1%"
  },
  requestsImage: {
    height: "50px",
    width: "60px"
  },
  headingContainer: {},
  searchBar: {
    marginLeft: "1%"
  },
  modal: {
    display: "inline-block",
    marginRight: "40%",
    marginLeft: "-40%"
  },
  rewardList: {
    display: "inline",
    backgroundColor: "white",
    width: "20%",
    marginLeft: "1%"
  },
  subheadingRow: {
    display: "flex"
  },
  homeButton: {
    marginLeft: "1%",
    display: "inline",
    whiteSpace: "nowrap"
  },
  leaderboardButton: {
    display: "inline",
    marginLeft: "1%",
    whiteSpace: "nowrap"
  },
  anonymousButtonGroup: {
    display: "flex"
  }

}));

export default function PublicRequest(props) {
  const [publicRequests, setPublicRequests] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage, setRequestsPerPage] = useState(4);
  const [searchBarPlaceHolder, setSearchBarPlaceHolder] = useState("");
  const [favourRewards, setFavourRewards] = useState([]);
  const { userData } = useContext(UserContext);

  // console.log("props:", props.user.token);

  const classes = useStyles();
  // // const [tag, setTag] = useState(0);
  const location = useLocation();

  useEffect(() => {
    async function getPublicRequestList() {
      const getPublicRequests = await APIServices.getPublicRequests();
      // Return array and set the Favours state
      // console.log("getPublicRequests:", getPublicRequests);
      setPublicRequests(getPublicRequests);
      setSearchResult(getPublicRequests);
      setLoading(false);
    }

    getPublicRequestList();
  }, []);

  useEffect(() => {
    async function getFavourType() {
      const getFavourTypes = await APIServices.getFavourTypes();
      // Return array and set the Favours state
      const { favourTypes } = getFavourTypes;
      const favourTypesArray = Object.values(favourTypes);
      setFavourRewards(favourTypesArray);
    }

    getFavourType();
  }, []);

  //Get current posts
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const getLocation = () => {
    return location.pathname;
  };

  //search keywords or reward item
  const handleSearch = input => {
    // console.log("input:", input);
    // console.log(publicRequests);
    setSearchBarPlaceHolder(input);
    let newData = [];
    publicRequests.map(item => {
      // console.log("item:", item);

      //check reward array
      let checkReward;
      item.rewards.map(i => {
        if (i.item.toLowerCase().match(input.toLowerCase())) {
          checkReward = true;
        }
      });
      if (
        item.requestUser.firstname.toLowerCase().match(input.toLowerCase()) ||
        item.requestUser.lastname.toLowerCase().match(input.toLowerCase()) ||
        item.description.toLowerCase().match(input.toLowerCase()) ||
        item.title.toLowerCase().match(input.toLowerCase()) ||
        checkReward
      ) {
        newData.push(item);
      }
      return 0;
    });
    setLoading(false);
    setSearchResult(newData);

    // console.log("searchResult", searchResult);
  };

  return (
    <div className={classes.root}>
      <div className="container">
        <NavMenu props={props} />
        <div className="container_right">
          <Paper className={classes.container}>
            <div className="container_right_bottom">
              <div className={classes.headingContainer}>
                <h2 className={classes.heading}>
                  Public Requests <FontAwesomeIcon icon={faUsers} />
                </h2>
              </div>
              <div className={classes.subheadingRow}>
                <div className={classes.searchBar}>
                  <SearchBar
                    onSearch={handleSearch}
                    placeHolder={searchBarPlaceHolder}
                  />
                </div>
                <div className={classes.rewardList}>
                <Autocomplete
                  id="rewards"
                  options={favourRewards}
                  getOptionLabel={(option) => option.Name}
                  onInputChange={(event, newInputValue) => {
                    
                  }}
                  renderInput={(params) => <TextField {...params} label="View Rewards on Offer" variant="outlined" />
                  }/>              
                </div>
                {
                  userData.user?
                  "" : 
                  <div className={classes.anonymousButtonGroup}>
                    <div className={classes.homeButton}>
                      <Button variant="contained" href={"/home"}> Back to Home</Button>
                    </div>
                    <div className={classes.leaderboardButton}>
                      <Button variant="contained" href={"/leaderboard"}>View Leaderboard</Button>
                    </div>
                  </div>
                }
              </div>
              <div className="cards_container">
                <Fragment>
                  {searchResult ? (
                    searchResult
                      .slice(indexOfFirstRequest, indexOfLastRequest)
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
                                  Request Title:&nbsp;<strong>{data.title}</strong>&nbsp;|&nbsp;Favour Rewards Offered:&nbsp;<strong>{data.rewards.length}</strong>
                                </div>
                                <div
                                  className="card_right"
                                  key={key + "-cardRight"}
                                >
                                  <div className={classes.modal}>
                                    {/* {console.log(data.title, data.rewards)} */}
                                    <FavourModal
                                      key={key + "-modal"}
                                      FavourId={data._id}
                                      FavourTitle={data.title}
                                      Requester={data.requestUser}
                                      FavourDescription={data.description}
                                      Rewards={data.rewards}
                                      Location={getLocation()}
                                      User={props.user}
                                      CurrentPage={currentPage}
                                    />
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })
                  ) : (
                    <center>
                      <img
                        src={LoadingGif}
                        width="100px"
                        height="100px"
                        alt="Loading..."
                      />
                    </center>
                  )}
                </Fragment>
              </div>
              {searchResult ? (
                <Pagination
                  favoursPerPage={requestsPerPage}
                  totalFavours={searchResult ? searchResult.length : 0}
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
