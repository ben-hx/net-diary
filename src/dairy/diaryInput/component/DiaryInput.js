import React, {Component} from "react";
import {withStyles, withTheme} from "@material-ui/styles";
import MUIRichTextEditor from 'mui-rte';
import SaveIcon from '@material-ui/icons/Save';
import {convertToRaw, EditorState} from 'draft-js'
import clsx from "clsx";
import {FormattedMessage} from "react-intl"
import {Fab, Zoom} from "@material-ui/core";
import compose from "../../../misc/compose";
import withSnackbar from "../../../snackbar/provider/withSnackbar";

const styles = (theme) => ({
    root: {},
    disabled: {
        pointerEvents: 'none',
        opacity: 0.5
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
});


class DiaryInput extends Component {

    currentState = null;

    /*
    we have to pass a new instance of an empty state,
    to reset the internal defaultValue in the MUIRichTextEditor
     */
    createEmptyState() {
        return JSON.stringify(
            convertToRaw(EditorState.createEmpty().getCurrentContent())
        );
    }

    handleChange = (state) => {
        this.currentState = state;
    };

    handleSave = () => {
        const {onSave} = this.props;
        const convertedState = JSON.stringify(
            convertToRaw(this.currentState.getCurrentContent())
        );
        onSave(convertedState);
    };

    render() {
        const {classes, theme, value, disabled, onSave} = this.props;
        const transitionDuration = {
            enter: theme.transitions.duration.enteringScreen,
            exit: theme.transitions.duration.leavingScreen,
        };
        return (
            <div className={clsx(classes.root, disabled && classes.disabled)}>
                <MUIRichTextEditor
                    defaultValue={value || this.createEmptyState()}
                    label={<FormattedMessage id={'diary.input.placeholder'}/>}
                    inlineToolbar={true}
                    onSave={onSave}
                    onChange={this.handleChange}
                />
                <Zoom
                    in={true}
                    timeout={transitionDuration}
                    unmountOnExit
                >
                    <Fab
                        aria-label='Save'
                        className={classes.fab}
                        color='primary'
                        onClick={this.handleSave}>
                        <SaveIcon/>
                    </Fab>
                </Zoom>
            </div>
        );
    }
}

export default compose(
    withTheme,
    withSnackbar,
    withStyles(styles)
)(DiaryInput);
