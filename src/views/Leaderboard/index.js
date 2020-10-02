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

export default function Leaderboard() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <div className="container">
        <NavMenu />
        <div className="container_right">
          <div className='leaderboard-title'><h2>Leaderboard for Company XYZ</h2></div>
          <div className='leaderboard-table'>
            <LeaderboardTable />      
          </div>
         </div>
      </div>
    </div>
  );
}
