import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./style.scss";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faTrash, faUser} from '@fortawesome/free-solid-svg-icons';
import NavMenu from "../../components/NavMenu/index";
import IOUListButtonGroup from "../../components/IOUListButtonGroup/index";
import * as testAPI from "../../api/TestAPI";
import LoadingGif from "../../assets/images/loading.gif";
import Pagination from '../AllIOUList/Pagination';
import FavourModal from '../../components/FavourModal/index';

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
  trashIcon: {
    color: "red",
  },
  button: {
    display: 'inline-block'
  },
  modal: {
    display: 'inline-block'
  }
}));

export default function AllIOUList() {
  const [favours, setFavours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [favoursPerPage, setFavoursPerPage] = useState(5);
  
  useEffect(() => {
    async function fetchAllIOUList() {
      const fetchFavours = await testAPI.debitIOUList();
      // Return array and set the Favours state
      setFavours(fetchFavours);
      setLoading(false);
    }
    
    fetchAllIOUList();
  }, []);

  const classes = useStyles();
  // // const [tag, setTag] = useState(0);
  
  //Get current posts
  const indexOfLastFavour = currentPage * favoursPerPage;
  const indexOfFirstFavour = indexOfLastFavour - favoursPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={classes.root}>
      <div className="container">
        <NavMenu />
        <div className="container_right">
          <Paper className={classes.container}>
            <div className="container_right_bottom">
            <div className={classes.headingContainer}>
            <h2 className={classes.heading}>Your favours <FontAwesomeIcon icon={faUser}/></h2>                          
              <div className={classes.btnBox}><IOUListButtonGroup /></div>              
            </div>
              <div className="cards_container">              
               <React.Fragment>                
              {favours.allFavours?
                favours.allFavours.slice(indexOfFirstFavour, indexOfLastFavour).map((data, key) => {
                  return ( 
                          <Card className={classes.card_container} key={key + '-card'}>
                            <CardContent key={key + '-cardContent'}>
                              <div className="card" key={key+ '-cardDiv'}>                              
                                <div className="card_left" key={key+ '-cardDescription'} >{data.FavourDescription}</div>
                                <div className="btn" key={key + '-btnDiv'} >
                                <div className={classes.modal}>
                                  <FavourModal FavourTitle={data.FavourTitle} Requester={data.FavourRequestingUserId} FavourDescription={data.FavourDescription}  FavourDate={data.FavourDateStamp}/>
                                </div>
                                <div className={classes.button}>
                                  <Button key={key+ '-btn'}><FontAwesomeIcon key={key+ '-icon'} className={classes.trashIcon} icon={faTrash} /></Button>
                                </div>
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