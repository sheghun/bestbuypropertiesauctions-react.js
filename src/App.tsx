import React from 'react';
import theme from './theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/core/styles';
import {Route} from 'react-router-dom';
import Home from './Views/Home';
import About from './Views/About';
import Contact from './Views/Contact';
import Shop from './Views/Shop';
import loadable from '@loadable/component';
import LoadingPage from './Components/LoadingPage';

const Admin = loadable(() => import('./Layouts/Admin'), {fallback: <LoadingPage />});

const App: React.FC = () => {
    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <Route exact path={'/'} component={Home} />
                <Route exact path={'/about'} component={About} />
                <Route exact path={'/contact'} component={Contact} />
                <Route exact path={'/shop'} component={Shop} />
                <Route path={'/admin/tl/login'} component={Admin} />
            </ThemeProvider>
        </>
    );
};

export default App;
