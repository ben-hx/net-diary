import React, {Component} from 'react';
import {withStyles} from '@material-ui/styles';
import {Redirect} from 'react-router-dom';
import withAuthentication from "../../provider/withAuthentication";
import compose from "../../../misc/compose";
import LoginForm from "./LoginForm";
import Routes from "../../../router/Routes";

const styles = (theme) => ({
    root: {
        height: '100vh',
        backgroundColor: theme.palette.secondary.main,
    },
});

class Login extends Component {

    state = {
        error: null
    }

    clearError() {
        this.applyError(null);
    }

    applyError(error) {
        this.setState({error})
    }

    handleLogin = (loginDto) => {
        this.clearError();
        this.props.authentication.login(loginDto.username, loginDto.password).then(() => {
            this.forceUpdate();
        }).catch(e => {
            this.applyError(e);
        });
    };

    render() {
        const {from} = this.props.location.state || {from: {pathname: Routes.home.root}}
        const {authentication} = this.props;
        const {error} = this.state;

        if (authentication.isAuthenticated()) {
            return <Redirect to={from}/>;
        }
        return <LoginForm error={error} onSubmit={this.handleLogin}/>
    }
}

export default compose(
    withAuthentication,
    withStyles(styles)
)(Login);

