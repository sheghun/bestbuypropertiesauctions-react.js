import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Logo from '../../Components/Logo';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link, RouteComponentProps} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios, {AxiosError} from 'axios';
import Snackbar from '../../Components/Snackbar';

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

const Login = ({history}: RouteComponentProps) => {
    const classes = useStyles();

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        variant: 'success',
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const d = {email, password};
            const {status, data} = await axios.post('/admin/login', d);
            if (status === 200 && data.status === 'success') {
                setSnackbar({open: true, variant: 'success', message: 'Sign in Successful'});
                setTimeout(() => {
                    history.push('/admin/tl/overview');
                }, 3000);
            }
        } catch (e) {
            const {response} = e as AxiosError;
            if (response) {
                if (response.status === 401) {
                    setSnackbar({
                        open: true,
                        variant: 'error',
                        message: 'Email or Password incorrect',
                    });
                }
            }
        }
        setLoading(false);
    };

    return (
        <div className={classes.root}>
            <Snackbar
                variant={snackbar.variant as any}
                open={snackbar.open}
                message={snackbar.message}
                onClose={() => setSnackbar(s => ({...s, open: false}))}
            />
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
                    <Button
                        fullWidth
                        type={'submit'}
                        color={'primary'}
                        variant={'contained'}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress /> : 'Login'}
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default Login;
