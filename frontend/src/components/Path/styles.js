import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import { COLORS } from '../../constants/colors'

export const LabelContainer = styled.div`
    min-width: 200px;
    height: 100%;
    min-height: 100%;
`
export const PathContainer = styled.div`    
    display:flex;
    align-items:center;
    justify-content: space-around;
    flex-direction:column;
    background-color: ${COLORS.cream};
    border: 1px solid ${COLORS.cream};
    flex: 1;
    padding: 20px;
    position: relative;
`
export const Container = styled.div`
    display: flex;
    height: 800px;
`
export const SelectPath = styled.div`
    width: 50px;
    height: 50px;
    background-color: ${COLORS.primary};
    font-family: 'Raleway';
    font-weight: bold;
    font-size: 25px;
    display: flex;
    border-radius: 50%;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity:${({active}) => active ? '1' : '0.4'};
    transition: 0.25s ease;
    &:hover{
        opacity: 1;
        transition: 0.25s ease;
    }
`
export const SelectPathContainer = styled.ul`
    position: absolute;
    padding: 0;
    top: 10px;
    left: 10px;
    gap: 15px;
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
`

export const useStyle = makeStyles({
    listContainer: {
        overflowY: 'scroll',
        height: 'inherit'
    }
})