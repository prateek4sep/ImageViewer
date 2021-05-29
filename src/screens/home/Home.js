import React, {Component} from 'react';
import Header from '../../common/Header';
import './Home.css'
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Container,
    Divider,
    FormControl,
    Grid,
    TextField, Typography
} from '@material-ui/core'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Redirect } from 'react-router-dom';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            searchText: "",
            userImages: [{}],
            filteredImages: [{}],
            id: "18226545019007944",
            url: "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/192178301_773030510062147_6420479614626111894_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=OG9F6vUS-LoAX-9jme2&_nc_ht=scontent-iad3-1.cdninstagram.com&oh=1ac53e5a4b52f29a34a7b8b2dfa07137&oe=60B612B6",
            username: "prateekmehta.dsd19",
            timestamp: "2021-05-26T16:01:50+0000",
            tags: "#upgrad #upgradproject #reactjs",
            likes: [],
            comments: [],
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }

    componentDidMount() {
        this.getUserImages();
    }

    getUserImages = () => {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({userImages:JSON.parse(this.responseText).data});
                that.setState({filteredImages:JSON.parse(this.responseText).data});
            }
        });

        let url = this.props.baseUrl + "me/media?fields=id,caption&access_token=" + sessionStorage.getItem("access-token");
        xhr.open("GET", url);
        xhr.send(data);
    }

    likeHandler = (index) => {
        let likedImages = this.state.likes;
        likedImages[index] = !likedImages[index];
        this.setState({'likes': likedImages})
    }

    commentHandler = (index) => {
        var textField = document.getElementById("textfield-" + index);
        if (textField.value == null || textField.value.trim() === "") {
            return;
        }
        let imageComments = this.state.comments;
        if (imageComments[index] === undefined) {
            imageComments[index] = [textField.value];
        } else {
            imageComments[index] = imageComments[index].concat([textField.value]);
        }

        textField.value = '';

        this.setState({'comments': imageComments})
    }

    searchHandler = (e) => {
        if (this.state.searchText == null || this.state.searchText.trim() === "") {
            this.setState({filteredImages: this.state.userImages});
        } else {
            let filteredForSearch = this.state.userImages.filter((element) => {
                return element.caption !== undefined && (element.caption.toUpperCase().split("\n")[0].indexOf(e.target.value.toUpperCase())) > -1
            });
            this.setState({filteredImages: filteredForSearch});
        }
    }

    handleChange = (e) => {
        this.setState({'searchText': e.target.value}, () => {
            this.searchHandler(e);
        });
    };

    render() {
        if(this.state.loggedIn===false) return <Redirect to="/" />
        else
        return (
            <div>
                <div>
                    <Header {...this.props} loggedIn={true} dpUrl={this.state.url} showMyAccount={true} handleChange={this.handleChange} />
                    </div>
                    <Container className='posts-container'>
                    <Grid container alignContent='center' justify='flex-start' direction='row' spacing={2}>
                        {
                            (this.state.filteredImages || []).map((details, index) => (
                                <Grid item xs={6} key={details.id+"_img"}>
                                    <Card key={details.id}>
                                        <CardHeader
                                            avatar={<Avatar variant="circle" src={this.state.url} className='avatar' />}
                                            title={this.state.username}
                                            subheader={new Date(this.state.timestamp).toLocaleString().replace(",","")} />
                                        <CardMedia style={{ height: 0, paddingTop: '80%', marginBottom: 10 }} image={this.state.url} />
                                        <Divider variant="middle" />
                                        <CardContent>
                                            <div className='caption'>{details.caption}</div>
                                            <div className='tags'> {this.state.tags} </div>
                                            <br />
                                            <div className='likes'>
                                                {
                                                    this.state.likes[index] ?
                                                        <FavoriteIcon fontSize='default' style={{ color: "red" }} onClick={() => this.likeHandler(index)} />
                                                        :
                                                        <FavoriteBorderIcon fontSize='default' onClick={() => this.likeHandler(index)} />
                                                }
                                                <Typography>
                                                    <span>&nbsp;{this.state.likes[index] ? 2 + ' likes' : 1 + ' likes'}</span>
                                                </Typography>
                                            </div>

                                            <div id='comments-container'>
                                                {
                                                    this.state.comments[index] ?
                                                        (this.state.comments)[index].map((comment, index) => (
                                                            <p key={index}>
                                                                <b>{this.state.username}</b> : {comment}
                                                            </p>
                                                        ))
                                                        :
                                                        <p></p>
                                                }
                                            </div>

                                            <div className='post-comment-container'>
                                                <FormControl className='post-comment-form-control'>
                                                    <TextField id={'textfield-' + index} label="Add a comment" />
                                                </FormControl>
                                                <div className='add-button'>
                                                    <FormControl>
                                                        <Button variant='contained' color='primary' onClick={() => this.commentHandler(index)}>ADD</Button>
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Container>
            </div>
        );
    }

}

export default Home;
