import styled from 'styled-components'
import css from '../../constants/cssProperties'

export const Container = styled.div`
    max-width: ${css.maxWidthContainer};
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 100px;
    flex-wrap: wrap;
    margin-top: 50px;
    @media (max-width:${css.maxWidthContainer}){
        flex-direction:column;
        margin: 30px;
    }
`