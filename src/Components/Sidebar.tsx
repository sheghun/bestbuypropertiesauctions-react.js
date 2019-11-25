import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem, {ListItemProps} from '@material-ui/core/ListItem';
import {NavLink, NavLinkProps} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    drawer: {
        width: '100%',
        height: '100vh',
        color: 'white !important',
        flexShrink: 0,
        backgroundColor: theme.palette.primary.dark,
        '& *': {
            color: 'white !important',
        },
    },
    drawerPaper: {
        backgroundColor: theme.palette.primary.dark,
        height: '100vh',
        width: '250px',
        borderRight: 'none',
        '& *': {
            color: 'white !important',
        },
    },
    avatar: {
        width: '80px',
        height: '80px',
        backgroundColor: theme.palette.secondary.dark,
    },
    activeLink: {
        backgroundColor: theme.palette.primary.light,
    },
}));

const links = [
    {path: '/admin/tl/overview', title: 'Overview'},
    {path: '/admin/tl/products', title: 'Products'},
    {path: '/admin/tl/products/add', title: 'Add Product'},
    {path: '/admin/tl/products/edit', title: 'Edit Product'},
    {path: '/admin/tl/categories/edit', title: 'Categories'},
];

const Sidebar = () => {
    const classes = useStyles();

    const ListItemLink = (props: ListItemProps<'a', {button?: true} & NavLinkProps>) => {
        return <ListItem button component={NavLink} {...props} />;
    };

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <Grid container direction={'row'} alignItems={'center'} justify={'space-evenly'}>
                <Grid
                    item
                    xs={12}
                    container
                    direction={'row'}
                    justify={'center'}
                    style={{marginTop: '4rem'}}
                >
                    <div>
                        <Avatar className={classes.avatar}>
                            <PersonIcon fontSize={'large'} />
                        </Avatar>
                        <Typography variant={'subtitle1'}>Hi Admin</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} style={{marginTop: '4rem'}}>
                    <List>
                        {links.map(link => (
                            <ListItemLink
                                button
                                to={link.path}
                                exact
                                activeClassName={classes.activeLink}
                            >
                                <ListItemText
                                    primary={<Typography variant={'h6'}>{link.title}</Typography>}
                                />
                            </ListItemLink>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </Drawer>
    );
};

export default Sidebar;
