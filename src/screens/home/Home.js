import React, { Component } from 'react';
import Header from '../../common/Header';
import { withRouter } from 'react-router-dom';
import './Home.css'

class Home extends Component {
    constructor() {
        super();
        this.state = {
            userImages: [{}],
            id: "18226545019007944",
            url: "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/192178301_773030510062147_6420479614626111894_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=OG9F6vUS-LoAX-9jme2&_nc_ht=scontent-iad3-1.cdninstagram.com&oh=1ac53e5a4b52f29a34a7b8b2dfa07137&oe=60B612B6",
            username: "prateekmehta.dsd19",
            timestamp: "2021-05-26T16:01:50+0000",
            tags: "#upgrad #upgradproject #reactjs",
            likes: [],
            comments: []
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
                that.setState({ userImages: JSON.parse(this.responseText).data });
            }
        });

        let url = this.props.baseUrl + "me/media?fields=id,caption&access_token=" + sessionStorage.getItem("access-token");
        xhr.open("GET", url);
        xhr.send(data);
        console.log(this.state.userImages);
    }

    render() {
        return (
            <div>
                <div>
                    <Header {...this.props} loggedIn={true}
                        dpUrl={this.state.url} showMyAccount={true} />
                </div>
                Home Page
            </div>
        );
    }

}

export default withRouter(Home);