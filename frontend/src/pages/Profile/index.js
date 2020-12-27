import React from 'react'
import UserNav from '../../components/UserNav'
import Card from '../../components/Card'
import { LABELS } from '../../constants/labels'

import { Container } from './styles'

const Profile = () =>  {
    
    return (
        <>
            <UserNav/>
            <Container>
                {LABELS.map(label => <Card text={label.text} color={label.color}/>)}
            </Container>
        </>
)}
export default Profile