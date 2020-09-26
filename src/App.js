import React, { useEffect } from "react";
import { Router } from "react-router-dom";
import * as testAPI from "./api/TestAPI";
import Routes from "./Routes";
import { createBrowserHistory } from "history";
import CreditList from "./views/CreditList/index";

import "./App.css";
const App = () => {
  useEffect(() => {
    async function testFetch() {
      const test = await testAPI.test();
      console.log("testData+++++", test);
    }

    testFetch();
  }, []);
  return <CreditList />;
};

export default App;
