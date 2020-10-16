import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";

const ProtectedRoute = ({ component: Component, user, ...rest}) => {
    const history = useHistory();
    return (
        <Route 
            {...rest} 
            render={ 
                props => {
                    console.log(user.token);                    
                    if (user.token!== null && user.token !== undefined) {
                       return <Component {...rest} {...props}/>
                    }                 
                }
            }/>
    )
}

export default ProtectedRoute;