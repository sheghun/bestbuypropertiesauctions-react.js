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
import queryString from 'query-string';
import Pagination from 'material-ui-flat-pagination/lib/Pagination';

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
    paginationText: {
        fontSize: '18px',
    },
}));

const Overview = ({history, location}: RouteComponentProps) => {
    const classes = useStyles();
    const {products, categories, setProducts} = useContext(AdminContext);

    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState('');
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    const [pageOffset, setPageOffset] = useState(0);
    const [limit] = useState(50);
    const [total, setTotal] = useState(1000);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const queryParam = queryString.parse(location.search);

            // Check if the page parameter exists
            const page = Number(queryParam.page ? queryParam.page : 1);
            const {category, search, sortBy} = queryParam; // Get the category

            const params = {} as any; // Params to attach to url when sending requests to the back end

            if (category) {
                params.category = category;
                setCategory(category as any);
            } else {
                setCategory('');
            }

            // Check if the user is searching
            if (search) {
                params.search = search;
                setSearch(search as any);
            }

            if (sortBy) {
                params.sortBy = sortBy;
                setSortBy(sortBy as string);
            } else {
                setSortBy('');
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

    const changeCategory = async (e: any) => {
        const queryParam = queryString.parse(location.search);
        queryParam.category = e.target.value as any;
        if ((queryParam.category as any) == 0) {
            delete queryParam.category;
        }
        history.push(`/admin/tl/overview?${queryString.stringify(queryParam)}`);
    };
    const changeSortBy = async (e: any) => {
        const queryParam = queryString.parse(location.search);
        queryParam.sortBy = e.target.value as any;
        if ((queryParam.sortBy as any) == 0) {
            delete queryParam.sortBy;
        }
        history.push(`/admin/tl/overview?${queryString.stringify(queryParam)}`);
    };
    const searchHandler = async (e: any) => {
        e.preventDefault();
        const queryParam = queryString.parse(location.search);
        queryParam.search = search;
        history.push(`/admin/tl/overview?${queryString.stringify(queryParam)}`);
    };

    const paginate = (offset: number, page: number) => {
        const queryParam = queryString.parse(location.search);
        queryParam.page = page as any;
        history.push(`/admin/tl/overview?${queryString.stringify(queryParam)}`);
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
                                onChange={changeSortBy}
                            >
                                <MenuItem value={0}>Select Sort By</MenuItem>
                                <MenuItem value={'createdAt'}>Date</MenuItem>
                                <MenuItem value={'name'}>Name</MenuItem>
                                <MenuItem value={'price'}>Price</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid
                        sm={6}
                        className={classes.searchInput}
                        component={'form'}
                        onSubmit={searchHandler}
                    >
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
                                onChange={changeCategory}
                            >
                                <MenuItem value={0}>Select A Category</MenuItem>
                                {categories.map(cat => (
                                    <MenuItem key={cat.id} value={cat.id}>
                                        {cat.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item xs={12} container spacing={3} style={{margin: '2rem'}}>
                    <Grid item xs={12} className={classes.productsHeading}>
                        <Typography variant={'h5'} align={'center'}>
                            Recent Products
                        </Typography>
                    </Grid>
                    {loading ? (
                        <Grid container justify={'center'}>
                            <Grid item xs={12} container justify={'center'}>
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
            </Grid>
        </>
    );
};

export default Overview;
