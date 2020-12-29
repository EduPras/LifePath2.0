import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Button, Typography, MenuItem, InputLabel, FormControl } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Formik, Form, Field } from 'formik'
import { TextField, Select} from 'formik-material-ui'

import * as Yup from 'yup' 

import Loading from '../../components/Loading'

import css from '../../constants/cssProperties'
import { COLORS } from '../../constants/colors'

import { Circle } from './styles'
import Arrow from '../../icons/Arrow'

const useStyle = makeStyles({
    form:{
        display:'flex',
        flexDirection:'column',
        padding: '30px',
        gap: '30px',
        width: '500px',
        backgroundColor: COLORS.white,
        boxShadow: '0px 11px 20px 0px #0000004d',
        position: 'relative'
    },
    arrow:{
        transform:'rotate(90deg)'
    }
})

const schemaTitle = Yup.object().shape({
    title: Yup.string().required('Title required'),
    description: Yup.string().required('Description required'),
    label: Yup.string().required('Label required'),
})

const schemaKey = Yup.object().shape({
    sentence:  Yup.string().required('Title required'),
    label: Yup.string().required('Label required')
})


const InitialForm = ({ setStep, setTitleData }) => {
    const handleSubmitInitalValues = values => {
        setTitleData(values)
        setStep(1)
    }   
    const classes = useStyle()
    return(
        <Box 
            display="flex" 
            alignItems="center" 
            justifyContent="center" 
            height='100vh' 
            flexDirection='column'> 

            <Formik
                initialValues={{
                    title:'',
                    description: '',
                    label:'',
                }}
                validationSchema={schemaTitle}
                onSubmit={handleSubmitInitalValues}
            >
                {({handleSubmit}) =>
                    <Form 
                        className={classes.form}
                        onSubmit={handleSubmit}
                    >
                        <Typography variant='h4' color='primary'>
                            Create a new key
                        </Typography>
                        <Field
                            component={TextField}
                            name='title'
                            label='Title'
                            
                        />
                        <Field
                            component={TextField}
                            name='label'
                            label='Label'
                            
                        />
                        <Field
                            component={TextField}
                            name='description'
                            label='Description'
                            multiline
                            rows={4}
                            rowsMax={10}
                            
                        />
                        <Button 
                            variant="contained"
                            color="primary"
                            type='submit'
                            
                        >
                            Start
                        </Button>
                    </Form>
                }
            </Formik>
        </Box>  
    )
}

