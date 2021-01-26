import React, {Component} from "react";
import {withStyles} from "@material-ui/styles";
import {TextField} from "@material-ui/core";

const styles = (theme) => ({});

class DiaryInput extends Component {

    render() {
        const {classes, value, onChange} = this.props;
        return (
            <div className={classes.root}>
                <TextField
                    multiline
                    rows={4}
                    variant="standard"
                    value={value}
                    onChange={onChange}
                />
            </div>
        );
    }
}

export default withStyles(styles)(DiaryInput);
