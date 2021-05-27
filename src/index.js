import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './common/Header';
import Login from './screens/login/Login';
import './common/Header.css';

ReactDOM.render(
    <React.StrictMode>
        <div>
        <Header />
        <Login />
        </div>
    </React.StrictMode>,
    document.getElementById('root')
);