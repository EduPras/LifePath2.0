import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import { ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx'

import { ContainerSearch, SearchList, Title, TitleContainer, Label, FoundLabels, Container, useStyles } from './styles'
import PaginationComponent from '../../components/Pagination';

const Search = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
    return(
            <ContainerSearch>
                <Box mt={3}>
                    <TextField 
                        id="outlined-basic" 
                        label="Search" 
                        variant="outlined" 
                        placeholder="Families, orders ..."
                        color="secondary"
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon color="secondary" />
                              </InputAdornment>
                            ),
                          }}
                        fullWidth   
                    />
                </Box>  
                <SearchList>
                    <Card className={classes.card} >                    
                        <CardContent>
                            <Container>
                                <TitleContainer>
                                    <Title>
                                        <Typography variant="h5" className={classes.title} component="h1" color="textSecondary" gutterBottom>
                                            Title test
                                        </Typography>
                                        <Typography className={classes.username} color="secondary" >
                                            Eduardo Prasniewski
                                        </Typography>  
                                    </Title>
                                    <Box className={classes.box} ml={2}>
                                        <Typography variant="h6" className={classes.label} component="h2" color="secondary" gutterBottom>
                                            Order
                                        </Typography>
                                    </Box>
                                </TitleContainer>   
                                <FoundLabels>
                                    <Label>Family</Label>
                                    <Label>Macus</Label>
                                    <Label>Mamimus</Label>
                                    <Label>Teles</Label>
                                    <Label>Xenes</Label>
                                    <Label>Family</Label>
                                    <Label>Macus</Label>
                                    <Label>Mamimus</Label>
                                    <Label>Teles</Label>
                                    <Label>Xenes</Label>
                                    <Label>Family</Label>
                                    <Label>Macus</Label>
                                    <Label>Mamimus</Label>
                                    <Label>Teles</Label>
                                    <Label>Xenes</Label>
                                </FoundLabels>                             
                            </Container>                   
                        </CardContent>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography mt={2} variant="subtitle1" color="textSecondary" gutterBottom>
                                    Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado.
                                </Typography> 
                            </CardContent>
                        </Collapse>
                        <CardActions>
                            <Button variant="contained" className={classes.button} color="secondary" >Navigate</Button>
                            <IconButton
                                className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                                })}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </CardActions>
                    </Card>                    
                </SearchList>
                <PaginationComponent/>  
            </ContainerSearch>
    )

}

export default Search