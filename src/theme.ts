import {createMuiTheme} from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
    palette: {
        error: red,
        primary: {
            main: '#3e933a',
        },
        secondary: {
            main: '#808080',
        },
    },
    typography: {
        body1: {
            fontSize: '14px',
        },
        body2: {
            fontSize: '16px',
        },
        fontFamily: "'Montserrat', sans-serif",
    },
});

export default theme;
