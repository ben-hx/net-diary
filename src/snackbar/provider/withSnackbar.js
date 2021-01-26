import React, {Component} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import {IconButton} from "@material-ui/core";

const withSnackbar = (WrappedComponent) => {
    class SnackbarProvider extends Component {

        state = {
            open: false,
            message: null
        }

        handleClose = () => {
            this.setState({
                open: false,
                message: null
            });
        };

        handleOpen = (message) => {
            this.setState({
                open: true,
                message: message
            });
        };

        render() {
            const {open, message} = this.state;
            const wrappedProps = {
                ...this.props,
                snackbar: {
                    open: (message) => this.handleOpen(message),
                    close: () => this.handleClose()
                }
            }
            return (
                <React.Fragment>
                    <WrappedComponent {...wrappedProps} />
                    <Snackbar
                        autoHideDuration={6000}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={open}
                        onClose={this.handleClose}
                        message={message}
                        action={
                            <React.Fragment>
                                <IconButton size="small"
                                            aria-label="close"
                                            color="inherit"
                                            onClick={this.handleClose}>
                                    <CloseIcon fontSize="small"/>
                                </IconButton>
                            </React.Fragment>
                        }
                    />
                </React.Fragment>
            );
        }
    }

    return SnackbarProvider;
};

export default withSnackbar;
