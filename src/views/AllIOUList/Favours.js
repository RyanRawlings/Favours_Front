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
import NavMenu from "../../components/NavMenu/index";
import IOUListButtonGroup from "../../components/IOUListButtonGroup/index";
import * as testAPI from "../../api/TestAPI";
import styles from '../../index.css';
import LoadingGif from "../../assets/images/loading.gif";

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

const Favours = ({ favours, loading}) => {
    const classes = useStyles();

    if (loading) {
        return <div>
        <center>
            <img src={LoadingGif} width="100px" height="100px" alt="Loading..."/>
        </center>
    </div>;
    }

    return favours? favours.map((data, key) => 
              <Card className={classes.container} key={key + '-card'}>
                <CardContent key={key + '-cardContent'}>
                  <div className="card" key={key+ '-cardDiv'}>
                    <Avatar key={key+ '-avatar'}></Avatar>
                    <div className="card_left" key={key+ '-cardDescription'} >{data.FavourDescription}</div>
                    <div className="btn" key={key + '-btnDiv'} >
                      {data.FavourDateStamp}
                      <Button key={key+ '-btn'}><FontAwesomeIcon key={key+ '-icon'} icon={faTrash} /></Button>
                    </div>
                  </div>
                </CardContent>
              </Card>) : <div>
                    <center>
                        <img src={LoadingGif} width="100px" height="100px" alt="Loading..."/>
                    </center>
                </div>;                
    };

export default Favours;