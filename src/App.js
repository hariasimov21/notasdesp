import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Navigation from './components/Navigation';
import CreateUser from './components/CreateUser';
import CreateNote from './components/CreateNote';
import Notelist from './components/Notelist';





function App(){
    return(
        <>
    <Router>
        <Navigation/>
        <Route exact path="/edit/:id" component={CreateNote}/>
        <Route exact path="/create" component={CreateNote}/>
        <Route exact path="/user" component={CreateUser}/>
        <Route exact path="/"  component={Notelist}/>
    </Router>
    </>
    );
}

export default App;