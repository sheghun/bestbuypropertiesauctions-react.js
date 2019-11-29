import React, {useRef, useState} from 'react';
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
import classnames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {Route, RouteComponentProps} from 'react-router';

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
    bigAvatar: {
        width: '100%',
    },
}));

const Products = () => {
    return (
        <>
            <Route path={'/admin/tl/products/add'} render={props => <AddProduct {...props} />} />
            <Route path={'/admin/tl/products/edit'} render={props => <EditProduct {...props} />} />
        </>
    );
};

const AddProduct = (props: RouteComponentProps) => {
    const classes = useStyles();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [condition, setCondition] = useState('');
    const [size, setSize] = useState('');
    const [year, setYear] = useState('');
    const [transmission, setTransimission] = useState('');
    const [images, setImages] = useState(([] as any) as Array<File>);
    const [imageSources, setImageSources] = useState([] as Array<string>);
    const [featuredImage, setFeaturedImage] = useState((null as any) as File);

    // Images element references
    const image1 = useRef() as {current: HTMLInputElement | null};
    const image2 = useRef() as {current: HTMLInputElement | null};
    const image3 = useRef() as {current: HTMLInputElement | null};
    const image4 = useRef() as {current: HTMLInputElement | null};

    const previewImages = (imageNumber: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = (e.target.files && e.target.files[0]) as File;
        const url = URL.createObjectURL(file);
        setImageSources(img => [...img, url]);
        setImages(imgFile => [...imgFile, file]);
    };


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
                        <TextField
                            fullWidth
                            placeholder={'Product Name'}
                            variant={'filled'}
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            placeholder={'Product Price'}
                            variant={'filled'}
                            name={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            placeholder={'Product Description'}
                            multiline
                            rows={'8'}
                            variant={'filled'}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} container alignItems={'baseline'}>
                        <Grid item xs={3}>
                            {imageSources[0] ? (
                                <img
                                    src={imageSources[0]}
                                    className={classes.bigAvatar}
                                    alt={name}
                                />
                            ) : (
                                <Avatar>
                                    <IconButton
                                        onClick={() => image1.current && image1.current.click()}
                                    >
                                        <AddIcon />
                                        <input
                                            type={'file'}
                                            accept={'image/*'}
                                            style={{display: 'none'}}
                                            onChange={previewImages('image1')}
                                            ref={image1}
                                        />
                                    </IconButton>
                                </Avatar>
                            )}
                        </Grid>
                        <Grid item xs={3}>
                            {imageSources[1] ? (
                                <img
                                    src={imageSources[1]}
                                    className={classes.bigAvatar}
                                    alt={name}
                                />
                            ) : (
                                <Avatar>
                                    <IconButton>
                                        <AddIcon
                                            onClick={() => image2.current && image2.current.click()}
                                        />
                                        <input
                                            type={'file'}
                                            accept={'image/*'}
                                            style={{display: 'none'}}
                                            onChange={previewImages('image')}
                                            ref={image2}
                                        />
                                    </IconButton>
                                </Avatar>
                            )}
                        </Grid>
                        <Grid item xs={3}>
                            {imageSources[2] ? (
                                <img
                                    src={imageSources[2]}
                                    className={classes.bigAvatar}
                                    alt={name}
                                />
                            ) : (
                                <Avatar>
                                    <IconButton>
                                        <AddIcon
                                            onClick={() => image3.current && image3.current.click()}
                                        />
                                        <input
                                            type={'file'}
                                            accept={'image/*'}
                                            style={{display: 'none'}}
                                            onChange={previewImages('image')}
                                            ref={image3}
                                        />
                                    </IconButton>
                                </Avatar>
                            )}
                        </Grid>
                        <Grid item xs={3}>
                            {imageSources[3] ? (
                                <img
                                    src={imageSources[3]}
                                    className={classes.bigAvatar}
                                    alt={name}
                                />
                            ) : (
                                <Avatar>
                                    <IconButton>
                                        <AddIcon
                                            onClick={() => image4.current && image4.current.click()}
                                        />
                                        <input
                                            type={'file'}
                                            accept={'image/*'}
                                            style={{display: 'none'}}
                                            onChange={previewImages('image')}
                                            ref={image4}
                                        />
                                    </IconButton>
                                </Avatar>
                            )}
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

const EditProduct = (props: RouteComponentProps) => {
    const classes = useStyles();

    return (
        <>
            <Grid container className={classes.gridWrapper} justify={'space-between'}>
                <Grid item xs={12} className={classes.heading}>
                    <Typography variant={'h5'} align={'center'}>
                        Edit Product
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
