import React, {Component} from "react";
import {withStyles} from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import {Avatar, Box, Checkbox, CssBaseline, FormControlLabel, FormHelperText, Link, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {FormattedMessage} from "react-intl";

const styles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="">
                <FormattedMessage id={'app.title'}/>
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

class LoginForm extends Component {

    state = {
        username: '',
        password: ''
    }

    handleSubmit = (event) => {
        const {onSubmit} = this.props;
        const {username, password} = this.state;
        event.preventDefault();
        onSubmit({username, password});
    }

    render() {
        const {classes, error} = this.props;
        const {username, password} = this.state;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        <FormattedMessage id={'authentication.login'}/>
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label={<FormattedMessage id={'user.username'}/>}
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={username}
                            onChange={(event) => this.setState({username: event.currentTarget.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label={<FormattedMessage id={'user.password'}/>}
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => this.setState({password: event.currentTarget.value})}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label={<FormattedMessage id={'authentication.rememberMe'}/>}
                        />
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleSubmit}
                        >
                            <FormattedMessage id={'authentication.login'}/>
                        </Button>
                        {error && <FormHelperText>{error.message}</FormHelperText>}
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright/>
                </Box>
            </Container>
        );
    }
}

export default withStyles(styles)(LoginForm);
