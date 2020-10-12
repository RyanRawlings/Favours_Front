import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./style.scss";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faTrash, faThumbsUp, faThumbsDown, faUsers} from '@fortawesome/free-solid-svg-icons';
import NavMenu from "../../components/navMenu/index";
import FavoursListButtonGroup from "../../components/favoursListButtonGroup/index";
import * as testAPI from "../../api/TestAPI";
import LoadingGif from "../../assets/images/loading.gif";
import PublicRequestIcon from "../../assets/images/public-requests-alternate.png";
import Pagination from '../AllIOUList/Pagination';
import FavourModal from '../../components/favourModal/index';
import { useLocation } from 'react-router-dom';
import SearchBar from '../../components/searchBar/index';

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
    '&:hover': {      
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
     width: "60px",
  },
  headingContainer: {
  },
  searchBar: {
    marginLeft: "1%"
  }
}));

export default function PublicRequest(props) {
  const [favours, setFavours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [favoursPerPage, setFavoursPerPage] = useState(4);
  
  useEffect(() => {
    async function fetchPublicRequestList() {
      const fetchFavours = await testAPI.debitIOUList();
      // Return array and set the Favours state
      setFavours(fetchFavours);
      setLoading(false);
    }
    
    fetchPublicRequestList();
  }, []);

  const classes = useStyles();
  // // const [tag, setTag] = useState(0);
  const location = useLocation();
  
  //Get current posts
  const indexOfLastFavour = currentPage * favoursPerPage;
  const indexOfFirstFavour = indexOfLastFavour - favoursPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // console.log(props.location.state.setOpen);

  return (
    <div className={classes.root}>
      <div className="container">
        <NavMenu props={props}/>
        <div className="container_right">
          <Paper className={classes.container}>
            <div className="container_right_bottom">
            <div className={classes.headingContainer}>
            <h2 className={classes.heading}>Public Requests <FontAwesomeIcon icon={faUsers}/></h2>
            </div>
            <div className={classes.searchBar}><SearchBar /></div>
              <div className="cards_container">              
               <React.Fragment>                
              {favours.allFavours?
                favours.allFavours.slice(indexOfFirstFavour, indexOfLastFavour).map((data, key) => {
                  return ( 
                          <Card className={classes.card_container} key={key + '-card'}>
                            <CardContent key={key + '-cardContent'}>
                              <div className="card" key={key+ '-cardDiv'}>
                                <div className="card_left" key={key+ '-cardDescription'} >{data.FavourTitle}</div>
                                <div className="card_right" key={key + '-cardRight'} >
                                <FavourModal key={key + '-modal'} FavourTitle={data.FavourTitle} Requester={data.FavourRequestingUserId} FavourDescription={data.FavourDescription}  FavourDate={data.FavourDateStamp} Location={location}/>
                                </div>
                              </div>
                            </CardContent>
                          </Card>                          
                    )})
                    : <center><img src={LoadingGif} width="100px" height="100px" alt="Loading..."/></center>}
              </React.Fragment>                                    
              </div>              
              {favours.allFavours? <Pagination favoursPerPage={favoursPerPage} totalFavours={favours.allFavours? favours.allFavours.length : 0} paginate={paginate} /> : ""}           
            </div>        
          </Paper>          
        </div>
      </div>
    </div>
  );
}