import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import withRoutes from "../provider/withRoutes";
import withEnvironment from "../../environment/provider/withEnvironment";
import compose from "../../misc/compose";

class Router extends Component {

    render() {
        const {environment, routes} = this.props;
        return (
            <BrowserRouter basename={environment.getPublicUrl()}>
                <Switch>
                    <Route exact path="/">
                        <Redirect to={routes.home.root}/>
                    </Route>
                    {Object.entries(routes).map(([routeName, routeValue]) => {
                        if (routeValue.isProtected) {
                            return <ProtectedRoute
                                key={routeName}
                                path={routeValue.path}
                                component={routeValue.component}
                            />
                        }
                        return <Route
                            key={routeName}
                            path={routeValue.path}
                            component={routeValue.component}
                        />
                    })}
                </Switch>
            </BrowserRouter>
        );
    }
}

export default compose(
    withEnvironment,
    withRoutes
)(Router);