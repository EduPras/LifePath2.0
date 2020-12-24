import React, { useState } from 'react'
import {  Header as HeaderContainer, Item, ItemContainer } from './styles'
const Header = () => {
    const [active, setActive] = useState('Home')  
    return(
        <HeaderContainer>
            <ItemContainer>
                <Item href="#" 
                    active={active === 'Home' ? true : false}
                    onClick={() => setActive('Home')}
                >
                    Home
                </Item>
                <Item href="#" 
                    active={active === 'About' ? true : false}
                    onClick={() => setActive('About')}
                 >
                    About
                </Item>
                <Item href="#" 
                    active={active === 'Contact' ? true : false}
                    onClick={() => setActive('Contact')}
                >
                    Contact
                </Item>
            </ItemContainer>
        </HeaderContainer>
    )
}

export default Header