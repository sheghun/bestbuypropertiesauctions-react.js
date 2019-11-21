import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import backgroundImage from '../assets/images/footerBackground.svg';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    container: {
        position: 'relative',
        overflow: 'hidden',
        height: '600px',
    },
    backgroundImage: {
        width: '110vw',
        bottom: '-9.5rem',
        position: 'absolute',
        left: '-1.5rem',
        zIndex: -1,
    },
    textHeaders: {
        color: 'white',
        fontWeight: 500,
        textAlign: 'center',
    },
    grids: {
        padding: '0 4rem 8rem',
    },
    input: {
        color: 'white !important',
        backgroundColor: theme.palette.secondary.light,
    },
    links: {
        color: '#e3e3e3',
        cursor: 'pointer',
        fontWeight: 500,
    },
    [theme.breakpoints.down('lg')]: {
        grids: {
            paddingBottom: '2rem',
        },
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <>
            <Grid container className={classes.container} alignItems={'flex-end'}>
                <img
                    alt={'header background for design'}
                    src={backgroundImage}
                    className={classes.backgroundImage}
                />
                <Grid item xs={12}>
                    <Grid container alignItems={'flex-start'}>
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
