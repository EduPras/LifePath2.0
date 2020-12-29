import styled from 'styled-components'
import { COLORS } from '../../constants/colors'


export const Circle = styled.div`
    border-radius: ${({labeled}) => labeled ? '6px' : '50%'};
    min-width: 100px;
    height: 100px;
    background-color: ${({labeled}) => labeled ? COLORS.orange : COLORS.secondary};
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);

    a{
        color: white;
        font-size: 20px;
        font-weight:bold;
        font-family: 'Raleway', sans-serif;
        text-align: center;
        color: ${COLORS.black}
    }
`



