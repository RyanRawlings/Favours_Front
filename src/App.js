import React, { useEffect, useState  } from "react";
import * as testAPI from "./api/TestAPI";
import Routes from "./Routes";
import { createBrowserHistory } from "history";
import "./App.css";
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

const App = () => {
  return (
  <Routes />
  );
};

export default App;
