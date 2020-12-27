import styled from 'styled-components'
import { COLORS } from '../../constants/colors'
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
        font-size: 90px;
        margin-bottom: 20px;
        font-family:  'Libre Baskerville', serif;
    }
`
export const SearchContainer = styled.div`
    background-color: black;
    max-width: 400px;
    display:flex;
    justify-content: center;
    margin-top: 50px;
    transition: 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    p{
        color: white;
        font-family:'Raleway';
        font-size: 20px;
        padding: 15px 20px;
        cursor: pointer;
    }
    &:hover{
        background-color: ${COLORS.gray58};
        transition: 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    }

`