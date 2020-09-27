import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./style.scss";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Button } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faTrash } from '@fortawesome/free-solid-svg-icons';
import NavMenu from '../../components/NavMenu/index';
import PageHeaderBar from '../../components/PageHeaderBar/index';
import index from "../../components/NavMenu/index";
import { Link } from 'react-router-dom';
import IOUListButtonGroup from '../../components/IOUListButtonGroup/index';


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
  },
  listlinks: {  
    textDecoration: "none",
  },
}));

export default function AllIOUList() {
  const classes = useStyles();
  const [tag, setTag] = useState(0);
  return (
    <div className={classes.root}>
      <div className="container">
        <NavMenu />
        <div className="container_right">
          <Paper className={classes.container}>
            <div className="container_right_bottom">
                <IOUListButtonGroup className='iou_button_group'/>
              <div className="cards_container">
              <Card>
                  <CardContent>
                    <div className="card">
                      <div className="card_left">
                        <Avatar></Avatar>
                        <div className="card_description">
                          You owe Jeff a <FontAwesomeIcon icon={faCoffee} />
                        </div>
                      </div>
                      <div className="card_right">03/08/2020</div>
                      <div className="btn">
                        <Button><FontAwesomeIcon icon={faTrash} /></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <div className="card">
                      <div className="card_left">
                        <Avatar></Avatar>
                        <div className="card_description">
                          Jane owes you a <FontAwesomeIcon icon={faCoffee} />
                        </div>
                      </div>
                      <div className="card_right">03/08/2020</div>
                      <div className="btn">
                        <Button><FontAwesomeIcon icon={faTrash} /></Button>
                      </div>
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
