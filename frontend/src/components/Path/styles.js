import styled from 'styled-components';
import { COLORS } from '../../constants/colors'

export const LabelContainer = styled.div`
    min-width: 100px;
    height: 100%;
    min-height: 100%;
`
export const PathContainer = styled.div`    
    display:flex;
    align-items:center;
    justify-content: space-around;
    flex-direction:column;
    flex: 1;
`
export const Container = styled.div`
    display: flex;
    height: 800px;
`
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
`
export const Item = styled.li`
    list-style:none;
    display:flex;
    justify-content: center;
    align-items:center;
    flex-direction:column;
`
export const Text = styled.p`
    padding: 10px 15px;
    border-radius: 3px;
    background-color: ${COLORS.lightGray};
    font-family: 'Raleway';
    font-size: 16px;
    margin-bottom: 7px;
`