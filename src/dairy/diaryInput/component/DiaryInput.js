import React, {Component} from "react";
import {withStyles, withTheme} from "@material-ui/styles";
import MUIRichTextEditor from 'mui-rte';
import SaveIcon from '@material-ui/icons/Save';
import TitleIcon from '@material-ui/icons/Title';
import {convertToRaw, EditorState} from 'draft-js'
import clsx from "clsx";
import {FormattedMessage} from "react-intl"
import {Fab, Zoom} from "@material-ui/core";
import compose from "../../../misc/compose";
import withSnackbar from "../../../snackbar/provider/withSnackbar";
import {isMobile} from "react-device-detect";

const styles = (theme) => ({
    root: {
        maxHeight: '100%'
    },
    disabled: {
        pointerEvents: 'none',
        opacity: 0.5
    },
    fabs: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    fab: {
        marginLeft: theme.spacing(1)
    }
});


class DiaryInput extends Component {

    currentState = null;
    state = {
        toolbarIsVisible: !isMobile
    }

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

    handleToggleToolbar = () => {
        this.setState({toolbarIsVisible: !this.state.toolbarIsVisible})
    };

    render() {
        const {classes, value, isLoading, theme, onSave, disabled} = this.props;
        const {toolbarIsVisible} = this.state;
        const transitionDuration = {
            enter: theme.transitions.duration.enteringScreen,
            exit: theme.transitions.duration.leavingScreen,
        };
        return (
            <div className={clsx(classes.root, disabled && classes.disabled)}>
                <MUIRichTextEditor
                    defaultValue={value || this.createEmptyState()}
                    label={isLoading ? <FormattedMessage id={'diary.input.loading'}/> :
                        <FormattedMessage id={'diary.input.placeholder'}/>}
                    toolbar={toolbarIsVisible}
                    inlineToolbar={true}
                    onSave={onSave}
                    onChange={this.handleChange}
                />
                <Zoom
                    in={true}
                    timeout={transitionDuration}
                    unmountOnExit
                >
                    <div className={classes.fabs}>
                        {isMobile && <Fab
                            className={classes.fab}
                            aria-label='Enable/Disable TextBar'
                            color={toolbarIsVisible ? 'primary' : 'inherit'}
                            onClick={this.handleToggleToolbar}>
                            <TitleIcon/>
                        </Fab>}
                        <Fab
                            className={classes.fab}
                            aria-label='Save'
                            color='primary'
                            onClick={this.handleSave}>
                            <SaveIcon/>
                        </Fab>
                    </div>
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
