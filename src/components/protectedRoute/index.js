import React from "react";
import { Route } from "react-router-dom";
import UnauthorisedAccess from "../../views/UnauthorisedAccess/index";

/*****************************************************************************************
* Summary: If the user is authenticated, a Component will be returned and rendered, if not
* unauthorised access page will be shown to the user.
*
* Code Attribution: 
*   Author: Tyler McGinnis
*   URL: https://ui.dev/react-router-v4-protected-routes-authentication/
******************************************************************************************/

const ProtectedRoute = ({ component: Component, user, ...rest}) => {
    return (
        <Route 
            {...rest} 
            render={ 
                props => {                  
                    if (user.token!== null && user.token !== undefined) {
                       return <Component {...rest} {...props}/>
                    } else {
                        return <UnauthorisedAccess />
                    }            
                }
            }/>
    )
}

export default ProtectedRoute;