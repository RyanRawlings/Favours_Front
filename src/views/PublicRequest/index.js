import React, { Fragment, useEffect, useState } from "react";
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
  faUsers
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
  }
}));

export default function PublicRequest(props) {
  const [publicRequests, setPublicRequests] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage, setRequestsPerPage] = useState(4);
  const [searchBarPlaceHolder, setSearchBarPlaceHolder] = useState("");
  useEffect(() => {
    async function getPublicRequestList() {
      const getPublicRequests = await APIServices.getPublicRequests();
      // Return array and set the Favours state
      console.log("getPublicRequests:", getPublicRequests);
      setPublicRequests(getPublicRequests);
      setSearchResult(getPublicRequests);
      setLoading(false);
    }

    getPublicRequestList();
  }, []);

  const classes = useStyles();
  // // const [tag, setTag] = useState(0);
  const location = useLocation();

  //Get current posts
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;

  const paginate = pageNumber => setCurrentPage(pageNumber);

  // console.log(props.location.state.setOpen);

  //search keywords or reward item
  const handleSearch = input => {
    console.log("input:", input);
    console.log(publicRequests);
    setSearchBarPlaceHolder(input);
    let newData = [];
    publicRequests.map(item => {
      console.log("item:", item);

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
    console.log("searchResult", searchResult);
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
              <div className={classes.searchBar}>
                <SearchBar
                  onSearch={handleSearch}
                  placeHolder={searchBarPlaceHolder}
                />
              </div>
              <div className="cards_container">
                <React.Fragment>
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
                                  {data.title}
                                </div>
                                <div
                                  className="card_right"
                                  key={key + "-cardRight"}
                                >
                                  <FavourModal
                                    key={key + "-modal"}
                                    FavourTitle={data.title}
                                    Requester={data.requestUser}
                                    FavourDescription={data.description}
                                    Rewards={data.rewards}
                                  />
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
                </React.Fragment>
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
