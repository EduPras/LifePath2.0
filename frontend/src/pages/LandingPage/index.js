import React from 'react'
import { Container, Logo, SearchContainer } from'./styles.js'
import Header from '../../components/Header'
import ArrowLogo from '../../icons/ArrowLogo/index.js'
import Form from '../../components/InitalForm/index.js'

const LandPage = () => {

    return(
        <>
            <Header/>
            <Container>
                <Logo>
                    <h1>Lifepath</h1>
                    <ArrowLogo/>
                    <SearchContainer>
                        <p>Search in database</p>
                    </SearchContainer>
                </Logo>
                <Form/>
            </Container>
        </>
    )
}
export default LandPage