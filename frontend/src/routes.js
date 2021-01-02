import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './pages/LandingPage';
import Profile from './pages/Profile';
import Search from './pages/Search'
import Create from './pages/Create'



export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={HomePage}/>
                <Route path="/search" component={Search}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/create" component={Create}/>
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    )
}