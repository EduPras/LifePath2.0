import React  from 'react';
import { useHistory } from 'react-router-dom'

import { Formik, Form, Field } from 'formik';
import { Button, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup'

import { createUser } from '../../services/api'

import Loading from '../../components/Loading'

import { centerDivs } from './styles'

const validationSchemaNewUser = Yup.object().shape({
    username: Yup.string().required('Username required'),
    password: Yup.string().required('Password required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    email: Yup.string().email('Must be a valid e-mail').required('E-mail required'),
    name: Yup.string().required('Name required')
})

const Register = () => {
    const history = useHistory()    
    const handleCreateUser = async (values, setSubmitting) => {
        setSubmitting(true)
        await createUser({
            username: values.username,
            password: values.password,
            email: values.email,
            name: values.name
        })
        history.push('/profile')
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
            validationSchema={validationSchemaNewUser}
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
                {isSubmitting && <Loading />}
            </Form>
            )}
            </Formik>
        </>
    )
}

export default Register