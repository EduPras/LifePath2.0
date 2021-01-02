import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, ListItemText, ListItem } from '@material-ui/core';
import { FixedSizeList } from 'react-window';

import { COLORS } from '../../constants/colors';
import Arrow from '../../icons/Arrow'

import { LabelContainer, PathContainer, Container, Grid, Item, Text } from './styles'

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

function renderRow(props) {
    const { index, style } = props;
    
    return (
      <ListItem button style={style} key={index}>
        <ListItemText primary={`Item ${index + 1}`} />        
      </ListItem>
    );
  }
  
  renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };

const Path = () => {
    const classes = useStyles();

    return(
        <Container>
            <LabelContainer>
                <Typography variant='h6' gutterBottom>
                    Results found
                </Typography>
                <FixedSizeList className={classes.list}height={750} width={300} itemSize={46} itemCount={20}>
                    {renderRow}
                </FixedSizeList>
            </LabelContainer>
            <PathContainer>
                <Grid className={classes.list}>
                    <Item>
                        <Text>Lorem ipsum</Text>
                        <Arrow width='20px' />
                    </Item>
                    <Item>
                        <Text>Lorem ipsum</Text>
                        <Arrow width='20px' />
                    </Item>
                    <Item>
                        <Text>Lorem ipsum</Text>
                        <Arrow width='20px' />
                    </Item>
                    <Item>
                        <Text>Lorem ipsum</Text>
                        <Arrow width='20px' />
                    </Item>
                    <Item>
                        <Text>Lorem ipsum</Text>
                        <Arrow width='20px' />
                    </Item>
                    <Item>
                        <Text>Lorem ipsum</Text>
                        <Arrow width='20px' />
                    </Item>
                    <Item>
                        <Text>Lorem ipsum</Text>
                        <Arrow width='20px' />
                    </Item>
                    <Item>
                        <Text>Lorem ipsum</Text>
                        <Arrow width='20px' />
                    </Item>
                    <Item>
                        <Text>Lorem ipsum</Text>
                        <Arrow width='20px' />
                    </Item>
                    <Item>
                        <Text>Lorem ipsum</Text>
                        <Arrow width='20px' />
                    </Item>
                    <Item>
                        <Text>Lorem ipsum</Text>
                        <Arrow width='20px' />
                    </Item>
                    <Item>
                        <Text>Lorem ipsum</Text>
                        <Arrow width='20px' />
                    </Item>
                    <Item>
                        <Text>Lorem ipsum</Text>
                        <Arrow width='20px' />
                    </Item>
                    <Item>
                        <Text>Lorem ipsum</Text>
                        <Arrow width='20px' />
                    </Item>
                    
                </Grid>
                <Typography variant='h4'>
                    Selected
                </Typography>
            </PathContainer>

        </Container>
    )
}

export default Path