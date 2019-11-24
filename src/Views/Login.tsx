import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Logo from '../Components/Logo';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100vw',
        height: '100vh',
        padding: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    homeLink: {
        position: 'absolute',
        right: '10rem',
        top: '20vh',
    },
}));

const Login = () => {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('submited');
    };

    return (
        <div className={classes.root}>
            <div className={classes.homeLink}>
                <Link to={'/'}>
                    <Typography variant={'h6'}>Home</Typography>
                </Link>
            </div>
            <Grid
                container
                alignItems={'center'}
                justify={'center'}
                component={'form'}
                onSubmit={submit}
            >
                <Grid item xs={12} container justify={'center'}>
                    <Logo />
                </Grid>
                <Grid item xs={12}>
                    <Typography align={'center'} variant={'h5'}>
                        <br />
                        Admin Login
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        fullWidth
                        name={'email'}
                        label={'Email'}
                        type={'email'}
                    />
                </Grid>
                <Grid item xs={12} />
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        required
                        fullWidth
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        name={'password'}
                        label={'Password'}
                        type={'password'}
                    />
                </Grid>
                <Grid item xs={12} />
                <Grid item xs={8} sm={3} style={{marginTop: '4rem'}}>
                    <Button fullWidth type={'submit'} color={'primary'} variant={'contained'}>
                        Login
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default Login;
