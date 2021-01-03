import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx'

import {
    Box,
    TextField,
    Card,
    CardActions,
    CardContent,
    InputAdornment,
    Button,
    Typography,
    Collapse,
    IconButton,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';

import { searchText, getAllKeys, keysCreatedByUser } from '../../services/api';

import Sidebar from '../../components/Sidebar';
import PaginationComponent from '../../components/Pagination';
import Loading from '../../components/Loading';
import Alert from '../../components/Alert'

import { Wrapper } from '../../styles'
import { ContainerSearch, SearchList, Title, TitleContainer, Label, FoundLabels, Container, useStyles } from './styles'
;

const Search = ({ mobile }) => {
    const classes = useStyles()
    const location = useLocation()
    const [keys, setKeys] = useState([])
    const [loading, setLoading] = useState(false)
    const [text, setText] = useState('')
    // alert
    const [alertMessage, setAlertMessage] = useState('')
    const [alertStatus, setAlertStatus] = useState(200)
    const [isToasting, setIsToasting] = useState(false)

    const [activeIdExpanded, setActiveIdExpanded] = useState(-1)

    const handleExpandClick = i => {
        setActiveIdExpanded(activeIdExpanded === i ? -1 : i)
      };

    const handleAlert = ( message, status) => {
        if(status === 200) setKeys(message)
        else{
            setAlertMessage(message)
            setAlertStatus(status)
            setIsToasting(true)
        }
    }

    
    const userKeys = async user => {
        const { message, status } = await keysCreatedByUser(user)
        handleAlert(message, status)
    }
    
    const handleSearch = async () => {
        setLoading(true)
        // list keys of an especific user
        if(text.startsWith('@')){
            let user = text.slice(1)
            await userKeys(user)
        // keys found by searching
        } else {
            const { message, status } = await searchText(text)
            handleAlert(message, status)
        }
        setLoading(false)
    }

    useEffect( () => {
        const refreshKeys = async() =>{
            setLoading(true)
            if(location.state !== '' && location.state !== undefined){
                await userKeys(location.state)
            }else{
                const { message } = await getAllKeys()
                setKeys(message)
            }

            setLoading(false)
        }
        refreshKeys()
    }, [location.state])

    return(
        <Wrapper mobile={mobile}>
            <Sidebar mobile={mobile}/>
            <ContainerSearch>
                <Box mt={3}>
                    <TextField 
                        id="outlined-basic" 
                        label="Search" 
                        variant="outlined" 
                        placeholder="Families, orders ..."
                        color="secondary"
                        onChange={({target: { value }}) => setText(value)}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                  <IconButton onClick={() => handleSearch()}>
                                    <SearchIcon color="secondary" />
                                  </IconButton>                                
                              </InputAdornment>
                            ),
                          }}
                        fullWidth   
                    />
                </Box>  
                <SearchList>
                    {keys.map( (key, index) => (
                        <Card className={classes.card} >                    
                            <CardContent>
                                <Container>
                                    <TitleContainer>
                                        <Title>
                                            <Typography variant="h5" className={classes.title} component="h1" color="textSecondary" gutterBottom>
                                                {key.title}
                                            </Typography>
                                            <Typography className={classes.username} color="secondary" >
                                                {key.name}
                                            </Typography>  
                                        </Title>
                                        <Box className={classes.box} ml={2}>
                                            <Typography variant="h6" className={classes.label} component="h2" color="secondary" gutterBottom>
                                                {key.label}
                                            </Typography>
                                        </Box>
                                    </TitleContainer>   
                                    <FoundLabels>
                                        {key.labelsName.map( labelName => <Label>{labelName}</Label> )}
                                    </FoundLabels>                             
                                </Container>                   
                            </CardContent>
                            <Collapse in={activeIdExpanded === index} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography mt={2} variant="subtitle1" color="textSecondary" gutterBottom>
                                        {key.description}
                                    </Typography> 
                                </CardContent>
                            </Collapse>
                            <CardActions>
                                <Button variant="contained" className={classes.button} color="secondary" >Navigate</Button>
                                <IconButton
                                    className={clsx(classes.expand, {
                                    [classes.expandOpen]: activeIdExpanded === index,
                                    })}
                                    onClick={() => handleExpandClick(index)}
                                    aria-expanded={activeIdExpanded === index}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </CardActions>
                        </Card>                    
                    ) )}
                    
                </SearchList>
                <PaginationComponent/>  
            </ContainerSearch>
            {loading && <Loading />}
            {isToasting && <Alert message={alertMessage} status={alertStatus} setIsToasting={setIsToasting}/>}
        </Wrapper>
    )

}

export default Search