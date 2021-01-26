import React, {Component} from "react";
import {withStyles} from "@material-ui/styles";

const styles = (theme) => ({});

class RawComponent extends Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>

            </div>
        );
    }
}

export default withStyles(styles)(RawComponent);
