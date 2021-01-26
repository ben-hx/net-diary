import React, {Component} from 'react';
import withAuthentication from "../../authentication/provider/withAuthentication";
import icon from './resources/loading.gif';
import {withStyles} from "@material-ui/styles";
import compose from "../../misc/compose";

const withAppLoading = (WrappedComponent) => {

    const styles = () => ({
        container: {
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            opacity: 1,
            transition: 'width 0.5s, height 0.5s, opacity 0.5s 0.5s',
        },
        invisible: {
            display: 'inline'
        },
        fadeOut: {
            opacity: 0,
            height: 0,
            transition: 'width 0.5s 0.5s, height 0.5s 0.5s, opacity 0.5s'
        }
    });

    class AppLoadingProvider extends Component {
        state = {
            isLoading: true
        }

        componentDidMount() {
            const {authentication} = this.props;
            this.startLoading();
            authentication.initialize().then(() => {
                this.finishLoading();
            });
        }

        startLoading = () => {
            this.setState({isLoading: true});
        };

        finishLoading = () => {
            this.setState({isLoading: false});
        };

        renderWhileLoading() {
            const {classes} = this.props;
            return (
                <div className={`${classes.container} ${this.state.isLoading ? null : classes.fadeOut}`}>
                    <img className={classes.icon} src={icon} alt="logo"/>
                </div>
            );
        }

        renderLoaded() {
            return <WrappedComponent {...this.props} />;
        }

        render() {
            return (
                <React.Fragment>
                    {this.renderWhileLoading()}
                    {!this.state.isLoading && this.renderLoaded()}
                </React.Fragment>
            );
        }
    }

    return compose(
        withAuthentication,
        withStyles(styles)
    )(AppLoadingProvider);
};

export default withAppLoading;
