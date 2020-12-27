import styled from 'styled-components'

export const Card = styled.div`
    width: 500px;
    height: 300px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    box-shadow:0 7px 10px 2px #0000004a;
    border-radius: 8px;
    background-color: white;
    cursor: pointer;
    transition: 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
    &:hover{
        transform: scale(1.05);
        box-shadow:0 7px 10px 6px #0000004a;
        transition: 0.2s cubic-bezier(0.075, 0.82, 0.165, 1); 
    }
`