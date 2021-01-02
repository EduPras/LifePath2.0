import styled from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    margin-bottom: ${({mobile}) => mobile ? '50px' : '0'}
`