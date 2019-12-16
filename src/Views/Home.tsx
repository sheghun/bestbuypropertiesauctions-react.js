import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Header from '../Components/Header';
import Card from '../Components/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FeaturedCards from '../Components/FeaturedCards';
import Footer from '../Components/Footer';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import {RouteComponentProps} from 'react-router';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100vw',
        padding: `${theme.spacing(4)}px ${theme.spacing(8)}px`,
        [theme.breakpoints.down('xs')]: {
            padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
        },
    },
    heroText: {
        marginTop: '4rem',
        [theme.breakpoints.down('xs')]: {
            padding: `${theme.spacing(2)}px ${theme.spacing(6)}px`,
        },
    },
    featuredProducts: {
        marginTop: '1rem',
    },
    featuredProductsText: {
        margin: '4rem 0 6rem',
    },
    topDeals: {
        marginTop: '4rem',
    },
    [theme.breakpoints.down('md')]: {
        featuredProducts: {
            justifyContent: 'center',
        },
        topDeals: {
            justifyContent: 'center',
        },
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
    },
}));

const products = [
    {
        title: 'Segun',
        description: `Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica`,
    },
    {
        title: 'Segun',
        description: `Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica`,
    },
    {
        title: 'Segun',
        description: `Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica`,
    },
];

const Home = ({history}: RouteComponentProps) => {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [featuredProducts, setFeaturedProducts] = useState([] as Array<Product>);
    const [topDealsProducts, setTopDealsProducts] = useState([] as Array<Product>);

    useEffect(() => {
        const string = ['BEST', 'BUY', 'PROPERTIES', 'AUCTIONS'];
        let i = string.length - 1;
        setInterval(() => {
            i = i == string.length ? 0 : i;
            document.title = string[i];
            i++;
        }, 1000);
    }, []);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const {status, data} = await axios.get('/products?featured=true');
            if (status === 200 && data.status === 'success') {
                setFeaturedProducts(data.data);
            }
            setLoading(false);
        })();
        (async () => {
            setLoading(true);
            const {status, data} = await axios.get('/products?topDeals=true');
            if (status === 200 && data.status === 'success') {
                setTopDealsProducts(data.data);
            }
            setLoading(false);
        })();
    }, []);
    return (
        <>
            <main className={classes.root}>
                <Header />
                <Grid container className={classes.heroText}>
                    <Grid item xs={12}>
                        <Typography variant={'h4'} align={'center'}>
                            Welcome To Bestbuy Properties Auctions
                            <br />
                            <Typography variant={'subtitle1'} align={'center'}>
                                Fast Auctions of moveable and immoveable properties of
                                <br />
                                all descriptions, tangible and intangible.
                            </Typography>
                            <br />
                            <br />
                        </Typography>
                    </Grid>
                </Grid>

                {loading ? (
                    <Grid container justify={'center'}>
                        <Grid item xs={12} container justify={'center'}>
                            <CircularProgress />
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container className={classes.featuredProducts}>
                        <Grid item xs={12} className={classes.featuredProductsText}>
                            <Typography variant={'h5'} align={'center'}>
                                Featured Products
                            </Typography>
                        </Grid>
                        {featuredProducts.map((product, i) => (
                            <Grid item key={i} xs={12} md={4}>
                                <FeaturedCards
                                    title={product.name}
                                    description={product.description}
                                    index={i}
                                    price={product.price}
                                    image={product.featuredImage}
                                    id={i}
                                    buttonText={'View'}
                                    onClick={() => history.push(`/shop/item/${product.id}`)}
                                />
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <br />
                            <br />
                            <Typography variant={'h6'}>Top Deals</Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid
                                container
                                justify={'space-between'}
                                spacing={3}
                                className={classes.topDeals}
                            >
                                {topDealsProducts.map((product, i) => (
                                    <Grid item key={i} md={4}>
                                        <Card
                                            title={product.name}
                                            description={product.description}
                                            buttonText={'View'}
                                            image={product.featuredImage}
                                            id={i}
                                            price={product.price}
                                            onClick={() => history.push(`/shop/item/${product.id}`)}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} style={{marginTop: '4rem'}}>
                            <Grid container justify={'center'}>
                                <Grid item xs={12}>
                                    <Typography variant={'body2'} align={'center'}>
                                        View More
                                    </Typography>
                                </Grid>
                                <br />
                                <br />
                                <Grid item xs={12}>
                                    <Typography align={'center'}>
                                        <Link to={'/shop'}>
                                            <Button variant={'contained'} color={'primary'}>
                                                Go To Shop
                                            </Button>
                                        </Link>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </main>
            <Footer />
        </>
    );
};

export default Home;
