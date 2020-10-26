import React, { useState, Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AllIOUList from "./views/AllIOUList/index";
import DebitIOUList from "./views/DebitIOUList/index";
import CreditIOUList from "./views/CreditIOUList/index";
import Profile from "./views/Profile/index";
import PublicRequest from "./views/PublicRequest/index";
import Leaderboard from "./views/Leaderboard/index";
import Signup from "./views/Signup/index";
import Login from "./views/Login/index";
import HomePage from "./views/Home/homePage";
import Testing from "./components/navMenu/index";
import UserContext from "./context/UserContext";
import Settings from "./views/Settings/index";
import Cookies from "js-cookie";
import JWTDecode from "jwt-decode";
import ProtectedRoute from "./components/protectedRoute/index";
import RecordFavour from "./views/RecordFavour/RecordFavour";
import RepayFavour from "./views/RepayFavour/RepayFavour";
import RepaySelectedFavour from "./views/RepayFavour/RepaySelectedFavours";

// const PublicRequest = () => import("./App");
// const NavMenu = () => import("./components/NavMenu/index");
// const CreditIOUList = () => import("./views/CreditIOUList/index");
// const Profile = () => import("./views/Profile/index");

const Routes = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let authToken = Cookies.get("auth-token");
      // console.log(authToken);
      if (authToken === undefined || authToken === '') {
        Cookies.remove('auth-token');
      } else {
        const userAttributes = JWTDecode(authToken);
        setUserData({
          token: authToken,
          user: {
            _id: userAttributes._id,
            firstname: userAttributes.firstname,
            lastname: userAttributes.lastname,
            email: userAttributes.email,
            // activeGroupId: userAttributes.group[0]
          }
        })              
      }
    }
    
    checkLoggedIn();
  }, []);

  return (
    // <Suspense fallback={<div>loading</div>}>
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Switch>
          {/* //Unauthenticated Routes */}
          <Route exact path="/" component={PublicRequest}>
            <Redirect to={"/home"} />
          </Route>
          <Route path="/home" component={HomePage}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/login" component={Login}></Route>
          <Route
            path="/public_request"
            render={props => {
              props["user"] = userData;
              return <PublicRequest {...props}></PublicRequest>;
            }}
          />
          <Route path="/record_favour" component={RecordFavour} />
          <ProtectedRoute 
            exact
            path="/repay_favour" 
            user={userData} 
            component={RepayFavour} 
          />
          <ProtectedRoute 
            exact
            path="/repay_selected_favours" 
            user={userData} 
            component={RepaySelectedFavour} 
          />
          {/* //Authenticated Routes */}
          <ProtectedRoute
            exact
            path="/profile"
            user={userData}
            component={Profile}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/all_list"
            user={userData}
            component={AllIOUList}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/recordfavour"
            user={userData}
            component={RecordFavour}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/payfavour"
            user={userData}
            component={RepayFavour}
          ></ProtectedRoute>
          <Route
            exact
            path="/all_list/debit_list"
            user={userData}
            component={DebitIOUList}
          ></Route>
          <Route
            exact
            path="/all_list/credit_list"
            user={userData}
            component={CreditIOUList}
          ></Route>
          <Route path="/leaderboard" component={Leaderboard}></Route>
          <ProtectedRoute
            path="/settings"
            user={userData}
            component={Settings}
          ></ProtectedRoute>
          {/* //Testing Routes */}
          <ProtectedRoute
            path="/testing"
            user={userData}
            component={Testing}
          ></ProtectedRoute>
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
    // </Suspense>
  );
};

export default Routes;
