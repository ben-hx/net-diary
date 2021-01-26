import React, {Component} from "react";
import {withStyles} from "@material-ui/styles";
import Moment from "react-moment";

const styles = (theme) => ({});

class DateLabel extends Component {

    render() {
        const {date} = this.props;
        return (
            <Moment date={date} format="ddd, ll" />
        );
    }
}

export default withStyles(styles)(DateLabel);
