import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { animalsNameAndCountGroupByName } from '../../features/animals/animalsSlice';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function AvailableSpace() {
    const classes = useStyles();

    const dispatch = useDispatch()
    const animalsNameAndCount = useSelector(state => state.animals.animalsNameAndCountGroupByName)

    useEffect(() => {
        dispatch(animalsNameAndCountGroupByName());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <Container fixed>
            <Card className={classes.root}>
                <CardActionArea>
                    {animalsNameAndCount.map((animal) => (
                        <CardContent key={animal.name} >
                            <Typography gutterBottom variant="h5" component="h2">
                                {animal.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {animal.space - animal.count}
                            </Typography>
                        </CardContent>
                    ))}
                </CardActionArea>
            </Card>
        </Container>
    );
}