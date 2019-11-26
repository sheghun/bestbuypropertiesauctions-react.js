// @flow
import * as React from 'react';
import {Route, RouteComponentProps} from 'react-router';
import loadable from '@loadable/component';
import LoadingPage from '../Components/LoadingPage';
import Sidebar from '../Components/Sidebar';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';

const Login = loadable(() => import('../Views/Admin/Login'), {fallback: <LoadingPage />});
const Overview = loadable(() => import('../Views/Admin/Overview'), {fallback: <LoadingPage />});

const useStyles = makeStyles(() => ({
    '@global': {
        body: {
            backgroundColor: 'white',
        },
    },
    pagesGrid: {
        backgroundColor: 'white',
        marginLeft: '2rem',
    },
}));

const Admin = ({match}: RouteComponentProps) => {
    const classes = useStyles();

    return (
        <>
            {match.url === '/admin/tl/login' ? (
                <Route component={Login} />
            ) : (
                <Grid container>
                    <Grid item style={{width: 250}}>
                        <Sidebar />
                    </Grid>
                    <Grid item md={9} sm={8} className={classes.pagesGrid}>
                        <Route path={'/admin/tl/overview'} component={Overview} />
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default Admin;
