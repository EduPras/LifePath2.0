import React  from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { TextField } from 'formik-material-ui';

import { createUser } from '../../services/api'

import { centerDivs } from './styles'

const Register = ({ validationSchema, setIsRegister }) => {
    
    const handleCreateUser = async (values, setSubmitting) => {
        setSubmitting(true)
        const data = await createUser({
            "username": "edupras",
            "password": "edupras",
            "email": "edu@gmail.com",
            "name": "Eduardo Prasniewski"})
        console.log(data)
        setSubmitting(false)
    }

    return(
        <>
            <Typography variant="h5" color="primary" >
            Register
            </Typography>
            <Formik
            initialValues={{
                username: '',
                password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, {setSubmitting}) => handleCreateUser(values, setSubmitting)}
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
                    <Box mb={2} minWidth={300}>
                        <Field
                            component={TextField}
                            name="confirmPassword"
                            variant="outlined"
                            type="password"
                            label="Confirm password"
                            fullWidth
                            
                        />
                    </Box>
                    <Box mb={2} minWidth={300}>
                        <Field
                            component={TextField}
                            name="name"
                            variant="outlined"
                            type="text"
                            label="Name"
                            fullWidth
                            
                        />
                    </Box>
                    <Box mb={2} minWidth={300}>
                        <Field
                            component={TextField}
                            name="email"
                            variant="outlined"
                            type="e-mail"
                            label="E-mail"
                            fullWidth
                            
                        />
                    </Box>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                    onClick={submitForm}
                >
                    Submit
                </Button>
                {isSubmitting && <LinearProgress />}
            </Form>
            )}
            </Formik>
        </>
    )
}

export default Register