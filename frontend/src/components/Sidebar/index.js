import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Tab, 
  Tabs, 
  Paper
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'

import IDataBase from '../../icons/DatabaseIcon'
import IKey from '../../icons/KeyIcon'
import INew from '../../icons/New'
import { COLORS } from '../../constants/colors';

const drawerWidth = 100;


const Sidebar = ({ mobile}) => {
  useEffect( () => console.log(mobile), [])
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
      width: drawerWidth ,
      border: 'none',
      background: 'transparent',
      justifyContent: 'flex-start',
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
    tabRoot: {
      flexGrow: 1,
      position:'fixed',
      width: '100vw',
      bottom: '0',
      zIndex:'10',
      backgroundColor: COLORS.secondary
    },

  }));
  const classes = useStyles();

  const handleItemChange = ( path ) => {

    setSelectedIndex(path)
    history.push(path)
  }

  useEffect( () => setSelectedIndex(location.pathname), [location.pathname])

  return (
    <>
    { !mobile ?(
      <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaperDesktop,
        }}
        anchor="left"
      >
        <List>
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
                <ListItemIcon className={classes.icon}> <IDataBase width={25} /> </ListItemIcon>
            </ListItem>
            <ListItem 
              className={classes.item} 
              button 
              selected={selectedIndex === '/search1'}
              onClick={ () => handleItemChange('/search1')}
              key='create'
            >
                <ListItemIcon className={classes.icon}> <IKey width={25} /> </ListItemIcon>
            </ListItem>
            <ListItem 
              className={classes.item} 
              button 
              selected={selectedIndex === '/create'}
              onClick={ () => handleItemChange('/create')}
              key='new'
            >
                <ListItemIcon className={classes.icon}> <INew width={25} /> </ListItemIcon>
            </ListItem>
        </List>
      </Drawer>
    </div>

    ) : (
      <Paper square className={classes.tabRoot}>
        <Tabs
          value={selectedIndex}
          onChange={handleItemChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="icon tabs example"
        >
          <Tab 
            icon={<HomeIcon />} 
            onClick={ () => handleItemChange('/profile')} 
          />
          <Tab 
            icon={<IDataBase  width={25} />} 
            onClick={ () => handleItemChange('/search')} 
          />
          <Tab 
            icon={<IKey width={25}/>}  
            onClick={ () => handleItemChange('/search1')} 
          />
          <Tab 
            icon={<INew width={25}/>} 
            onClick={ () => handleItemChange('/create')} 
          />
        </Tabs>
    </Paper>
    )}
    
    </>
  );
}


export default Sidebar