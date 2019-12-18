import React, {useContext, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {AdminContext} from '../../Context';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import Snackbar from '../../Components/Snackbar';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100vh',
        },
        list: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

const Categories = () => {
    const classes = useStyles();
    const {categories, setCategories} = useContext(AdminContext);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        variant: 'success',
    });

    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');

    const addCategory = async () => {
        setLoading(true);

        const {status, data} = await axios.post(`/admin/categories`, {title});
        if (status === 200 && data.status === 'success') {
            setSnackbar({open: true, variant: 'success', message: 'Category added successfully'});

            categories.push(data.data);
            setCategories(categories);
        }

        setLoading(false);
    };

    const deleteCategory = (id: number) => async () => {
        setLoading(true);

        const {status, data} = await axios.delete(`/admin/categories/${id}`);
        if (status === 200 && data.status === 'success') {
            setSnackbar({open: true, variant: 'success', message: 'Category deleted successfully'});
            const currentCategoryIndex = categories.findIndex(category => category.id == id);
            categories.splice(currentCategoryIndex, 1);
            setCategories(categories);
        }

        setLoading(false);
    };

    return (
        <Grid className={classes.root} justify={'center'} container alignItems={'center'}>
            <Snackbar
                variant={snackbar.variant as any}
                open={snackbar.open}
                message={snackbar.message}
                onClose={() => setSnackbar(s => ({...s, open: false}))}
            />
            <Grid item xs={12}>
                <Typography gutterBottom variant={'h3'} align={'center'}>
                    Categories
                </Typography>
            </Grid>
            <Grid justify={'center'} container item xs={12}>
                <TextField value={title} onChange={e => setTitle(e.target.value)} />
                <Button color={'primary'} onClick={addCategory}>
                    Add Category
                </Button>
            </Grid>
            {loading && (
                <Grid container justify={'center'}>
                    <Grid item xs={12} container justify={'center'}>
                        <CircularProgress />
                    </Grid>
                </Grid>
            )}
            <Grid item xs={12} justify={'center'} container>
                <Paper className={classes.list}>
                    <List>
                        {categories.map((category, i) => {
                            const labelId = `checkbox-list-label-${category.title}`;

                            return (
                                <>
                                    {i > 0 && <Divider />}
                                    <ListItem key={category.id} role={undefined} button>
                                        <ListItemText id={labelId} primary={category.title} />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                edge="end"
                                                aria-label="comments"
                                                onClick={deleteCategory(category.id)}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </>
                            );
                        })}
                    </List>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Categories;
