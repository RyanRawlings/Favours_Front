import React, { useState,Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AllIOUList from "./views/AllIOUList/index";
import DebitIOUList from "./views/DebitIOUList/index";
import CreditIOUList from "./views/CreditIOUList/index";
import Profile from "./views/Profile/index";
import PublicRequest from "./views/PublicRequest/index";
import Leaderboard from "./views/Leaderboard/index";
import Signup from "./views/Signup/index";
import Login from "./views/Login/index";
import Testing from "./components/navMenu/index";
import UserContext from "./context/UserContext";
import Settings from './views/Settings/index';

// const PublicRequest = () => import("./App");
// const NavMenu = () => import("./components/NavMenu/index");
// const CreditIOUList = () => import("./views/CreditIOUList/index");
// const Profile = () => import("./views/Profile/index");

const Routes = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  return (
    // <Suspense fallback={<div>loading</div>}>    
    <BrowserRouter>      
    <UserContext.Provider value={{userData, setUserData}}>
      <Switch>
        //Unauthenticated Routes
        <Route exact path="/" component={PublicRequest}>
          <Redirect to={"/public_request"}/> 
        </Route>        
        <Route path="/signup" component={Signup}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/public_request" component={PublicRequest}/>
        
        //Authenticated Routes
        <Route path="/profile" component={Profile}></Route>
        <Route exact path="/all_list" component={AllIOUList}></Route>
        <Route exact path="/all_list/debit_list" component={DebitIOUList}></Route>
        <Route exact path="/all_list/credit_list" component={CreditIOUList}></Route>        
        <Route path="/leaderboard" component={Leaderboard}></Route>
        <Route path="/settings" component={Settings}></Route>

        //Testing Routes
        <Route path="/testing" component={Testing}></Route>
      </Switch>
      </UserContext.Provider>
    </BrowserRouter>
    // </Suspense>
  );
};

export default Routes;
