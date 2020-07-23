import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import AvailableSpace from './dashboard/AvailableSpace';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

export function Dashboard() {
  const classes = useStyles();

  const loggedIn = useSelector(state => state.users.loggedIn);

  if (loggedIn) {
    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <AvailableSpace />
          </Grid>
        </Grid>
      </div >
    )
  }
  else {
    return <div />
  }
}