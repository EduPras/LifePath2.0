import { Typography } from '@material-ui/core'
import React from 'react'
import { Header, ProfileInformation, Avatar } from './styles'
const User = () => (
        <Header>
            <ProfileInformation>
                <Avatar src='https://pbs.twimg.com/profile_images/1340023405484138496/oTAKheiA_400x400.jpg'/>
                <Typography variant='h5' component='h2'>
                    Welcome, Eduardo
                </Typography>
            </ProfileInformation>
        </Header>
    )

export default User