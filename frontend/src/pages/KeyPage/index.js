import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Tabs,
    Tab,
    Typography,
    Box,
} from '@material-ui/core'

import { authed } from '../../services/api'

import css from '../../constants/cssProperties'
import { COLORS } from '../../constants/colors'
import Sidebar from '../../components/Sidebar'

import Path from '../../components/Path'

import { Wrapper } from '../../styles'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SimpleTabs({mobile}) {
  const [value, setValue] = useState(0);
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: COLORS.white,
      height: '900px',
      paddingTop: '30px',
      boxShadow: '-1px 3px 16px 4px #0000002e'
    },
    container: {
       width: !mobile ? css.maxWidthContainer : '100vw',
    },

    appBar: {
        backgroundColor:'transparent',
        boxShadow: 'none'
    },
    centerTab: {
        borderRight: `1px solid ${COLORS.lightGray}`,
        borderLeft: `1px solid ${COLORS.lightGray}`
    },
    username:{
        fontWeight: 'bold'
    }
  }));
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Wrapper mobile={mobile}>
        { authed() && <Sidebar mobile={mobile}/>}
        <div className={classes.container}>
            <AppBar position="static" className={classes.appBar}>
                <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="simple tabs example">
                    <Tab label="The key" {...a11yProps(0)} />
                    <Tab className={classes.centerTab} label="Paths" {...a11yProps(1)} />
                    <Tab label="Navigate" {...a11yProps(2)} />
                    </Tabs>
            </AppBar>   
            <Box className={classes.root}>
                <TabPanel  value={value} index={0}>
                    <Typography variant='h3' gutterBottom>
                        Some title
                    </Typography>
                    <Typography variant='h5' paragraph>
                        Lorem ipsum dales impus
                    </Typography>
                    <Typography variant='h6' className={classes.username} paragraph>
                        Eduardo Prasniewski
                    </Typography>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Path />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
            </Box>
        </div>
    </Wrapper>
  );
}
