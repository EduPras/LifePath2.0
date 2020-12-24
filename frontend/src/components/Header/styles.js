import styled from 'styled-components'
import COLORS from '../../constants/colors'
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
    margin: 0 20px;
    font-family:'Raleway';
    padding: 5px 10px;
    background-color: ${ props => props.active ? COLORS.secondary : COLORS.white };
    color: ${ props => props.active ? COLORS.white : COLORS.secondary };
    font-size: 20px;
    text-decoration: none;
`
export const ItemContainer = styled.div`
    display:flex;
    justify-content: flex-start;
    min-width: ${css.maxWidthContainer};

`