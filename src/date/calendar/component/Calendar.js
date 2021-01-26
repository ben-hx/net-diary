import React, {Component} from "react";
import {DatePicker} from "@material-ui/pickers";
import {withStyles} from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import TodayIcon from "@material-ui/icons/Today";
import DateUtils from "../../utils/DateUtils";

const styles = (theme) => ({
    quickSelectContainer: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
});

const YesterdayButton = (props) => (
    <Button {...props} startIcon={<NavigateBeforeIcon/>}>
        Yesterday
    </Button>
);

const TodayButton = (props) => (
    <Button {...props} startIcon={<TodayIcon/>}>
        Today
    </Button>
);

const TomorrowButton = (props) => (
    <Button {...props} endIcon={<NavigateNextIcon/>}>
        Tomorrow
    </Button>
);

class Calendar extends Component {

    render() {
        const {classes, value, onChange} = this.props;
        return (
            <React.Fragment>
                <DatePicker
                    autoOk
                    orientation="portrait"
                    variant="static"
                    openTo="date"
                    value={value}
                    onChange={(value) => onChange(new Date(value))}
                />
                <div className={classes.quickSelectContainer}>
                    <YesterdayButton disabled={DateUtils.isYesterday(value)}
                                     onClick={() => onChange(DateUtils.yesterday())}/>
                    <TodayButton disabled={DateUtils.isToday(value)}
                                 onClick={() => onChange(DateUtils.today())}/>
                    <TomorrowButton disabled={DateUtils.isTomorrow(value)}
                                    onClick={() => onChange(DateUtils.tomorrow())}/>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Calendar);
