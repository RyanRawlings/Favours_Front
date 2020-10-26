import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import UnauthorisedAccess from "../../views/UnauthorisedAccess/index";

/*****************************************************************************************
* Summary: If the user is authenticated, a Component will be returned and rendered, if not
* nothing will be displayed.
*
* Code Attribution: 
*   Author: Tyler McGinnis
*   URL: https://ui.dev/react-router-v4-protected-routes-authentication/
******************************************************************************************/

const ProtectedRoute = ({ component: Component, user, ...rest}) => {
    const history = useHistory();
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