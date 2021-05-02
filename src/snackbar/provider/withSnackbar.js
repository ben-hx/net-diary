import React, {Component} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import {Alert} from "@material-ui/lab";

const withSnackbar = (WrappedComponent) => {
    class SnackbarProvider extends Component {

        state = {
            open: false,
            options: null
        }

        handleClose = () => {
            this.setState({
                open: false,
                options: null
            });
        };

        handleOpen = (options) => {
            this.setState({
                open: true,
                options: options
            });
        };

        render() {
            const {open, options} = this.state;
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
                    >
                        <Alert onClose={this.handleClose} severity={options?.severity}>
                            {options?.message}
                        </Alert>
                    </Snackbar>
                </React.Fragment>
            );
        }
    }

    return SnackbarProvider;
};

export default withSnackbar;
