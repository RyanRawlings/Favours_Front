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

export default function CreditList() {
  const classes = useStyles();
  const [tag, setTag] = useState(0);
  return (
    <div className={classes.root}>
      <div className="container">
        <Paper className={classes.container}>
          <div className="container_left">
            <div>
              <h2>Favours</h2>
            </div>
            <div className="drawer_item">
              <div className="drawer_item_icon">
                <EmojiPeopleIcon
                  className={classes.icons}
                  color="action"
                ></EmojiPeopleIcon>
              </div>
              <div className="drawer_item_words">Public Request</div>
            </div>
            <div className="drawer_item">
              <div className="drawer_item_icon">
                <ListAltIcon
                  className={classes.icons}
                  color="action"
                ></ListAltIcon>
              </div>
              <div className="drawer_item_words">IOU List</div>
            </div>
            <div className="drawer_item">
              <div className="drawer_item_icon">
                <AccountBoxIcon
                  className={classes.icons}
                  color="action"
                ></AccountBoxIcon>
              </div>
              <div className="drawer_item_words">Profile</div>
            </div>
            <div className="drawer_item">
              <div className="drawer_item_icon">
                <LocalActivityIcon
                  className={classes.icons}
                  color="action"
                ></LocalActivityIcon>
              </div>
              <div className="drawer_item_words">Leaderboard</div>
            </div>
          </div>
        </Paper>
        <div className="container_right">
          <Paper className={classes.container}>
            <div className="container_right_top">
              <div>
                <Button>> IOU LIST</Button>
              </div>
              <div>
                <Avatar>N</Avatar>
              </div>
            </div>
          </Paper>
          <Paper className={classes.container}>
            <div className="container_right_bottom">
              <div className="navbar">
                <ButtonGroup variant="text" size="small">
                  <Button>All</Button>
                  <Button>Debit</Button>
                  <Button>Credit</Button>
                </ButtonGroup>
              </div>
              <div className="cards_container">
                <Card>
                  <CardContent>
                    <div className="card">
                      <div className="card_left">
                        <Avatar></Avatar>
                        <div className="card_description">
                          Jane owed you COFFEE X1
                        </div>
                      </div>
                      <div className="card_right">03/08/2020</div>
                      <div className="btn">
                        <Button>Remove</Button>
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
