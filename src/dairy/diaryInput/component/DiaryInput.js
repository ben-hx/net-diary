import React, {Component} from "react";
import {FormattedMessage} from "react-intl";
import {withStyles} from "@material-ui/styles";
import MUIRichTextEditor from 'mui-rte';
import {EditorState, convertToRaw} from 'draft-js'
import clsx from "clsx";

const styles = (theme) => ({
    root: {},
    disabled: {
        pointerEvents: 'none',
        opacity: 0.5
    }
});

class DiaryInput extends Component {

    /*
    we have to pass a new instance of an empty state,
    to reset the internal defaultValue in the MUIRichTextEditor
     */
    createEmptyState() {
        return JSON.stringify(
            convertToRaw(EditorState.createEmpty().getCurrentContent())
        );
    }

    render() {
        const {classes, value, disabled, onSave} = this.props;
        return (
            <div className={clsx(classes.root, disabled && classes.disabled)}>
                <MUIRichTextEditor
                    defaultValue={value || this.createEmptyState()}
                    label=<FormattedMessage id={'diary.input.placeholder'}/>
                inlineToolbar={true}
                onSave={onSave}
                />
            </div>
        );
    }
}

export default withStyles(styles)(DiaryInput);
