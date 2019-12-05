import React, {useContext, useRef, useState} from 'react';
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
import {Route, RouteComponentProps} from 'react-router';
import {AdminContext} from '../../Context';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import Snackbar from '../../Components/Snackbar';

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
        // paddingLeft: theme.spacing(2),
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

    const {categories} = useContext(AdminContext);

    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        variant: 'success',
    });
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [condition, setCondition] = useState('');
    const [size, setSize] = useState('');
    const [year, setYear] = useState('');
    const [transmission, setTransmission] = useState('');
    const [category, setCategory] = useState('');
    const [images, setImages] = useState(([] as any) as Array<File>);
    const [imageSources, setImageSources] = useState([] as Array<string>);
    const [featuredImage, setFeaturedImage] = useState({file: (null as any) as File, src: ''});
    const [errors, setErrors] = useState({
        featuredImage: '',
        category: '',
        price: '',
    });

    // Images element references
    const image1InputEl = useRef() as {current: HTMLInputElement | null};
    const image2InputEl = useRef() as {current: HTMLInputElement | null};
    const image3InputEl = useRef() as {current: HTMLInputElement | null};
    const image4InputEl = useRef() as {current: HTMLInputElement | null};
    const featuredImageInputEl = useRef() as {current: HTMLInputElement | null};

    const previewImages = (imageNumber: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = (e.target.files && e.target.files[0]) as File;
        const url = URL.createObjectURL(file);
        setImageSources(img => [...img, url]);
        setImages(imgFile => [...imgFile, file]);
    };

    const onChangeFeaturedImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = (e.target.files && e.target.files[0]) as File;
        if (file) {
            setFeaturedImage({file, src: URL.createObjectURL(file)});
        }
    };

    const validate = () => {
        let pass = true;
        const err = {} as any;
        setErrors(err);
        if (!featuredImage) {
            pass = false;
            err.featuredImage = 'Featured image is compulsory';
        }
        if (!category) {
            pass = false;
            err.category = 'Category is compulsory';
        }
        if (isNaN(Number(price))) {
            pass = false;
            err.price = 'Price must contain only numbers';
        }
        setErrors(err);
        return pass;
    };

    const submit = async (e: React.FormEvent<HTMLFormElement> | any) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);

        try {
            const d = {name, price, description, size, year, condition, category, transmission};
            const productResponse = await axios.post('/admin/products', d); // Upload product details
            // Check if successful
            if (productResponse.status === 201 && productResponse.data.status === 'success') {
                setSnackbar({
                    open: true,
                    message: 'Product added uploading images',
                    variant: 'success',
                });

                const formData = new FormData(); // Construct formData
                formData.append('featuredImage', featuredImage.file);

                images.forEach((image, i) => {
                    formData.append(`image${i + 1}`, image);

                    if (i + 1 === images.length) {
                        (async () => {
                            setLoading(true);
                            formData.append('productId', productResponse.data.data.product.id);
                            const res = await axios.post('/admin/products/images', formData);
                            setLoading(false);
                        })();
                    }
                });
            }
        } catch (e) {}
        setLoading(false);
    };
    return (
        <>
            <Snackbar
                variant={snackbar.variant as any}
                open={snackbar.open}
                message={snackbar.message}
                onClose={() => setSnackbar(s => ({...s, open: false}))}
            />
            <Grid
                container
                className={classes.gridWrapper}
                justify={'space-between'}
                component={'form'}
                onSubmit={submit}
            >
                <Grid item xs={12} className={classes.heading}>
                    <Typography variant={'h5'} align={'center'}>
                        Add A New Product
                    </Typography>
                </Grid>
                <Grid item xs={12} container justify={'center'}>
                    {featuredImage.file && (
                        <img height={'300px'} alt={name} src={featuredImage.src} />
                    )}
                    <input
                        type={'file'}
                        accept={'image/*'}
                        required
                        ref={featuredImageInputEl}
                        onChange={onChangeFeaturedImage}
                        style={{display: 'none'}}
                    />
                    <Button
                        color={'primary'}
                        fullWidth
                        type={'button'}
                        onClick={() =>
                            featuredImageInputEl.current && featuredImageInputEl.current.click()
                        }
                    >
                        Upload featured image of the product
                    </Button>
                    {errors.featuredImage && (
                        <FormControl error={!!errors.featuredImage}>
                            <FormHelperText>{errors.featuredImage}</FormHelperText>
                        </FormControl>
                    )}
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
                            required
                            placeholder={'Product Name'}
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            placeholder={'Product Price'}
                            fullWidth
                            name={price}
                            onChange={e => setPrice(e.target.value)}
                            error={!!errors.price}
                            helperText={errors.price}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            placeholder={'Product Description'}
                            multiline
                            rows={'8'}
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
                                        onClick={() =>
                                            image1InputEl.current && image1InputEl.current.click()
                                        }
                                    >
                                        <AddIcon />
                                        <input
                                            type={'file'}
                                            accept={'image/*'}
                                            style={{display: 'none'}}
                                            onChange={previewImages('image1InputEl')}
                                            ref={image1InputEl}
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
                                            onClick={() =>
                                                image2InputEl.current &&
                                                image2InputEl.current.click()
                                            }
                                        />
                                        <input
                                            type={'file'}
                                            accept={'image/*'}
                                            style={{display: 'none'}}
                                            onChange={previewImages('image')}
                                            ref={image2InputEl}
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
                                            onClick={() =>
                                                image3InputEl.current &&
                                                image3InputEl.current.click()
                                            }
                                        />
                                        <input
                                            type={'file'}
                                            accept={'image/*'}
                                            style={{display: 'none'}}
                                            onChange={previewImages('image')}
                                            ref={image3InputEl}
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
                                            onClick={() =>
                                                image4InputEl.current &&
                                                image4InputEl.current.click()
                                            }
                                        />
                                        <input
                                            type={'file'}
                                            accept={'image/*'}
                                            style={{display: 'none'}}
                                            onChange={previewImages('image')}
                                            ref={image4InputEl}
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
                            <Select
                                fullWidth
                                required
                                onChange={e => setCondition(e.target.value as string)}
                            >
                                <MenuItem value={'New'}>New</MenuItem>
                                <MenuItem value={'Used Like New'}>Used Like New</MenuItem>
                                <MenuItem value={'Used'}>Used</MenuItem>
                            </Select>
                            <FormHelperText>
                                This field is for vehicles and usable items
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth error={!!errors.category}>
                            <InputLabel id={'condition-select'} className={classes.selectLabel}>
                                Category
                            </InputLabel>
                            <Select
                                fullWidth
                                required
                                onChange={e => setCategory(e.target.value as string)}
                            >
                                {categories.map(cat => (
                                    <MenuItem key={cat.id} value={cat.id}>
                                        {cat.title}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label={'Size'}
                            value={size}
                            onChange={e => setSize(e.target.value)}
                            helperText={'This is for lands and houses'}
                        />
                    </Grid>
                    <Grid item xs={12} container justify={'space-between'}>
                        <Grid item xs={5}>
                            <TextField
                                fullWidth
                                label={'Year'}
                                helperText={'This is for cars'}
                                onChange={e => setYear(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                label={'Transmission'}
                                fullWidth
                                select
                                onChange={e => setTransmission(e.target.value as string)}
                            >
                                <MenuItem value={'Manual'}>Manual</MenuItem>
                                <MenuItem value={'Auto'}>Auto</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} container justify={'center'}>
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        disabled={loading}
                        type={'submit'}
                        onClick={submit}
                    >
                        {loading ? <CircularProgress /> : 'Add Product'}
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
                        <TextField fullWidth placeholder={'Product Name'} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField placeholder={'Product Price'} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            placeholder={'Product Description'}
                            multiline
                            rows={'8'}
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
                            <Select fullWidth>
                                <MenuItem></MenuItem>
                            </Select>
                            <FormHelperText>
                                This field is for vehicles and usable items
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label={'Size'}
                            helperText={'This is for lands and houses'}
                        />
                    </Grid>
                    <Grid item xs={12} container justify={'space-between'}>
                        <Grid item xs={5}>
                            <TextField fullWidth label={'Year'} helperText={'This is for cars'} />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField label={'Transmission'} fullWidth select>
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
