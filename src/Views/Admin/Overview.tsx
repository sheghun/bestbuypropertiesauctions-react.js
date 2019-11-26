import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Logo from '../../Components/Logo';
import {Link} from 'react-router-dom';
import Card from '../../Components/Card';

const useStyles = makeStyles(theme => ({
    gridWrapper: {
        padding: `${theme.spacing(2)}px 0`,
    },
    formControlLabel: {
        paddingLeft: theme.spacing(1),
    },
    gridHeader: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    searchInput: {
        padding: theme.spacing(2),
    },
    productsHeading: {
        padding: theme.spacing(4),
    },
}));

const Overview = () => {
    const classes = useStyles();

    const [sortBy, setSortBy] = useState('');
    const [search, setSearch] = useState('');

    return (
        <>
            <Grid container className={classes.gridWrapper}>
                <Grid item xs={12} container className={classes.gridHeader} alignItems={'center'}>
                    <Grid sm={4}>
                        <Logo />
                    </Grid>
                    <Grid sm={4}>
                        <Typography variant={'h6'} align={'center'}>
                            Admin Console
                        </Typography>
                    </Grid>
                    <Grid sm={4}>
                        <Link to={'/'}>
                            <Typography variant={'h6'} align={'center'}>
                                Home
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
                <Grid item xs={12} container spacing={2}>
                    <Grid sm={3}>
                        <FormControl fullWidth>
                            <InputLabel className={classes.formControlLabel} id={'sort-by-select'}>
                                Sort By
                            </InputLabel>
                            <Select labelId={'sort-by-select'} fullWidth value={sortBy}>
                                <MenuItem value={'date'}>Date</MenuItem>
                                <MenuItem value={'name'}>Name</MenuItem>
                                <MenuItem value={'price'}>Price</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid sm={6} className={classes.searchInput}>
                        <TextField
                            fullWidth
                            name={'search'}
                            type={'text'}
                            placeholder={'Search for products'}
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </Grid>
                    <Grid sm={3}>
                        <FormControl fullWidth>
                            <InputLabel
                                className={classes.formControlLabel}
                                id={'filter-items-select'}
                            >
                                Filter Items
                            </InputLabel>
                            <Select labelId={'filter-items-select'} fullWidth value={sortBy}>
                                <MenuItem value={'date'}>Date</MenuItem>
                                <MenuItem value={'name'}>Name</MenuItem>
                                <MenuItem value={'price'}>Price</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item xs={12} container>
                    <Grid item xs={12} className={classes.productsHeading}>
                        <Typography variant={'h5'} align={'center'}>
                            Recent Products
                        </Typography>
                    </Grid>
                    <Grid item sm={4}>
                        <Card title={'100X100 Land'} description={'lorem ipsunefadvsadv'} id={1} />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Overview;
