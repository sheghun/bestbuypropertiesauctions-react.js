import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Header from '../Components/Header';

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: '100vw',
    },
}));

const Home = () => {
    const classes = useStyles();
    useEffect(() => {
        const string = ['BEST', 'BUY', 'PROPERTIES', 'AUCTIONS'];
        let i = string.length - 1;
        setInterval(() => {
            i = i == string.length ? 0 : i;
            document.title = string[i];
            i++;
        }, 1000);
    }, []);
    return (
        <main className={classes.root}>
            <Header />
        </main>
    );
};

export default Home;
