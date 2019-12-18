// @flow
import * as React from 'react';
import {Route, RouteComponentProps} from 'react-router';
import loadable from '@loadable/component';
import LoadingPage from '../Components/LoadingPage';
import Sidebar from '../Components/Sidebar';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {AdminContext} from '../Context';
import {useEffect, useState} from 'react';
import axios from 'axios';

const Overview = loadable(() => import('../Views/Admin/Overview'), {fallback: <LoadingPage />});
const Products = loadable(() => import('../Views/Admin/Products'), {fallback: <LoadingPage />});
const Categories = loadable(() => import('../Views/Admin/Categories'), {fallback: <LoadingPage />});

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

const Admin = ({location, history}: RouteComponentProps) => {
    const classes = useStyles();

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([] as Array<Product>);

    useEffect(() => {
        axios.interceptors.response.use(
            res => Promise.resolve(res),
            err => {
                if (err.response) {
                    if (err.response.status === 403) {
                        history.push(
                            `/admin/tl/login?returnUrl=${
                                location.pathname
                            }&${location.search.replace('?', '')}`,
                        );
                    }
                }
                return Promise.reject(err);
            },
        );
    }, []);

    console.log(location);

    useEffect(() => {
        (async () => {
            try {
                const {status, data} = await axios.get('/admin/categories');
                if (status === 200 && data.status === 'success') {
                    setCategories(data.data);
                }
            } catch (e) {}
        })();
    }, []);

    return (
        <>
            <Grid container>
                <AdminContext.Provider value={{categories, products, setProducts, setCategories}}>
                    <Grid container>
                        <Grid item style={{width: 250}}>
                            <Sidebar />
                        </Grid>
                        <Grid item md={9} sm={8} className={classes.pagesGrid}>
                            <Route path={'/admin/tl/overview'} component={Overview} />
                            <Route path={'/admin/tl/categories'} component={Categories} />
                            <Route path={'/admin/tl/products/add'} component={Products} />
                            <Route path={'/admin/tl/products/edit/:id'} component={Products} />
                        </Grid>
                    </Grid>
                </AdminContext.Provider>
            </Grid>
        </>
    );
};

export default Admin;
