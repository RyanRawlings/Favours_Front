import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./style.scss";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Button } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LocalActivityIcon from "@material-ui/icons/LocalActivity";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import NavMenu from '../../components/NavMenu/index';
import PageHeaderBar from '../../components/PageHeaderBar/index';
import index from '../../components/NavMenu/index';



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

export default function PublicRequest() {
  const classes = useStyles();
  const [tag, setTag] = useState(0);
  return (
    <div className={classes.root}>
      <div className="container">
        <NavMenu />            
        <div className="container_right">
          {/* <PageHeaderBar/> */}
          <Paper className={classes.container}>
            <div className="container_right_bottom">
              <div className="cards_container">
                <Card>
                  <CardContent>
                    <div className="card">
                      <div className="card_left">
                        <Avatar></Avatar>
                        <div className="card_description">
                          Jane is offering a coffee to runs some errands <FontAwesomeIcon icon={faCoffee} />
                        </div>
                      </div>
                      <div className="card_right">03/08/2020</div>
                      </div>
                  </CardContent>
                </Card>
                <br/>
                <Card>
                  <CardContent>
                    <div className="card">
                      <div className="card_left">
                        <Avatar></Avatar>
                        <div className="card_description">
                          Jeff is offering a pizza, to help move some furniture to the street <FontAwesomeIcon icon={faPizzaSlice} />
                        </div>
                      </div>
                      <div className="card_right">03/08/2020</div>
                      </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}
