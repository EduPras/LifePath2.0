import { Typography } from '@material-ui/core'
import React from 'react'
import { getUser } from '../../services/api'
import { Header, ProfileInformation, Avatar } from './styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
const User = () => (
        <Header>
            <ProfileInformation>
                <AccountCircleIcon fontSize="large"/>
                <Typography variant='h5' component='h2'>
                    Welcome, {getUser()}
                </Typography>
            </ProfileInformation>
        </Header>
    )

export default User