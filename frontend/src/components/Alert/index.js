import React, { useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
   position:'fixed',
   bottom:'30',
  },
}));

export default function CustomizedSnackbars({status, message, setIsToasting}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('')

  useEffect( () =>{
    console.log('fon')
    if(message){
        setOpen(true)
        if (status === 200) setSeverity('success')
        else setSeverity('error')
    }
  }, [status, message])


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setIsToasting(false)
  };

  return (
    <div className={classes.root}>
      <Snackbar 
        open={open} 
        onClose={handleClose}
        autoHideDuration={6000}
        anchorOrigin={{vertical:'top', horizontal:'right'}}
    >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}