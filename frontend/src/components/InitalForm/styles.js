import styled from 'styled-components'
import { COLORS } from '../../constants/colors'
import {motion} from 'framer-motion'

export const Container = styled(motion.div)`
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    box-shadow: 0 4px 14px #00000047;
    background-color: white;
`
export const centerDivs = {
    display:'flex', 
    justifyContent:'center', 
    alignItems:'center',
    flexDirection:'column'
}

export const Button = styled(motion.button)`
    background-color:transparent;
    outline: none;
    border: none;
    color:${COLORS.primary};
    font-size: 24px;
    margin-top: 10px;
    cursor: pointer;
    font-family: 'Raleway';
    transition: 0.25s;
    &:hover{
        transition: 0.25s;
        color:${COLORS.darkPrimary};
    }
`