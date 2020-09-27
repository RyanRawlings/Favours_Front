import React, { useEffect } from "react";
import * as testAPI from "./api/TestAPI";
import Routes from "./Routes";
import { createBrowserHistory } from "history";


import "./App.css";
const App = () => {
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
