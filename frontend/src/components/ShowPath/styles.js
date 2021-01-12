import styled from 'styled-components'
import { COLORS } from '../../constants/colors'

export const Grid = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding:0;
    gap: 10px;
    width: 100%;
    height: 80%;
    overflow-y: scroll;
    padding: 20px;
`
export const Item = styled.li`
    list-style:none;
    display:flex;
    justify-content: center;
    align-items:center;
    flex-direction:column;
    cursor: ${({clickable}) => clickable && 'pointer' };
`
export const Text = styled.p`
    padding: 10px 15px;
    border-radius: 3px;
    background-color: ${COLORS.lightGray};
    font-family: 'Raleway';
    font-size: 16px;
    margin-bottom: 7px;
`