const Keys = ({titleData}) => {
    const history = useHistory()

    const [label] = useState(titleData.label)
    const [available, setAvailable] = useState({1:{bind:0}})
    const [currentNextKey, setCurrentNextKey] = useState(2)
    const [labeled, setLabeled] = useState(false)
    const [finishButton, setFinishButton] = useState(false)
    const [labelName, setLabelName] = useState('')
    const [parent, setParent] = useState('1')
    const [loading, setLoading] = useState(false)
    const [keys, setKeys] = useState([])

    const classes = useStyle()

    // puting keys
    const handleSubmitKey = ( values, {resetForm}) => {
        resetForm()
        let payload = {
            parent: values.parent,
            sentence: values.sentence
        }

        // Increase key connection
        setAvailable(old => {
            old[values.parent].bind = old[values.parent].bind+1
            return old
        })

        // Create a new key
        if (values.label !== label) {
            setAvailable(Object.assign(available, {[currentNextKey]:{bind:0}}))
            setCurrentNextKey(currentNextKey+1)
        } else {
            // if it's a labeled add theses properties
            payload.name = values.name
            payload.label = values.label
        }

        // Check if parent already have 2 connections
        if(available[parent].bind === 2){
            const newParent = Object.keys(available).filter( key => key!==parent)
            setParent(Math.min(...newParent))
        }


        console.log(payload)    
        setKeys([...keys, payload])
    }

    // sending data to backend
    const handleSubmitFinish = () => {
        setLoading(true)
        setTimeout( () => {
            alert(JSON.stringify(keys, null, 2))
            console.log(keys)
            setLoading(false)
            history.push('/profile')
        }, 5000 )        
    }

    useEffect( () => {
        let finish = true
        Object.keys(available).map( key => {
            if(available[key].bind < 2) {
                finish = false
            }
        } )
        setFinishButton(finish)
    }, [available, keys])

    return(
        <Box    
            maxWidth={css.maxWidthContainer}
            display="flex" 
            alignItems="center" 
            justifyContent="center" 
            flexDirection='column'
            height='100vh' 
            margin='auto'
        > 
            <Box
            >
                <Formik
                    initialValues={{
                        parent: parent,
                        sentence:'',
                        label: '',
                        name: ''
                    }}
                    enableReinitialize
                    validationSchema={schemaKey}
                    onSubmit={handleSubmitKey}
                >
                    {({ 
                        handleSubmit, 
                        values, 
                        handleChange, 
                        resetForm,
                        isValid,
                        dirty
                    }) => (
                        <Form 
                            className={classes.form}
                            onSubmit={handleSubmit}
                        >
                                <FormControl >
                                    <InputLabel htmlFor="parent">Parent</InputLabel>
                                    <Field
                                        component={Select}
                                        name="parent"
                                        value={values.parent}
                                        onChange={ e => {
                                            handleChange(e)
                                            setParent(e.target.value)
                                        }}
                                    >
                                        {Object.keys(available).map( key => {
                                            if(available[key].bind < 2) return <MenuItem value={key}>{key}</MenuItem>
                                        })}
                                    </Field>
                                </FormControl>
                                {loading && <Loading/>}
                                <Box              
                                    display="flex" 
                                    alignItems='center'
                                    
                                    position='relative'
                                    flexDirection='column'
                                    >
                                    <Circle>
                                        <a>{parent}</a>
                                    </Circle>  
                                    <Arrow className={classes.arrow}/>
                                    <Circle labeled={labeled ? true : false}>
                                        <a>{labelName !== '' ? labelName : currentNextKey}</a>
                                    </Circle>               
                                </Box>
                                <Field
                                    component={TextField}
                                    name='sentence'
                                    label='Sentence'
                                    variant='outlined'
                                    multiline
                                    rows={4}
                                    rowsMax={10}
                                    fullWidth
                                />
                                 <FormControl >
                                    <InputLabel htmlFor="label">Label/Key</InputLabel>
                                        <Field
                                            component={Select}
                                            name='label'
                                            label='Label/key'
                                            onChange={ e => {
                                                handleChange(e)
                                                if(e.target.value !== label) {
                                                    setLabeled(false)
                                                    setLabelName('')
                                                }
                                                else setLabeled(true)
                                            }}
                                            fullWidth                                            
                                        >
                                            <MenuItem value='key'>Key</MenuItem>
                                            <MenuItem value={label}>{label}</MenuItem>
                                        </Field>
                                </FormControl>
                                { values.label === label && (
                                    <Field
                                        component={TextField}
                                        name='name'
                                        label='Name' 
                                        onChange={ e => {
                                            handleChange(e)
                                            setLabelName(e.target.value)
                                        }}                                       
                                        fullWidth
                                    />
                                )}
                                    <Button  
                                        variant='contained' 
                                        type='submit'
                                        disabled={finishButton ? true : false}                       
                                        color='primary'
                                        >
                                            Submit
                                    </Button> 
                                
                                { finishButton && 
                                    <Button
                                    onClick={() => handleSubmitFinish()}
                                    variant='contained'                            
                                    color='primary'>
                                        FINISH
                                    </Button>

                                }     
                                           
                        </Form>
                    )}
                </Formik>
            </Box>

        </Box>
    )
}


const Create = () => {
    const [step, setStep] = useState(0)
    const [titleData, setTitleData] = useState({})
    return(
        <>
            {step === 0 ? <InitialForm setStep={setStep} setTitleData={setTitleData}/> : <Keys titleData={titleData}/>}
        </>
    )
}

export default Create