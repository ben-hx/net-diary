import React, { Component } from 'react';
import { ThemeProvider as MuiThemProvider } from '@material-ui/styles';
import StandardTheme from '../model/StandardTheme';
import CssBaseline from "@material-ui/core/CssBaseline";

const withTheme = (WrappedComponent) => {
    class ThemeProvider extends Component {

        getCurrentTheme() {
            return StandardTheme;
        }

        render() {
            return (
                <MuiThemProvider theme={this.getCurrentTheme()}>
                    <CssBaseline />
                    <WrappedComponent {...this.props} />
                </MuiThemProvider>
            );
        }
    }

    return ThemeProvider;
};

export default withTheme;
