import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Car from '../assets/images/car.jpg';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    cardContent: {
        padding: `${theme.spacing(4)}px ${theme.spacing(8)}px`,
        [theme.breakpoints.down('sm')]: {
            padding: `${theme.spacing(4)}px ${theme.spacing(4)}px`,
        },
    },
    cardActions: {
        paddingBottom: theme.spacing(4),
    },
}));

interface Props {
    title: string;
    description: string;
    className?: string;
    id: number;
}

export default function MediaCard({title, description, id, ...props}: Props) {
    const classes = useStyles();

    return (
        <Card
            {...props}
            className={classNames({[classes.card]: true, [props.className || '']: true})}
        >
            <CardMedia className={classes.media} image={`${Car}`} title="Contemplative Reptile" />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                    73K
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Grid container justify={'center'}>
                    <Button size="medium" variant={'contained'} color="primary">
                        View
                    </Button>
                </Grid>
            </CardActions>
        </Card>
    );
}
