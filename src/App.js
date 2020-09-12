import React, { useEffect } from "react";
import * as testAPI from "./api/TestAPI";
import "./App.css";

function App() {
  useEffect(() => {
    async function testFetch() {
      const test = await testAPI.test();
      console.log("testData+++++", test);
    }

    testFetch();
  }, []);
  return <div>test page</div>;
}

export default App;
