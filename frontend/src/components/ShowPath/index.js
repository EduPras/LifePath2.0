import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';

import { COLORS } from '../../constants/colors';
import Arrow from '../../icons/Arrow'
import { Typography } from '@material-ui/core';

import { Grid, Text, Item } from './styles'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      height: 400,
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
    },
    list: {
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: COLORS.lightGray,
            borderRadius: "10px",
            transition: '0.2s ease'
        },
        "&::-webkit-scrollbar": {
            width: "10px", 
        },
        "&::-webkit-scrollbar-thumb:hover":{
            background: '#555',
            transition: '0.2s ease'
          },
    }
  }));

const ShowPath = ({ shownPath, label = '', clickable = false, handleClick=null  }) => {
    const classes = useStyles();
    return(
        <Grid className={classes.list}>            
            {shownPath ? shownPath.map( (segment, index) => 
                    <Item clickable={clickable} onClick={() => handleClick(index)}>
                        <Text>{segment.sentence}</Text>
                        <Arrow width='20px' />
                    </Item>      

                ) : (
                    <Typography>
                        {
                            label ? `Select a ${label} found to see the path` 
                            : 'Browse to the chosen keys will appear here'
                        }
                    </Typography>
                )}     
        </Grid>
    )
}

export default ShowPath