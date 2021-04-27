import {createMuiTheme} from '@material-ui/core';
import "./UglyTheme.css"

const theme = createMuiTheme({
    typography: {
        fontFamily: "'Gaegu', cursive",
        h4: {
            fontFamily: "'Sedgwick Ave Display', cursive"
        },
        h6: {
            fontFamily: "'Sedgwick Ave Display', cursive"
        },
    },
    palette: {
        type: 'dark',
        primary: {
            main: '#bf000e',

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
