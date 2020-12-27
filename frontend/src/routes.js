import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './pages/LandingPage';
import Profile from './pages/Profile';
import Search from './pages/Search'



export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                
                <Route path="/" exact component={HomePage}/>
                <Route path="/search" component={Search}/>
                <Route path="/profile" component={Profile}/>
                
            </Switch>
        </BrowserRouter>
    )
}