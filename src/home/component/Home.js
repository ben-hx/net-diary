import React, {Component} from "react";
import clsx from 'clsx';
import {isMobile} from 'react-device-detect';
import {Link, Redirect} from "react-router-dom";
import {withStyles, withTheme} from "@material-ui/styles";
import {AppBar, Drawer} from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import SketchIcon from '@material-ui/icons/Note';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import withHome from "../provider/withHome";
import DateLabel from "../../date/label/component/DateLabel";
import Calendar from "../../date/calendar/component/Calendar";
import DateUtils from "../../date/utils/DateUtils";
import DiaryInput from "../../dairy/diaryInput/component/DiaryInput";
import withAuthentication from "../../authentication/provider/withAuthentication";
import {FormattedMessage} from "react-intl";
import compose from "../../misc/compose";
import Routes from "../../router/Routes";
import withSnackbar from "../../snackbar/provider/withSnackbar";

const drawerWidth = 400;

const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        zIndex: theme.zIndex.drawer + 1,
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    appBarTitle: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
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
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    mobileContent: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
});

const PreviousDayButton = (props) => (
    <IconButton {...props} color="inherit">
        <NavigateBeforeIcon fontSize="inherit"/>
    </IconButton>
);

const NextDayButton = (props) => (
    <IconButton {...props} color="inherit">
        <NavigateNextIcon fontSize="inherit"/>
    </IconButton>
);

const HOME_STATE = 'homeState2';

class Home extends Component {

    state = {...JSON.parse(localStorage.getItem(HOME_STATE)), entry: {}} || {
        isLoading: false,
        drawerIsOpen: true,
        entry: {}
    }

    componentDidMount() {
        const date = this.getDateFromPath();
        this.loadDate(date);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        localStorage.setItem(HOME_STATE, JSON.stringify(this.state));
    }

    getDateFromPath() {
        const {match} = this.props;
        return DateUtils.fromUrl(match.params.date) || DateUtils.today();
    }

    setDateInPath(date) {
        const dateParam = DateUtils.formatInternal(date);
        this.props.history.push(Routes.home.root + '/' + dateParam);
    }

    upsertEntry(value) {
        const {home} = this.props;
        this.applyLoading(true);
        return home.upsertEntry(value).then((data) => {
            this.setState({entry: data});
            this.openSuccessSnackbar();
        }).finally(() => {
            this.applyLoading(false);
        });
    }

    openSuccessSnackbar() {
        const {snackbar} = this.props;
        snackbar.open({
            severity: "success",
            message: <FormattedMessage id={'save.success'}/>
        });
    }

    loadDate(date) {
        /*
        To prevent fluttering in the Calendar we have to pass an
        entry with the current date
         */
        this.applyDummyEntry(date);
        this.applyLoading(true);
        return this.props.home.getEntryByDate(date).then((data) => {
            this.applyEntry(data);
        }).finally(() => {
            this.applyLoading(false);
        });
    }

    applyLoading = (value) => {
        this.setState({isLoading: value});
    };

    applyDummyEntry = (date) => {
        this.setState({entry: {date: date}});
    };

    applyEntry = (entry) => {
        this.setState({entry: entry});
    };

    handleEntryValueSave = (value) => {
        this.upsertEntry({...this.state.entry, value: value});
    }

    handleDateChange = (date) => {
        const hasChanged = DateUtils.formatInternal(date) !== DateUtils.formatInternal(this.state.entry.date);
        if (!hasChanged) {
            return;
        }
        this.loadDate(date);
        this.setDateInPath(date);
    }

    handleLogout = () => {
        return this.props.authentication.logout().then(() => {
            this.forceUpdate();
        });
    }

    handleDrawerOpen = () => {
        this.setState({drawerIsOpen: true});
    };

    handleDrawerClose = () => {
        this.setState({drawerIsOpen: false});
    };

    renderHeading() {
        const {drawerIsOpen, entry} = this.state;
        const {classes} = this.props;
        return (
            <Typography variant="h6" noWrap className={classes.appBarTitle}>
                {drawerIsOpen && <FormattedMessage id={'app.title'}/>}
                {!drawerIsOpen &&
                <React.Fragment>
                    <PreviousDayButton onClick={() => this.handleDateChange(DateUtils.addDays(entry.date, -1))}/>
                    <DateLabel date={entry.date}/>
                    <NextDayButton onClick={() => this.handleDateChange(DateUtils.addDays(entry.date, 1))}/>
                </React.Fragment>}
            </Typography>
        );
    }

    render() {
        const {classes, theme, authentication} = this.props;
        const {drawerIsOpen, entry} = this.state;

        if (!authentication.isAuthenticated()) {
            return <Redirect to={Routes.login.root}/>;
        }
        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: drawerIsOpen,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, drawerIsOpen && classes.hide)}
                        >
                            <CalendarTodayIcon/>
                        </IconButton>
                        {this.renderHeading()}
                        <IconButton
                            color="inherit"
                            aria-label="go to sketches"
                            component={Link} to={Routes.sketch.root}
                            edge="start"
                        >
                            <SketchIcon/>
                        </IconButton>
                        <IconButton
                            color="inherit"
                            aria-label="logout"
                            onClick={this.handleLogout}
                            edge="start"
                        >
                            <LogoutIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    open={drawerIsOpen}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}
                         onClick={this.handleDrawerClose}>
                        <IconButton>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                        </IconButton>
                    </div>
                    <Calendar value={entry.date} onChange={this.handleDateChange}/>
                </Drawer>
                <main
                    className={isMobile ? clsx(classes.mobileContent) : clsx(classes.content, {
                        [classes.contentShift]: drawerIsOpen,
                    })}
                >
                    <div className={classes.drawerHeader}/>
                    <DiaryInput value={entry.value || null}
                                onSave={this.handleEntryValueSave}/>
                </main>
            </div>
        );
    }
}

export default compose(
    withAuthentication,
    withHome,
    withTheme,
    withSnackbar,
    withStyles(styles)
)(Home);
