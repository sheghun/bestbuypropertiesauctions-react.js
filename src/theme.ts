import {createMuiTheme} from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#3e933a',
            dark: '#2d3832',
        },
        secondary: {
            main: '#808080',
            dark: '#4d4d4d',
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
