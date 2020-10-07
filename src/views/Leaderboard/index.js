import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./style.scss";
import LeaderboardTable from "./LeaderboardTable";
import NavMenu from '../../components/NavMenu/index';



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

export default function Leaderboard(props) {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <div className="container">
        <NavMenu props={props}/>
        <div className="container_right">
          <div className='leaderboard-title'><h2>Favours Leaderboard</h2></div>
          <div className='leaderboard-table'>
            <LeaderboardTable />      
          </div>
         </div>
      </div>
    </div>
  );
}

