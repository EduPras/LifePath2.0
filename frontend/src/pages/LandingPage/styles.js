import styled from 'styled-components'
import css from '../../constants/cssProperties'

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    max-width:${css.maxWidthContainer};
    margin: auto;
    align-items: center;
    height:100vh;

`

export const Logo = styled.div`
    margin-bottom: 100px;
    h1{
        font-size: 100px;
        margin-bottom: 20px;
    }
`
export const SearchContainer = styled.div`
    background-color: black;
    max-width: 400px;
    display:flex;
    justify-content: center;
    margin-top: 50px;
    p{
        color: white;
        font-family:'Raleway';
        font-size: 20px;
        padding: 15px 20px;
    }
`

export const FormContainer = styled.div`
    background-color: green;
`