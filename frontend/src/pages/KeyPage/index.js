import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Tabs,
    Tab,
    Typography,
    Box,
} from '@material-ui/core'

import { getSingleKeyData } from '../../services/api'

import css from '../../constants/cssProperties'
import { COLORS } from '../../constants/colors'
import Sidebar from '../../components/Sidebar'
import Alert from '../../components/Alert'
import Explore from '../../components/Explore'

import Path from '../../components/Path'

import { Wrapper } from '../../styles'
import GeneratePDF from '../../components/GeneratePDF';

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
  const params = useParams()
  const [value, setValue] = useState(0)
  const [data, setData] = useState([])
  const [header, setHeader] = useState({})
  // alert
  const [alertMessage, setAlertMessage] = useState('')
  const [alertStatus, setAlertStatus] = useState(200)
  const [isToasting, setIsToasting] = useState(false)

  const handleAlert = ( message, status) => {
    if(status !== 200){
      setAlertMessage(message)
      setAlertStatus(status)
      setIsToasting(true)
    }
  }

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
       padding: !mobile ? '0' : '20px',
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

  useEffect( () => {
    const getData = async () =>{
      const { message: { header, data}, status } = await getSingleKeyData(params.title)
      handleAlert(data, status)
      if(status === 200){
        setHeader(header)
        setData(data)
      }
    }
    getData()
  }, [params.title])

  return (
    <Wrapper mobile={mobile}>
        <Sidebar mobile={mobile}/>
        <div className={classes.container}>
            <AppBar position="static" className={classes.appBar}>
                <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="simple tabs example">
                    <Tab label="The key" {...a11yProps(0)} />
                    <Tab className={classes.centerTab} label="Paths" {...a11yProps(1)} />
                    <Tab label="Explore" {...a11yProps(2)} />
                    </Tabs>
            </AppBar>   
            <Box className={classes.root}>
                <TabPanel  value={value} index={0}>
                    <Typography variant='h4' gutterBottom>
                        {header.title}
                    </Typography>
                    <Typography variant='h5' className={classes.username} gutterBottom>
                        {header.label}
                    </Typography>
                    <Typography variant='h6' paragraph>
                        {header.description}
                    </Typography>
                    <Typography variant='p' className={classes.username} paragraph>
                        {header.user}
                    </Typography>
                    <GeneratePDF header={header} data={data}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Path data={data} label={header.label}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Explore data={data}/>
                </TabPanel>
            </Box>
        </div>
        {isToasting && 
                <Alert 
                    message={alertMessage} 
                    status={alertStatus} 
                    setIsToasting={setIsToasting}
                />
            }
    </Wrapper>
  );
}
