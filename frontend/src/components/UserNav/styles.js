import styled from 'styled-components'
import css from '../../constants/cssProperties'

export const Header = styled.div`
    max-width: ${css.maxWidthContainer};
    display:flex;
    justify-content: space-between;
    padding: 30px;
    margin: auto;
`
export const ProfileInformation = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 30px;
`
export const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`