import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { COLORS } from '../../constants/colors'
import css from '../../constants/cssProperties'

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 50px;
    width:${css.maxWidthContainer};
    margin: auto;
    align-items: center;
    height:100vh;
    @media (max-width: ${css.maxWidthContainer}) {
        flex-direction: column;
        width:auto;
        justify-content: space-around;
    }

`

export const Logo = styled.div`
    margin-bottom: 100px;
    h1{
        font-size: 90px;
        margin-bottom: 20px;
        font-family:  'Libre Baskerville', serif;
        @media (max-width: ${css.maxWidthContainer}) {
            text-align:center;
        }
    }
`
export const SearchContainer = styled(Link)`
    background-color: black;
    width: 400px;
    display:flex;
    justify-content: center;
    margin-top: 50px;
    text-decoration:none;
    transition: 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    cursor: pointer;
    @media (max-width: ${css.maxWidthContainer}) {
        width:100%;
    }
    p{
        color: white;
        font-family:'Raleway';
        font-size: 20px;
        padding: 15px 20px;        
    }
    &:hover{
        background-color: ${COLORS.gray58};
        transition: 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    }

`