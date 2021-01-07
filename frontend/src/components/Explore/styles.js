import styled from 'styled-components'
import { COLORS } from '../../constants/colors'

export const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: ${COLORS.secondary};
    color: white;
    font-size:32px;
    display:flex;
    align-items: center;
    justify-content: center;
`
export const Sentence = styled.button`
    width:100%;
    border:none;
    outline: none;
    cursor: pointer;
    padding: 20px;
    background-color: ${({active}) => !active ? COLORS.cream : COLORS.orange};
`

export const ExploreContainer = styled.div`
    min-width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 30px 30px 0 10px;
    height: 100%;
`
export const ShowContainer = styled.div`
    flex: 1;
    background-color: ${COLORS.cream};
    border: 1px solid ${COLORS.lightGray};
    border-radius:3px;
    margin-right: 10px;
`