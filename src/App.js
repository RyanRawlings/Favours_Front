import React, { useEffect, useState  } from "react";
import * as testAPI from "./api/TestAPI";
import Routes from "./Routes";
import { createBrowserHistory } from "history";
import "./App.css";
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import HomePage from './views/Home/homePage';
//import Auth from 'aws-amplify';
//import awsconfig from './aws-exports';
//import { withAuthenticator} from 'aws-amplify-react';
//Auth.configure(awsconfig);

const App = () => {
  
  // useEffect(() => {
  //   const checkLoggedIn = async () => {
  //     let token = localStorage.getItem('auth-token');
  //     if (token === null) {
  //       localStorage.setItem('auth-token', "");
  //       token = "";
  //     }
  //     const tokenRes = await

  //   }
  // })

  useEffect(() => {
    async function testFetch() {
      const test = await testAPI.test();
      console.log("testData+++++", test);
    }

    testFetch();
  }, []);

  return (
  <Routes />
  // <Profile />
  );
};

export default App;
//export default withAuthenticator(App, {includeGreetings: true});
