import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ManageFavours from "./views/ManageFavours/index";
import Profile from "./views/Profile/index";
import PublicRequest from "./views/PublicRequest/index";
import Leaderboard from "./views/Leaderboard/index";
import Signup from "./views/Signup/index";
import Login from "./views/Login/index";
import HomePage from "./views/Home/index";
import UserContext from "./context/UserContext";
import Settings from "./views/Settings/index";
import Cookies from "js-cookie";
import JWTDecode from "jwt-decode";
import ProtectedRoute from "./components/protectedRoute/index";
import MultiRepay from "./views/MultiRepay/MultiRepay";
import RepaySelectedFavour from "./views/MultiRepay/RepaySelectedFavours";

/***************************************************************************************************
* Summary: Page routes available to the application. 
* Code Attribution: 
* - checkLoggedIn -> Devistry -> MERN stack user authentication (tutorial series)
* - URL: https://www.youtube.com/watch?v=sWfD20ortB4&list=PLJM1tXwlGdaf57oUx0rIqSW668Rpo_7oU&index=5
****************************************************************************************************/
const Routes = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  /**********************************************************************************
  * As the user logs in a jwt is returned by the server. This information is 
  * stored in the browser Cookies. The jwt is retrived from the Cookies, decoded
  * and then stored in the UserContext. Only run once as the page loads
  ***********************************************************************************/
  useEffect(() => {
    const checkLoggedIn = async () => {
      let authToken = Cookies.get("auth-token");
      if (authToken === undefined || authToken === "") {
        Cookies.remove("auth-token");
      } else {
        const userAttributes = JWTDecode(authToken);

        setUserData({
          token: authToken,
          user: {
            _id: userAttributes._id,
            firstname: userAttributes.firstname,
            lastname: userAttributes.lastname,
            email: userAttributes.email
          }
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Switch>
          {/* Unauthenticated Routes */}
          <Route exact path="/" component={PublicRequest}>
            <Redirect to={"/home"} />
          </Route>
          <Route path="/home" component={HomePage} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route
            path="/public_request"
            render={props => {
              props["user"] = userData;
              return <PublicRequest {...props}></PublicRequest>;
            }}
          />
          <Route path="/leaderboard" component={Leaderboard} />
          {/* Authenticated Routes */}
          <ProtectedRoute
            exact
            path="/multi_repay"
            user={userData}
            component={MultiRepay}
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
            path="/manage_favours"
            user={userData}
            component={ManageFavours}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/settings"
            user={userData}
            component={Settings}
          ></ProtectedRoute>
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
    // </Suspense>
  );
};

export default Routes;
