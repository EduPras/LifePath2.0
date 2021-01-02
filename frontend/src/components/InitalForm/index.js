import React, {useState } from 'react';
import Register from './register'
import Login from './login'

import { Container, Button } from './styles'
import './index.css'

function App() {

    const [isRegister, setIsRegister] = useState(false)

    return (
                <Container>
                    {isRegister 
                        ?(
                            <>
                                <Register/> 
                                <Button onClick={() =>setIsRegister(!isRegister)}>
                                    Log in
                                </Button>
                            </>
                        )
                        : (
                            <>
                                <Login />
                                <Button onClick={() => setIsRegister(!isRegister)}>
                                    Create account
                                </Button>
                            </>
                        )
                        }
                </Container>
    );
}

export default App