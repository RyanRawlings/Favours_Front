import React, { useState, useEffect, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import AccountBox from "@material-ui/icons/AccountBox";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import HeroImage from "../../assets/images/uts-hero-image.png";
import * as APIServices from "../../api/TestAPI";
import Cookie from "js-cookie";
import NavMenu from "../../components/navMenu/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Container from "@material-ui/core/Container";
import UserContext from "../../context/UserContext";
import './RecordFavour.css';


const RecordFavourForm = () => {
    const [favourtype, setFavourType] = useState('');
    const [debtor, setDebtor] = useState('');
    const [creditor, setCreditor] = useState('');
    const [favourstatus, setFavourStatus] = useState('');

    return (
        <form>
        <div className="record-favour-form">
            <input className="record-favour-type" 
                type = "text" 
                placeholder="Select your favour type here" 
                value = {favourtype}
                onChange={e => setFavourType(e.target.value)} 
            />
            <input className="record-debtor-firstname" 
                type = "text" 
                placeholder="Type in your debtor name here" 
                value = {debtor}
                onChange={e => setDebtor(e.target.value)} 
            />
            <input className="record-creditor-name" 
                type = "text" 
                placeholder="Type in your creditor name here" 
                value = {creditor}
                onChange={e => setCreditor(e.target.value)} 
            />
            <input className="record-favour-status" 
                type = "text" 
                placeholder="Select your record status" 
                value = {favourstatus}
                onChange={e => setFavourStatus(e.target.value)} 
            />
            <button className="new-favour-button">Record New Favour</button>
        </div>
        </form>
    );
};

export default RecordFavourForm;



