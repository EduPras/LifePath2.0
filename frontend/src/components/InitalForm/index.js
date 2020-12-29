import React, {useState } from 'react';
import * as Yup from 'yup';
import Register from './register'
import Login from './login'

import { Container, Button } from './styles'
import './index.css'

const validationSchemaLogin = Yup.object().shape({
    username: Yup.string().required('Username required'),
    password: Yup.string().required('Password required')
})

const validationSchemaNewUser = Yup.object().shape({
    username: Yup.string().required('Username required'),
    password: Yup.string().required('Password required'),
    confirmPassword: Yup.string().required('Confirm password required'),
    email: Yup.string().email('Must be a valid e-mail').required('E-mail required'),
    name: Yup.string().required('Name required')
})

function App() {

    const [isRegister, setIsRegister] = useState(false)

    return (
            <div>
                <Container>
                    {isRegister ?
                        <Register 
                            validationSchema={validationSchemaNewUser} 
                            setIsRegister={setIsRegister} 
                        /> : 
                        <Login 
                            validationSchema={validationSchemaLogin}
                            setIsRegister={setIsRegister} 
                        />}
                </Container>
                {!isRegister ? 
                    <Button onClick={() => setIsRegister(!isRegister)}>
                        Create account
                    </Button>
                    :
                    <Button onClick={() =>setIsRegister(!isRegister)}>
                        Log in
                    </Button>
                }
            </div>
    );
}

export default App