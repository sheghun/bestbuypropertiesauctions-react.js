// @flow
import * as React from 'react';
import {Route, RouteComponentProps} from 'react-router';
import loadable from '@loadable/component';
import LoadingPage from '../Components/LoadingPage';
import Sidebar from '../Components/Sidebar';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {AdminContext} from "../Context";

const Overview = loadable(() => import('../Views/Admin/Overview'), {fallback: <LoadingPage />});
const Products = loadable(() => import('../Views/Admin/Products'), {fallback: <LoadingPage />});

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

const Admin = ({location}: RouteComponentProps) => {
    const classes = useStyles();

    return (
        <>
            <Grid container>
                <Grid item style={{width: 250}}>
                    <Sidebar />
                </Grid>
                <Grid item md={9} sm={8} className={classes.pagesGrid}>
                    <Route path={'/admin/tl/overview'} component={Overview} />
                    <Route path={'/admin/tl/products'} component={Products} />
                </Grid>
            </Grid>
        </>
    );
};

export default Admin;
