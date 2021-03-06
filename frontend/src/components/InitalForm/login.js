import React, { useState }  from 'react';
import { useHistory } from 'react-router-dom';

import { Formik, Form, Field } from 'formik';
import { Button, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';

import { login } from '../../services/api'

import Loading from '../../components/Loading'
import Alert from '../../components/Alert'

import { centerDivs } from './styles'

const validationSchemaLogin = Yup.object().shape({
    username: Yup.string().required('Username required'),
    password: Yup.string().required('Password required')
})

const Login = () => {
    const history = useHistory()
    // alert
    const [alertMessage, setAlertMessage] = useState('')
    const [alertStatus, setAlertStatus] = useState(200)
    const [isToasting, setIsToasting] = useState(false)  

    const handleAlert = ( message, status) => {
        if (status !== 200){
            setAlertMessage(message)
            setAlertStatus(status)
            setIsToasting(true)
        }
    }

    const handleLogin = async(values, setSubmitting) => {
        setSubmitting(true)
        const { message, status } = await login({
            username: values.username,
            password: values.password
        })
        handleAlert(message, status)
        if( status === 200 ) history.push('/profile')
        setSubmitting(false)
}

    return (
        <>
            <Typography variant="h5" color="primary" >
            Log in 
            </Typography>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                validationSchema={validationSchemaLogin}
                onSubmit={(values, {setSubmitting}) => handleLogin(values, setSubmitting)}
                >
                {({ submitForm, isSubmitting }) => (
                    <Form style={centerDivs}>
                        <Box mb={2} mt={2} minWidth={300}>
                            <Field
                                component={TextField}
                                name="username"
                                variant="outlined"
                                type="text"
                                label="Username"
                                fullWidth
                                
                                
                            />
                        </Box>
                        <Box mb={2} minWidth={300}>
                            <Field
                                component={TextField}
                                type="password"
                                label="Password"
                                variant="outlined"
                                name="password"
                                fullWidth
                            />
                        </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        onClick={submitForm}
                    >
                        Submit
                    </Button>
                    {isSubmitting && <Loading />}
                    </Form>
                )}
                
            </Formik>
            {isToasting && 
                <Alert 
                    message={alertMessage} 
                    status={alertStatus} 
                    setIsToasting={setIsToasting}
                />
            } 
        </>
    )
}

export default Login