import React, {useEffect, useRef, useState} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import backgroundImage from '../assets/images/sidebackground.svg';
import Grid from '@material-ui/core/Grid';
import logo from '../assets/images/bestbuyproperties-default-logo.png';
import TextField from '@material-ui/core/TextField';
import {NavLink, RouteComponentProps, withRouter} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import twitter from '../assets/icons/twitter.svg';
import whatsapp from '../assets/icons/whatsapp.svg';
import classNames from 'classnames';
import facebook from '../assets/icons/facebook.svg';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';

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
        [theme.breakpoints.down('sm')]: {
            marginTop: '2rem',
        },
    },
    navLinkContainer: {
        transition: 'all .5s ease-in-out',
    },
    mobileNavLinkEffect: {
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        zIndex: 1000,
    },
    activeNavLink: {
        borderBottom: 'solid 1px black',
        color: 'gray',
    },
}));

const Header = ({location}: RouteComponentProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [hangToTop, setHangToTop] = useState(false);
    const navLinkContainerEl = useRef();

    // Decided whether to hang the nav to the top
    // A work around so as not to use the hang state in useEffect
    // This function will get the latest current state
    const hangTop = (hang: boolean) => {
        console.log(hang);
        if (hang && hangToTop) {
            return;
        } else if (hang && !hangToTop) {
            setHangToTop(true);
        } else if (!hang && !hangToTop) {
            return;
        } else if (!hang && hangToTop) {
            setHangToTop(false);
        }
    };

    useEffect(() => {
        // @ts-ignore
        const navLinkOffset = navLinkContainerEl.current.offsetTop;
        window.onscroll = () => {
            const offset = window.pageYOffset;
            if (smallScreen) {
                if (
                    // @ts-ignore
                    offset > navLinkOffset ||
                    // @ts-ignore
                    offset === navLinkOffset
                ) {
                    hangTop(true);
                }
                console.log(offset);
                // @ts-ignore
                if (offset < navLinkOffset) {
                    setHangToTop(false);
                }
            }
        };
        return () => {
            window.onscroll = null;
        };
    }, [smallScreen, hangTop]);
    return (
        <>
            <img
                alt={'header background for design'}
                src={backgroundImage}
                className={classes.backgroundImage}
            />
            {location.pathname === '/' && (
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
            )}

            <Grid container alignItems={'center'} justify={'space-between'}>
                <Grid item md={3}>
                    <img
                        alt={'Bestbuy properties auctions logo'}
                        className={classes.logo}
                        src={logo}
                    />
                </Grid>
                <Grid item xs={12} md={4} component={'form'} onSubmit={() => alert('submit')}>
                    <TextField fullWidth label={'Search for a property'} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Grid
                        container
                        innerRef={navLinkContainerEl}
                        className={classNames({
                            [classes.navLinkContainer]: true,
                            [classes.mobileNavLinkEffect]: hangToTop,
                        })}
                    >
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
                                <NavLink to={'/contact'} activeClassName={classes.activeNavLink}>
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
        </>
    );
};

export default withRouter(Header);
