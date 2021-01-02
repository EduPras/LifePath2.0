import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home'

import IDataBase from '../../icons/DatabaseIcon'
import IKey from '../../icons/KeyIcon'
import INew from '../../icons/New'
import { COLORS } from '../../constants/colors';

const drawerWidth = 100;

export default function PermanentDrawerLeft(props, { mobile = false}) {
  const history = useHistory()
  const location = useLocation()
  const [selectedIndex, setSelectedIndex] = useState('')
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      border: 'none'
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      
    },
    icon:{
        display:'flex',
        justifyContent:'center',
    },
    drawerPaperDesktop: {
      width: !mobile ? drawerWidth : '100%',
      border: 'none',
      background: !mobile ? 'transparent' : COLORS.white,
      justifyContent: !mobile ? 'flex-start' : 'flex-end',
      marginLeft: '20px'
    },
    itemContainer: {
      display:'flex',
      justifyContent: 'space-around'
    },
    item: {
      padding: 0,
      justifyContent: 'center',
      height: '100px',
      width: '100px',
      borderRadius: '50%',
    },

  }));
  const classes = useStyles();

  const handleItemChange = ( path ) => {

    setSelectedIndex(path)
    history.push(path)
  }

  useEffect( () => setSelectedIndex(location.pathname), [location.pathname])

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaperDesktop,
        }}
        anchor="left"
      >
        <List className={ mobile ? classes.itemContainer : null}>
            <ListItem 
              className={classes.item} 
              button
              onClick={ () => handleItemChange('/profile')}
              selected={selectedIndex === '/profile'}
              key='home'
            >
                <ListItemIcon className={classes.icon}> <HomeIcon fontSize="large" /> </ListItemIcon>
            </ListItem>
            <ListItem 
              className={classes.item} 
              button  
              onClick={ () => handleItemChange('/search')}
              selected={selectedIndex === '/search'}
              key='search'
            >
                <ListItemIcon className={classes.icon}> <IDataBase color={COLORS.orange} width={25} /> </ListItemIcon>
            </ListItem>
            <ListItem 
              className={classes.item} 
              button 
              selected={selectedIndex === '/search1'}
              onClick={ () => handleItemChange('/search1')}
              key='create'
            >
                <ListItemIcon className={classes.icon}> <IKey color={COLORS.purple} width={25} /> </ListItemIcon>
            </ListItem>
            <ListItem 
              className={classes.item} 
              button 
              selected={selectedIndex === '/create'}
              onClick={ () => handleItemChange('/create')}
              key='new'
            >
                <ListItemIcon className={classes.icon}> <INew color={COLORS.blueGreen} width={25} /> </ListItemIcon>
            </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
