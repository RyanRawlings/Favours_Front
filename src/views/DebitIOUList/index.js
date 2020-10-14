import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./style.scss";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faTrash } from "@fortawesome/free-solid-svg-icons";
import NavMenu from "../../components/navMenu/index";
import FavoursListButtonGroup from "../../components/favoursListButtonGroup/index";
import * as testAPI from "../../api/TestAPI";
import LoadingGif from "../../assets/images/loading.gif";
import styles from "../../index.css";
import Pagination from "../AllIOUList/Pagination";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  container: {
    margin: "20px"
  },
  icons: {
    transform: "translateY(-0.1em)"
  }
}));

export default function DebitIOUList() {
  const [favours, setFavours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [favoursPerPage, setFavoursPerPage] = useState(5);

  useEffect(() => {
    async function fetchDebitIOUList() {
      const fetchFavours = await testAPI.debitIOUList();
      // Return array and set the Favours state
      setFavours(fetchFavours);
      setLoading(false);
    }

    fetchDebitIOUList();
  }, []);

  const classes = useStyles();
  // // const [tag, setTag] = useState(0);

  //Get current posts
  const indexOfLastFavour = currentPage * favoursPerPage;
  const indexOfFirstFavour = indexOfLastFavour - favoursPerPage;

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className={classes.root}>
      <div className="container">
        <NavMenu />
        <div className="container_right">
          <Paper className={classes.container}>
            <div className="container_right_bottom">
              <FavoursListButtonGroup />
              <div className="cards_container">
                <React.Fragment>
                  {favours.allFavours ? (
                    favours.allFavours
                      .slice(indexOfFirstFavour, indexOfLastFavour)
                      .map((data, key) => {
                        return (
                          <Card
                            className={classes.container}
                            key={key + "-card"}
                          >
                            <CardContent key={key + "-cardContent"}>
                              <div className="card" key={key + "-cardDiv"}>
                                <Avatar key={key + "-avatar"}></Avatar>
                                <div
                                  className="card_left"
                                  key={key + "-cardDescription"}
                                >
                                  {data.FavourDescription}
                                </div>
                                <div
                                  className="card_right"
                                  key={key + "-cardRight"}
                                ></div>
                                <div className="btn" key={key + "-btnDiv"}>
                                  {data.FavourDateStamp}
                                  <Button key={key + "-btn"}>
                                    <FontAwesomeIcon
                                      key={key + "-icon"}
                                      icon={faTrash}
                                    />
                                  </Button>
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
