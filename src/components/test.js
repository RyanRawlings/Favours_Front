import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./style.scss";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faTrash } from '@fortawesome/free-solid-svg-icons';
import NavMenu from "../../components/navMenu/index";
import FavourListButtonGroup from "../../components/favourListButtonGroup/index";
import * as testAPI from "../../api/TestAPI";


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  container: {
    margin: "2px"
  },
  icons: {
    transform: "translateY(-0.1em)"
  }
}));

const fetchDebitIOUList = async () => {
  const result = await testAPI.debitIOUList().then(_=>_.json());
  return result;
}

export default function PartyRecommender() {
  const [favours, setFavours] = useState([]);
  
  useEffect(() => {
    async function fetchDebitIOUList() {
      const test = await testAPI.debitIOUList();
      console.log("testData+++++", test);
    }
    
    fetchDebitIOUList();
  }, []);
  // const [favours, setFavours] = useState([]);

  // useEffect(() => {
  //   async function loadDebitIOUList() {
  //   const debitIOUListToShow = await fetchDebitIOUList().then(extractData);
    
  //   const componentPromises = debitIOUListToShow.map(
  //     async data => {
  //       const List = await importList(data);
  //       return (
  //       <React.Fragment key={favour._id}>
  //       <Card key={favour._id}>
  //         <CardContent key={favour._id}>
  //           <div  className="card" key={favour._id}>
  //             <Avatar key={favour._id}></Avatar>
  //             <div className="card_description" key={favour._id} >{favour.favourDescription}</div>
  //             <div className="card_right" key={favour._id} >{favour.favourDateStamp}</div>
  //             <div className="btn" key={favour._id} >
  //               <Button key={favour._id}><FontAwesomeIcon key={favour._id} icon={faTrash} /></Button>
  //             </div>
  //           </div>
  //         </CardContent>
  //       </Card>
  //   </React.Fragment>);
    
  //       })      
  //   loadDebitIOUList(); 
  //   };
  //   fetchDebitIOUList();
  // }, []);

  const classes = useStyles();
  // // const [tag, setTag] = useState(0);

  // let itemsToRender;
  // if (data) {
  //   itemsToRender = data.map(favour => {
  //     <React.Fragment key={favour._id}>
  //       <Card key={favour._id}>
  //         <CardContent key={favour._id}>
  //           <div  className="card" key={favour._id}>
  //             <Avatar key={favour._id}></Avatar>
  //             <div className="card_description" key={favour._id} >{favour.favourDescription}</div>
  //             <div className="card_right" key={favour._id} >{favour.favourDateStamp}</div>
  //             <div className="btn" key={favour._id} >
  //               <Button key={favour._id}><FontAwesomeIcon key={favour._id} icon={faTrash} /></Button>
  //             </div>
  //           </div>
  //         </CardContent>
  //       </Card>
  //   </React.Fragment>
  //     })
  //   };
  
  return (
    <div className={classes.root}>
      <div className="container">
        <NavMenu />
        <div className="container_right">
          <Paper className={classes.container}>
            <div className="container_right_bottom">
            <FavourListButtonGroup />
              <div className="cards_container">                
              {/* {itemsToRender}      */}
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}
