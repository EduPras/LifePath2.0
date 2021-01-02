import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './pages/LandingPage';
import Profile from './pages/Profile';
import Search from './pages/Search'
import Create from './pages/Create'
import KeyPage from './pages/KeyPage'



export default function Routes(){
    const [mobile, setMobile] = useState(window.innerWidth < 900 ? true : false)
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 1350) {
            setMobile(true)
        } else setMobile(false)
      }
      window.addEventListener('resize', handleResize)
      handleResize()
    }, [])
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact render={ props => <HomePage {...props} mobile={mobile}/>}/>
                <Route path="/search" render={ props => <Search {...props} mobile={mobile}/>}/>
                <Route path="/profile" render={ props => <Profile {...props} mobile={mobile}/>}/>
                <Route path="/create" render={ props => <Create {...props} mobile={mobile}/>}/>
                <Route path="/key/:title" render={ props => <KeyPage {...props} mobile={mobile}/>}/>
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    )
}