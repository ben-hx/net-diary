import React from "react";
import {Redirect, Route} from 'react-router-dom';
import withAuthentication from "../../authentication/provider/withAuthentication";

const ProtectedRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => {
        return (
            rest.authentication.isAuthenticated() === true
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>
        );
    }
    }/>
)

export default withAuthentication(ProtectedRoute);
