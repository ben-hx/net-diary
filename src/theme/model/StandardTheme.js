import {createMuiTheme} from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#FBFAE9',
            contrastText: '#4D4D4D',
        },
        background: {
            default: "#303030"
        }
    },
    overrides: {
        MuiPickersBasePicker: {
            pickerView: {
                display: 'contents'
            }
        }
    },
});

export default theme;
