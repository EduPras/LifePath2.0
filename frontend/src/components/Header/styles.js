import styled from 'styled-components'
import { COLORS } from '../../constants/colors'
import css from '../../constants/cssProperties'

export const Header = styled.header`
    margin:0;
    padding: 30px;
    height: 100px;
    position: fixed;
    width: 100vw;
    display:flex;
    justify-content: center;
    align-items: center;
`
export const Item = styled.a`
    margin-right: 20px;
    font-family:'Raleway';
    padding: 5px 10px;
    background-color: ${ props => props.active ? COLORS.secondary : COLORS.white };
    color: ${ props => props.active ? COLORS.white : COLORS.secondary };
    font-size: 20px;
    text-decoration: none;
    transition: 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    &:hover{
        background-color: ${ props => !props.active ? COLORS.lightGray : null };
        transition: 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    }
`
export const ItemContainer = styled.div`
    display:flex;
    justify-content: flex-start;
    min-width: ${css.maxWidthContainer};

`