import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import backgroundImage from '../assets/images/footerBackground.svg';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import backgroundMobile from '../assets/images/backgroundMobile.svg';

const useStyles = makeStyles(theme => ({
    container: {
        position: 'relative',
        overflow: 'hidden',
        height: '600px',
        [theme.breakpoints.down('sm')]: {
            marginTop: '2rem',
        },
    },
    linksContainer: {
        alignItems: 'flex-start',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    backgroundImage: {
        width: '110vw',
        bottom: '-9.5rem',
        position: 'absolute',
        left: '-1.5rem',
        zIndex: -1,
        [theme.breakpoints.down('sm')]: {
            width: '100vw',
            bottom: '0',
            left: 0,
            height: '400px',
        },
    },
    backgroundImage2Mobile: {
        width: '100vw',
        bottom: '250px',
        left: 0,
        height: '400px',
        position: 'absolute',
        zIndex: -1,
    },
    textHeaders: {
        color: 'white',
        fontWeight: 500,
        textAlign: 'center',
    },
    grids: {
        padding: '0 4rem 8rem',
        [theme.breakpoints.down('sm')]: {
            paddingBottom: '4rem',
        },
    },
    input: {
        color: 'white !important',
        backgroundColor: theme.palette.secondary.light,
        [theme.breakpoints.down('sm')]: {
            width: '110v%',
        },
    },
    links: {
        color: '#e3e3e3',
        cursor: 'pointer',
        fontWeight: 500,
    },
    mobileContainer: {
        position: 'relative',
    },
    mobileBackgroundImage: {
        position: 'absolute',
        height: '400px',
    },
    [theme.breakpoints.down('lg')]: {
        grids: {
            paddingBottom: '2rem',
        },
    },
}));

const Footer = () => {
    const classes = useStyles();

    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Grid container className={classes.container} alignItems={'flex-end'}>
                <img
                    alt={'header background for design'}
                    src={smallScreen ? backgroundMobile : backgroundImage}
                    className={classes.backgroundImage}
                />
                {smallScreen && (
                    <img
                        alt={'header background for design'}
                        src={backgroundMobile}
                        className={classes.backgroundImage2Mobile}
                    />
                )}
                <Grid item xs={12}>
                    <Grid container className={classes.linksContainer}>
                        <Grid item md={4} className={classes.grids} style={{textAlign: 'center'}}>
                            <Typography variant={'h6'} className={classes.textHeaders}>
                                <b>Subscribe For Updates</b>
                                <br />
                                <br />
                            </Typography>
                            <TextField
                                fullWidth
                                variant={'filled'}
                                className={classes.input}
                                label={'Enter Your Email Address'}
                                style={{color: 'white'}}
                            />
                            <Button
                                color={'primary'}
                                variant={'contained'}
                                style={{marginTop: '1rem'}}
                            >
                                Send
                            </Button>
                        </Grid>
                        <Grid item md={4} className={classes.grids}>
                            <Typography variant={'h6'} className={classes.textHeaders}>
                                <b>Locate Us</b>
                                <br />
                                <br />
                                <Typography variant={'body1'} style={{lineHeight: '1.8'}}>
                                    Suite 206 Niyi Oyinloye & Co,
                                    <br />
                                    Garachi plaza Opp Wuse Post Office
                                    <br />
                                    Zone 3, Abuja Nigeria.
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item md={4} className={classes.grids}>
                            <Typography variant={'h6'} className={classes.textHeaders}>
                                <b>Navigation</b>
                                <br />
                                <br />
                                <Typography variant={'body1'} style={{lineHeight: '1.8'}}>
                                    <Link to={'/'} className={classes.links}>
                                        Home
                                    </Link>
                                    <br />
                                    <Link to={'/contact'} className={classes.links}>
                                        Contact
                                    </Link>
                                    <br />
                                    <Link to={'/shop'} className={classes.links}>
                                        Shop
                                    </Link>
                                    <br />
                                    <Link to={'/about'} className={classes.links}>
                                        About
                                    </Link>
                                    <br />
                                </Typography>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Footer;
