import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    height: '100vh',  
    width:'100vw',
    top:'0',
    left: '0',
    zIndex: '10',
    backdropFilter: 'brightness(0.5)',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
}