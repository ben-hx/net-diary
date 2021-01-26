import React, {Component} from 'react';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const withDateUtils = (WrappedComponent) => {
    class DateUtilProvider extends Component {

        render() {
            return (
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <WrappedComponent {...this.props} />
                </MuiPickersUtilsProvider>
            );
        }
    }

    return DateUtilProvider;
};

export default withDateUtils;
