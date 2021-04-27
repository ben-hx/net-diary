import React, {Component} from 'react';
import {ThemeProvider as MuiThemProvider} from '@material-ui/styles';
import UglyTheme from '../model/uglyTheme/UglyTheme';
import CssBaseline from "@material-ui/core/CssBaseline";

const withTheme = (WrappedComponent) => {
    class ThemeProvider extends Component {

        getCurrentTheme() {
            return UglyTheme;
        }

        render() {
            return (
                <MuiThemProvider theme={this.getCurrentTheme()}>
                    <CssBaseline/>
                    <WrappedComponent {...this.props} />
                </MuiThemProvider>
            );
        }
    }

    return ThemeProvider;
};

export default withTheme;
