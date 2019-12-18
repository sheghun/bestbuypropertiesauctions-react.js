import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Header from '../Components/Header';
import Card from '../Components/Card';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Footer from '../Components/Footer';
import Pagination from 'material-ui-flat-pagination';
import queryString from 'query-string';
import {RouteComponentProps} from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100vw',
        padding: `${theme.spacing(4)}px ${theme.spacing(8)}px`,
        [theme.breakpoints.down('xs')]: {
            padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
        },
    },
    heading: {
        marginTop: '4rem',
    },
    paginationText: {
        fontSize: '18px',
    },
}));

const Shop = ({history, location}: RouteComponentProps) => {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);

    const [categories, setCategories] = useState([] as Array<Category>);
    const [category, setCategory] = useState(0);
    const [products, setProducts] = useState([] as Array<Product>);

    const [pageOffset, setPageOffset] = useState(0);
    const [limit] = useState(50);

    const [total, setTotal] = useState(1000);

    useEffect(() => {
        (async () => {
            const {status, data} = await axios.get('/categories');
            if (status === 200 && data.status === 'success') {
                setCategories(data.data);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const queryParam = queryString.parse(location.search);

            // Check if the page parameter exists
            const page = Number(queryParam.page ? queryParam.page : 1);
            const {category, search} = queryParam; // Get the category

            const params = {} as any; // Params to attach to url when sending requests to the back end

            if (category) {
                params.category = category;
                setCategory(category as any);
            } else {
                setCategory(0);
            }

            // Check if the users is searching
            if (search) {
                params.search = search;
            }

            params.limit = limit * page;

            setPageOffset(limit * (page - 1));

            const {status, data} = await axios.get('/products', {params});
            if (status === 200 && data.status === 'success') {
                setProducts(data.data);
            }
            setLoading(false);
        })();
    }, [location.search]);

    const paginate = (offset: number, page: number) => {
        const queryParam = queryString.parse(location.search);
        queryParam.page = page as any;
        history.push(`/shop?${queryString.stringify(queryParam)}`);
    };

    const changeCategory = (e: any) => {
        const queryParam = queryString.parse(location.search);
        queryParam.category = e.target.value as any;
        if ((queryParam.category as any) == 0) {
            delete queryParam.category;
        }
        history.push(`/shop?${queryString.stringify(queryParam)}`);
    };

    return (
        <>
            <main className={classes.root}>
                <Header />
                <Grid
                    container
                    justify={'center'}
                    style={{marginTop: '2rem', marginBottom: '4rem'}}
                >
                    <Grid xs={12} sm={6} md={4}>
                        <Select
                            fullWidth
                            value={category}
                            variant={'outlined'}
                            onChange={changeCategory}
                        >
                            <MenuItem value={0}>Select a Category</MenuItem>
                            {categories.map(category => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
                {loading ? (
                    <Grid container justify={'center'}>
                        <Grid item xs={12} container justify={'center'}>
                            <CircularProgress />
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container justify={'space-evenly'}>
                        {products.map(product => (
                            <Grid xs={12} key={product.id} sm={4} style={{marginBottom: '1rem'}}>
                                <Card
                                    title={product.name}
                                    description={product.description}
                                    price={product.price}
                                    image={product.featuredImage}
                                    buttonText={'View'}
                                    onClick={() => history.push(`/shop/item/${product.id}`)}
                                    id={product.id}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
                <Grid container justify={'center'} style={{marginTop: '4rem'}}>
                    <Pagination
                        limit={limit}
                        offset={pageOffset}
                        classes={{label: classes.paginationText}}
                        total={total}
                        size={'large'}
                        onClick={(e, offset, page) => paginate(offset, page)}
                    />
                </Grid>
            </main>
            <Footer />
        </>
    );
};

export default Shop;
