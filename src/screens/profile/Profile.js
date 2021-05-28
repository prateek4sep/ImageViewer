import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../../common/Header';
import './Profile.css';

class Profile extends Component {
    render() {
        return (
            <div>
                <Header {...this.props} loggedIn={true} showMyAccount={false} />
        Profile page
            </div>
        )
    }
}

export default withRouter(Profile);