import { Typography } from '@material-ui/core'
import React from 'react'
import { getUser, logout } from '../../services/api'
import { Button } from '@material-ui/core'
import { Header, ProfileInformation } from './styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
const User = () => (
        <Header>
            <ProfileInformation>
                <AccountCircleIcon fontSize="large"/>
                <Typography variant='h5' component='h2'>
                    Welcome, {getUser()}
                </Typography>
            </ProfileInformation>
            <Button onClick={() => logout()}>Log out</Button>
        </Header>
    )

export default User