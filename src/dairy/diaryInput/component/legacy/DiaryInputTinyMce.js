import React, {Component} from "react";
import {withStyles} from "@material-ui/styles";
import {Editor} from "@tinymce/tinymce-react";

const styles = (theme) => ({});

class DiaryInput extends Component {

    render() {
        const {classes, value, onChange} = this.props;
        return (
            <div className={classes.root}>
                <Editor
                    initialValue="<p>This is the initial content of the editor</p>"
                    value={value}
                    init={{
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                    }}
                    onEditorChange={onChange}
                />
            </div>
        );
    }
}

export default withStyles(styles)(DiaryInput);
