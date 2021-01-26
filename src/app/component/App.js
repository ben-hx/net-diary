import React, {Component} from "react";
import Router from "../../router/component/Router";
import withTheme from "../../theme/provider/withTheme";
import withLocalization from "../../localization/provider/withLocalization";
import withAppLoading from "../../appLoading/provider/withAppLoading";
import withDateUtils from "../../date/provider/withDateUtils";
import compose from "../../misc/compose";

class App extends Component {
    render() {
        return <Router/>;
    }
}

export default compose(
    withTheme,
    withLocalization,
    withDateUtils,
    withAppLoading,
)(App);