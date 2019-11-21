import React from 'react';
import theme from './theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/core/styles';
import {Route} from 'react-router-dom';
import Home from './Views/Home';
import About from './Views/About';

const App: React.FC = () => {
    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <Route exact path={'/'} component={Home} />
                <Route exact path={'/about'} component={About} />
            </ThemeProvider>
        </>
    );
};

export default App;
