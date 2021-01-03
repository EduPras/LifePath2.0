import React from 'react'
import { useHistory } from 'react-router-dom'
import UserNav from '../../components/UserNav'
import Card from '../../components/Card'
import { LABELS } from '../../constants/labels'

import { Container } from './styles'
import { authed } from '../../services/api'

const Profile = ({ mobile }) =>  {
    const history = useHistory()
    return (
        <>
            {authed() ? 
                <>
                    <UserNav/>
                    <Container>
                        {LABELS.map(label => <Card text={label.text} color={label.color} href={label.href}/>)}
                    </Container>
                </>
            
            : history.push('/')}

        </>
)}
export default Profile