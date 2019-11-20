import React from 'react';
import theme from './theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/core/styles';
import {Route} from 'react-router-dom';
import Home from './Views/Home';

const App: React.FC = () => {
    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <Route exact path={'/'} component={Home} />
            </ThemeProvider>
        </>
    );
};

export default App;
