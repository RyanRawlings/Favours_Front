import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// const PublicRequest = () => import("./App");
const CreditList = () => import("./views/CreditList/index");

const Routes = () => {
  return (
    // <Suspense fallback={<div>loading</div>}>
    <Switch>
      {/* <Route exact path="/" component={PublicRequest} /> */}
      <Route path="/credit_list" component={CreditList}></Route>
    </Switch>
    // </Suspense>
  );
};

export default Routes;
