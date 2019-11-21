import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import backgroundImage from '../assets/images/sidebackground.svg';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import logo from '../assets/images/bestbuyproperties-default-logo.png';
import TextField from '@material-ui/core/TextField';
import {NavLink} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import twitter from '../assets/icons/twitter.svg';
import whatsapp from '../assets/icons/whatsapp.svg';
import facebook from '../assets/icons/facebook.svg';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    backgroundImage: {
        height: '900px',
        position: 'absolute',
        left: '-1.2rem',
        top: '-1.2rem',
        zIndex: -1,
        [theme.breakpoints.down('xs')]: {
            marginTop: '-3rem',
            width: '100vw',
        },
    },
    socials: {
        position: 'fixed',
        top: '30vh',
        right: '2rem',
        zIndex: 10,
        [theme.breakpoints.down('xs')]: {
            position: 'absolute',
            right: '1rem',
        },
    },
    logo: {
        height: '64px',
    },
    navLinks: {
        fontWeight: 500,
        color: 'black !important',
        fontSize: '18px',
        textAlign: 'center',
        transition: 'all .5s ease-in-out',
        '&:hover': {
            color: 'gray !important',
            borderBottom: 'solid 1px black',
        },
    },
    activeNavLink: {
        borderBottom: 'solid 1px black',
        color: 'gray',
    },
    heroText: {
        marginTop: '4rem',
        [theme.breakpoints.down('xs')]: {
            padding: `${theme.spacing(2)}px ${theme.spacing(6)}px`,
        },
    },
}));

const Header = () => {
    const classes = useStyles();

    return (
        <>
            <img
                alt={'header background for design'}
                src={backgroundImage}
                className={classes.backgroundImage}
            />
            <aside className={classes.socials}>
                <IconButton>
                    <img height={'32px'} src={whatsapp} alt={'Whatsapp link'} />
                </IconButton>
                <br />
                <IconButton>
                    <img height={'32px'} src={twitter} alt={'Twitter link'} />
                </IconButton>
                <br />
                <IconButton>
                    <img height={'32px'} src={facebook} alt={'Facebook link'} />
                </IconButton>
            </aside>

            <Hidden smDown={true}>
                <Grid container alignItems={'center'} justify={'space-between'}>
                    <Grid item md={3}>
                        <img
                            alt={'Bestbuy properties auctions logo'}
                            className={classes.logo}
                            src={logo}
                        />
                    </Grid>
                    <Grid item md={4} component={'form'} onSubmit={() => alert('submite')}>
                        <TextField fullWidth label={'Enter your search here'} />
                    </Grid>
                    <Grid item md={3}>
                        <Grid container>
                            <Grid item xs={3}>
                                <Typography variant={'h6'} className={classes.navLinks}>
                                    <NavLink to={'/'} exact activeClassName={classes.activeNavLink}>
                                        Home
                                    </NavLink>
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant={'h6'} className={classes.navLinks}>
                                    <NavLink to={'/shop'} activeClassName={classes.activeNavLink}>
                                        Shop
                                    </NavLink>
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant={'h6'} className={classes.navLinks}>
                                    <NavLink
                                        to={'/contact'}
                                        activeClassName={classes.activeNavLink}
                                    >
                                        Contact
                                    </NavLink>
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant={'h6'} className={classes.navLinks}>
                                    <NavLink to={'/about'} activeClassName={classes.activeNavLink}>
                                        About
                                    </NavLink>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Hidden>

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
        </>
    );
};

export default Header;
