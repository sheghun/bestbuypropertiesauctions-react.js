import React, {useContext, useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Logo from '../../Components/Logo';
import {Link, RouteComponentProps} from 'react-router-dom';
import Card from '../../Components/Card';
import {AdminContext} from '../../Context';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    gridWrapper: {
        padding: `${theme.spacing(2)}px 0`,
    },
    formControlLabel: {
        paddingLeft: theme.spacing(1),
    },
    gridHeader: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    searchInput: {
        padding: theme.spacing(2),
    },
    productsHeading: {
        padding: theme.spacing(4),
    },
}));

const Overview = ({history, location}: RouteComponentProps) => {
    const classes = useStyles();
    const {products, categories, setProducts} = useContext(AdminContext);

    const [productsArray, setProductsArray] = useState([] as Array<Product>);
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState('');
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    const filterProducts = () => {
        (async () => {
            setLoading(true);

            // Params to append to get from the backend
            const params = {} as any;
            if (sortBy) params.sortBy = sortBy;
            if (category) params.category = category;
            const {status, data} = await axios.get('/admin/products', {params});
            if (status === 200 && data.status === 'success') {
                setProducts(data.data);
            }
            setLoading(false);
        })();
    };

    useEffect(() => {
        filterProducts();
    }, [location.search, location.pathname]);

    const applyFilter = async () => {
        setLoading(true);
        // Get current url
        let url = location.pathname;
        if (sortBy) {
            url += `?sortBy=${sortBy}`;
        }
        if (category) {
            url += `&category=${category}`;
        }
        history.push(url);
    };

    return (
        <>
            <Grid container className={classes.gridWrapper}>
                <Grid item xs={12} container className={classes.gridHeader} alignItems={'center'}>
                    <Grid sm={4}>
                        <Logo />
                    </Grid>
                    <Grid sm={4}>
                        <Typography variant={'h6'} align={'center'}>
                            Admin Console
                        </Typography>
                    </Grid>
                    <Grid sm={4}>
                        <Link to={'/'}>
                            <Typography variant={'h6'} align={'center'}>
                                Home
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
                <Grid item xs={12} container spacing={2}>
                    <Grid sm={3}>
                        <FormControl fullWidth>
                            <InputLabel className={classes.formControlLabel} id={'sort-by-select'}>
                                Sort By
                            </InputLabel>
                            <Select
                                labelId={'sort-by-select'}
                                fullWidth
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value as string)}
                            >
                                <MenuItem value={'date'}>Date</MenuItem>
                                <MenuItem value={'name'}>Name</MenuItem>
                                <MenuItem value={'price'}>Price</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid sm={6} className={classes.searchInput}>
                        <TextField
                            fullWidth
                            name={'search'}
                            type={'text'}
                            placeholder={'Search for products'}
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </Grid>
                    <Grid sm={3}>
                        <FormControl fullWidth>
                            <InputLabel
                                className={classes.formControlLabel}
                                id={'filter-items-select'}
                            >
                                Category
                            </InputLabel>
                            <Select
                                labelId={'filter-items-select'}
                                fullWidth
                                value={category}
                                onChange={e => setCategory(e.target.value as string)}
                            >
                                {categories.map(cat => (
                                    <MenuItem key={cat.id} value={cat.id}>
                                        {cat.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                {(sortBy || category) && (
                    <Grid item xs={12} container justify={'center'} style={{margin: '3rem'}}>
                        <Button variant={'contained'} color={'primary'} onClick={applyFilter}>
                            Apply Filters
                        </Button>
                    </Grid>
                )}
                <Grid item xs={12} container spacing={3} style={{margin: '2rem'}}>
                    <Grid item xs={12} className={classes.productsHeading}>
                        <Typography variant={'h5'} align={'center'}>
                            Recent Products
                        </Typography>
                    </Grid>
                    {loading ? (
                        <Grid item xs={12} container justify={'center'}>
                            <Grid>
                                <CircularProgress />
                            </Grid>
                        </Grid>
                    ) : (
                        products.map(product => (
                            <Grid key={product.id} item sm={4}>
                                <Card
                                    title={product.name}
                                    description={product.description}
                                    id={1}
                                    price={product.price}
                                    image={product.featuredImage}
                                    onClick={() =>
                                        history.push(`/admin/tl/products/edit/${product.id}`)
                                    }
                                    buttonText={'Edit'}
                                />
                            </Grid>
                        ))
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default Overview;
