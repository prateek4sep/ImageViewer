import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../../common/Header';
import './Profile.css';
import {
    Avatar,
    Container,
    Fab,
    Typography,
    Grid
} from '@material-ui/core/';
import EditIcon from '@material-ui/icons/Edit';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            userImages: [],
            id: "18226545019007944",
            username: "prateekmehta.dsd19",
            fullName: "Prateek Mehta",
            likes: [],
            url: "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/192178301_773030510062147_6420479614626111894_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=OG9F6vUS-LoAX-9jme2&_nc_ht=scontent-iad3-1.cdninstagram.com&oh=1ac53e5a4b52f29a34a7b8b2dfa07137&oe=60B612B6",
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }

    render() {
        if (this.state.loggedIn === false) return <Redirect to="/" />
        else
            return (
                <div>
                    <Header {...this.props} loggedIn={true} showMyAccount={false} dpUrl={this.state.url} />
                    <Container>
                        <div style={{ height: 32 }}></div>
                        <Grid container spacing={3} justify="flex-start">
                            <Grid item xs={2} />
                            <Grid item xs={2} style={{ paddingTop: 25 }}>
                                <Avatar alt='profile_pic' id="dp" variant="circle" src={this.state.url} style={{ marginTop: 10 }} />
                            </Grid>
                            <Grid item xs={5} id='info-container'>
                                <Typography variant="h4" component="h1" style={{ paddingBottom: 15 }}>
                                    {this.state.username}
                                </Typography>
                                <Grid container spacing={3} justify="center" style={{ paddingBottom: 15 }}>
                                    <Grid item xs={4}>
                                        Posts:{" "}
                                        {Math.round(Math.random() * 100)}
                                    </Grid>
                                    <Grid item xs={4}>
                                        Follows:{" "}
                                        {Math.round(Math.random() * 1000)}
                                    </Grid>
                                    <Grid item xs={4}>
                                        Followed By:{" "}
                                        {Math.round(Math.random() * 1000)}
                                    </Grid>
                                </Grid>
                                <Typography variant="h6" component="h2" style={{ marginTop: 5 }}>
                                    {this.state.fullName}
                                    <Fab color="secondary" id="edit-name" aria-label="edit" >
                                        <EditIcon fontSize="small" />
                                    </Fab>
                                </Typography>

                            </Grid>
                            <Grid item xs={4} />
                        </Grid>
                    </Container>
                </div>
            )
    }
}

export default Profile;