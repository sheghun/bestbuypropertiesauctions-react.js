import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    gridWrapper: {
        padding: `${theme.spacing(2)}px 0`,
    },
    heading: {
        paddingBottom: theme.spacing(4),
    },
    productsInputsWrapper: {
        height: '600px',
    },
    selectLabel: {
        paddingLeft: theme.spacing(2),
    },
}));

const Products = () => {
    const classes = useStyles();

    return (
        <>
            <Grid container className={classes.gridWrapper} justify={'space-between'}>
                <Grid item xs={12} className={classes.heading}>
                    <Typography variant={'h5'} align={'center'}>
                        Add A New Product
                    </Typography>
                </Grid>
                <Grid
                    item
                    sm={12}
                    md={5}
                    container
                    direction={'row'}
                    justify={'space-evenly'}
                    className={classes.productsInputsWrapper}
                >
                    <Grid item xs={12}>
                        <TextField fullWidth placeholder={'Product Name'} variant={'filled'} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField placeholder={'Product Price'} variant={'filled'} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            placeholder={'Product Description'}
                            multiline
                            rows={'8'}
                            variant={'filled'}
                        />
                    </Grid>
                    <Grid item xs={12} container>
                        <Grid item xs={3}>
                            <Avatar>
                                <IconButton>
                                    <AddIcon />
                                </IconButton>
                            </Avatar>
                        </Grid>
                        <Grid item xs={3}>
                            <Avatar>
                                <IconButton>
                                    <AddIcon />
                                </IconButton>
                            </Avatar>
                        </Grid>
                        <Grid item xs={3}>
                            <Avatar>
                                <IconButton>
                                    <AddIcon />
                                </IconButton>
                            </Avatar>
                        </Grid>
                        <Grid item xs={3}>
                            <Avatar>
                                <IconButton>
                                    <AddIcon />
                                </IconButton>
                            </Avatar>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={'caption'}>
                            Add your images you can add up to 4 images
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    item
                    sm={12}
                    md={5}
                    container
                    direction={'row'}
                    justify={'space-evenly'}
                    className={classes.productsInputsWrapper}
                >
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id={'condition-select'} className={classes.selectLabel}>
                                Condition
                            </InputLabel>
                            <Select fullWidth variant={'filled'}>
                                <MenuItem></MenuItem>
                            </Select>
                            <FormHelperText>
                                This field is for vehicles and usable items
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant={'filled'}
                            fullWidth
                            label={'Size'}
                            helperText={'This is for lands and houses'}
                        />
                    </Grid>
                    <Grid item xs={12} container justify={'space-between'}>
                        <Grid item xs={5}>
                            <TextField
                                variant={'filled'}
                                fullWidth
                                label={'Year'}
                                helperText={'This is for cars'}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField variant={'filled'} label={'Transmission'} fullWidth select>
                                <MenuItem value={'Manual'}>Manual</MenuItem>
                                <MenuItem value={'Auto'}>Auto</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button color={'primary'} fullWidth>
                            Upload featured image of the product
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Button color={'primary'} fullWidth variant={'contained'}>
                        Add Product
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default Products;
