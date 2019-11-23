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

    const [category, SetCategory] = useState(0);

    const [pageOffset, setPageOffset] = useState(0);
    const [limit, _] = useState(50);

    const [total, setTotal] = useState(1000);

    useEffect(() => {
        const queryParam = queryString.parse(location.search);
        // Check if the page parameter exists
        if (!queryParam.page) return;

        const page = Number(queryParam.page);

        setPageOffset(p => limit * (page -1));
    }, [location.search]);

    const paginate = (offset: number, page: number) => {
        history.push(`/shop?page=${page}`);
    };

    console.log(pageOffset);

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
                        <Select fullWidth value={category} variant={'outlined'}>
                            <MenuItem value={0}>Select a Category</MenuItem>
                            <MenuItem>Vehicles</MenuItem>
                            <MenuItem>Real Estates</MenuItem>
                            <MenuItem>Furniture</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Grid container justify={'space-evenly'}>
                    {(() => {
                        const products = [];
                        for (let i = 1; i <= 50; i++) {
                            products.push(
                                <Grid xs={12} sm={4} style={{marginBottom: '1rem'}}>
                                    <Card
                                        title={'Testing'}
                                        description={'Little details about the product'}
                                        id={i}
                                    />
                                </Grid>,
                            );
                        }
                        return products;
                    })()}
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
            </main>
            <Footer />
        </>
    );
};

export default Shop;
