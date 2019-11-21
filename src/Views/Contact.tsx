import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Header from '../Components/Header';
import Card from '../Components/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Footer from '../Components/Footer';
import IconButton from '@material-ui/core/IconButton';
import whatsapp from '../assets/icons/whatsapp.svg';
import twitter from '../assets/icons/twitter.svg';
import facebook from '../assets/icons/facebook.svg';

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
                            <b>Contact Us</b>
                        </Typography>
                        <br />
                        <br />
                        <Typography variant={'body2'} align={'center'}>
                            Email
                            <br />
                            <br />
                            <b>sheghunoladiran9@gmail.com</b>
                            <br />
                            <br />
                            Phone
                            <br />
                            <br />
                            <b>080143112637 OR 09035647621</b>
                        </Typography>
                    </Grid>
                    <Grid container item xs={12} justify={'center'}>
                        <Grid>
                            <IconButton>
                                <img height={'32px'} src={whatsapp} alt={'Whatsapp link'} />
                            </IconButton>
                        </Grid>
                        <Grid>
                            <IconButton>
                                <img height={'32px'} src={twitter} alt={'Twitter link'} />
                            </IconButton>
                        </Grid>
                        <Grid>
                            <IconButton>
                                <img height={'32px'} src={facebook} alt={'Facebook link'} />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </main>
            <Footer />
        </>
    );
};

export default Home;
