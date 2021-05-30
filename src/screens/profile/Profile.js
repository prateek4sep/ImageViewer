import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../../common/Header';
import './Profile.css';
import {
    Avatar,
    Container,
    Fab,
    Typography,
    Grid,
    Modal,
    FormControl,
    InputLabel,
    Input,
    Button,
    FormHelperText,
    Card,
    CardMedia
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
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
            numPosts: Math.round(Math.random() * 100),
            followedBy: Math.round(Math.random() * 100),
            following: Math.round(Math.random() * 100),
            nameEditModalOpen: false,
            nameEditModalClose: true,
            nameRequireLabel: "hide",
            imageDetailsModalOpen: false,
            imageDetailsModalClose: true,
            imageSelectedForDetails: null,
            indexOfImageSelectedForDetails: null
        }
    }

    editNameFieldChangeHandler = (e) => {
        if (e.target.value === '') {
            this.setState({newFullName: e.target.value})
        } else {
            this.setState({newFullName: e.target.value})
        }
    }

    editNameUpdateButtonHandler = () => {
        if (this.state.newFullName == null || this.state.newFullName.trim() === "") {
            this.setState({
                nameRequireLabel: "show"
            })
        } else {
            this.setState({
                fullName: this.state.newFullName,
                newFullName: '',
                nameRequireLabel: "hide"
            })

            this.closeEditNameModalHandler();
        }

    }

    openEditNameModalHandler = () => {
        this.setState({nameEditModalOpen: true, nameEditModalClose: false})
    }

    closeEditNameModalHandler = () => {
        this.setState({nameEditModalOpen: false, nameEditModalClose: true})
    }

    imageForDetailsClickHandler = (image, index) => {
        this.setState({imageSelectedForDetails: image, indexOfImageSelectedForDetails: index})
        this.openImageDetailsModalHandler()
    }

    openImageDetailsModalHandler = () => {
        this.setState({imageDetailsModalOpen: true, imageDetailsModalClose: false})
    }

    closeImageDetailsModalHandler = () => {
        this.setState({imageDetailsModalOpen: false, imageDetailsModalClose: true})
    }


    async componentDidMount() {
        let getUserImages = this.props.baseUrl + "me/media?fields=id,caption&access_token=" + sessionStorage.getItem("access-token");
        let getPostDetails = this.props.baseUrl + "$postId" + "?fields=id,media_type,media_url,username,timestamp&access_token=" + sessionStorage.getItem("access-token");

        let response = await fetch(getUserImages);
        let posts = await response.json();
        posts = posts.data;

        for (let i = 0; i < posts.length; i++) {
            response = await fetch(getPostDetails.replace('$postId', posts[i].id));
            let details = await response.json();
            posts[i].url = details.media_url;
            posts[i].username = details.username;
            posts[i].timestamp = details.timestamp;
            posts[i].comments = [];
            posts[i].tags = "#upgrad #upgradproject #reactjs";
            posts[i].likes = Math.round(Math.random() * 100);
        }
        this.setState({ userImages: posts });
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
                                        Posts:&nbsp;{this.state.numPosts}
                                    </Grid>
                                    <Grid item xs={4}>
                                        Follows:&nbsp;{this.state.following}
                                    </Grid>
                                    <Grid item xs={4}>
                                        Followed By:&nbsp;{this.state.followedBy}
                                    </Grid>
                                </Grid>
                                <Typography variant="h6" component="h2" style={{ marginTop: 5 }}>
                                    {this.state.fullName}
                                    <Fab color="secondary" id="edit-name" aria-label="edit" onClick={this.openEditNameModalHandler}>
                                        <EditIcon fontSize="small" />
                                    </Fab>
                                </Typography>

                                <Modal open={this.state.nameEditModalOpen} onClose={this.closeEditNameModalHandler} >
                                    <div className="edit-modal" >
                                        <Typography variant="h5" style={{ paddingBottom: 15 }}>
                                            Edit
                                        </Typography>
                                        <FormControl required>
                                            <InputLabel htmlFor="fullName">Full Name</InputLabel>
                                            <Input id="fullName" type="text" onChange={this.editNameFieldChangeHandler} />
                                            <FormHelperText>
                                                <span className={this.state.nameRequireLabel} style={{ color: "red" }}>required</span>
                                            </FormHelperText>
                                        </FormControl>
                                        <div style={{ marginTop: 25 }}>
                                            <Button variant="contained" color="primary"
                                                onClick={this.editNameUpdateButtonHandler}>UPDATE</Button>
                                        </div>
                                    </div>
                                </Modal>

                            </Grid>
                            <Grid item xs={4} />
                        </Grid>
                    </Container>
                    <Container>
                        <Grid container spacing={0} direction="row" alignItems="center">
                            {this.state.userImages &&
                                this.state.userImages.map((details, index) => (
                                    <Grid item xs={4} key={details.id} onClick={() => this.imageForDetailsClickHandler(details)} className="image-on-grid" >
                                        <Card variant="outlined">
                                            <CardMedia style={{ height: 0, paddingTop: '100%' }}
                                                image={details.url} />
                                        </Card>
                                    </Grid>
                                ))}
                        </Grid>
                        <Modal open={this.state.imageDetailsModalOpen} onClose={this.closeImageDetailsModalHandler}>
                        <div className="selected-image-modal">
                            <Grid container spacing={2} direction="row" justify="center" alignItems='flex-start'>
                                <Grid item xs={6}>
                                    {this.state.imageSelectedForDetails ? (
                                        <img alt={this.state.indexOfImageSelectedForDetails} src={this.state.imageSelectedForDetails.url}
                                             style={{height: "100%",width: "100%"}}/>
                                    ) : null}
                                </Grid>
                                
                            </Grid>
                        </div>
                    </Modal>
                    </Container>
                </div>
            )
    }
}

export default Profile;