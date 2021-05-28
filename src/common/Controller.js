import React, { Component } from 'react';
import Home from '../screens/home/Home';
import Login from '../screens/login/Login';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

class Controller extends Component {

    constructor() {
        super();
        this.state = {
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
        this.baseUrl = "https://api.instagram.com/v1/users/self/";
    }

    render() {
        return (
            <div>
                <Router>
                    <Route exact path='/' render={(props) => <Login {...props}  baseUrl={this.baseUrl}/>} />
                    <Route exact path='/home' render={(props) => this.state.loggedIn ? (<Home {...props} baseUrl={this.baseUrl} />) : (<Redirect to='/' />)} />
                </Router>
            </div>
        );
    }
}

export default Controller;