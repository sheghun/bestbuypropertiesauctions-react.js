import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Header from '../Components/Header';
import Card from '../Components/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Footer from '../Components/Footer';

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
}));

const Home = () => {
    const classes = useStyles();

    return (
        <>
            <main className={classes.root}>
                <Header />
                <Grid container spacing={4} justify={'center'}>
                    <Grid item xs={10} md={6}>
                        <Typography variant={'h5'} align={'center'} className={classes.heading}>
                            <b>About Us</b>
                        </Typography>
                        <br />
                        <br />
                        <Typography variant={'body2'} align={'center'}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                            voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
                            clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
                            amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                            sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                            rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                            ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
                            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                            dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                            est Lorem ipsum dolor sit amet.
                        </Typography>
                    </Grid>
                </Grid>
            </main>
            <Footer />
        </>
    );
};

export default Home;
