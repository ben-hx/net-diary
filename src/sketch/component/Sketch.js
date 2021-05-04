import React, {Component} from "react";
import clsx from 'clsx';
import {Link, Redirect} from "react-router-dom";
import {withStyles, withTheme} from "@material-ui/styles";
import {AppBar} from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import DiaryInput from "../../dairy/diaryInput/component/DiaryInput";
import withAuthentication from "../../authentication/provider/withAuthentication";
import {FormattedMessage} from "react-intl";
import compose from "../../misc/compose";
import withSketch from "../provider/withSketch";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Routes from "../../router/Routes";

const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    appBarTitle: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    headerSpace: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
});

const SKETCH_STATE = 'sketchState';

class Sketch extends Component {

    state = {...JSON.parse(localStorage.getItem(SKETCH_STATE)), entry: {}} || {
        isLoading: false,
        entry: {}
    }

    componentDidMount() {
        this.load();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        localStorage.setItem(SKETCH_STATE, JSON.stringify(this.state));
    }

    load() {
        this.applyLoading(true);
        return this.props.sketch.get().then((data) => {
            this.applyEntry(data);
        }).finally(() => {
            this.applyLoading(false);
        });
    }

    upsertEntry(value) {
        this.applyLoading(true);
        return this.props.sketch.upsert(value).then((data) => {
            this.setState({entry: data});
        }).finally(() => {
            this.applyLoading(false)
        });
    }

    applyLoading = (value) => {
        this.setState({isLoading: value});
    };

    applyEntry = (entry) => {
        this.setState({entry: entry});
    };

    handleEntryValueSave = (value) => {
        this.upsertEntry({...this.state.entry, value: value})
    }

    handleLogout = () => {
        return this.props.authentication.logout().then(() => {
            this.forceUpdate();
        });
    }

    render() {
        const {classes, authentication} = this.props;
        const {isLoading, entry} = this.state;

        if (!authentication.isAuthenticated()) {
            return <Redirect to={Routes.login.root}/>;
        }
        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar)}
                >
                    <Toolbar>
                        <Typography variant="h6" noWrap className={classes.appBarTitle}>
                            <FormattedMessage id={'app.title'}/>
                        </Typography>
                        <IconButton
                            color="inherit"
                            aria-label="go to sketches"
                            component={Link} to={Routes.home.root}
                            edge="start"
                        >
                            <CalendarTodayIcon/>
                        </IconButton>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleLogout}
                            edge="start"
                        >
                            <LogoutIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <main className={clsx(classes.content)}>
                    <div className={classes.headerSpace}/>
                    <DiaryInput value={entry.value || null}
                                disabled={isLoading}
                                onSave={this.handleEntryValueSave}/>
                </main>
            </div>
        );
    }
}

export default compose(
    withAuthentication,
    withSketch,
    withTheme,
    withStyles(styles)
)(Sketch);
