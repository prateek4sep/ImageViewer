import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Card, CardContent, Link, Typography } from '@material-ui/core';
import './Login.css';
import Header from '../../common/Header';
import { withRouter } from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            usernameRequiredLabel: "hide",
            passwordRequiredLabel: "hide",
            invalidLoginLabel: "hide",
            userLoggedIn: false
        }
    }

    usernameChangedHandler = (e) => {
        this.setState({invalidLoginLabel:"hide"});
        this.setState({username: e.target.value});
    }

    passwordChangedHandler = (e) => {
        this.setState({invalidLoginLabel:"hide"});
        this.setState({password: e.target.value});
    }

    loginClickedHandler = () => {
        let mockUsername = "upgrad";
        let mockPassword = "upgrad";
        let accessToken = "IGQVJYeE10eEU1Vm9CTGlsbmNrMEw1QUtVTFRmcGZA2UjZAMYWJhNjZADRVREWDNINThVRzZAjNF9zVWlVYkcyQXNCamZAwRTMtU3pDNUl4VG5fV3hkM0ZAOTENuTEI4NVIyRGwyeDJjbGQ1cHZAxZA3h3ME5BRwZDZD";

        this.state.username === "" ? this.setState({usernameRequiredLabel:"red"}) : this.setState({usernameRequiredLabel:"hide"});
        this.state.password === "" ? this.setState({passwordRequiredLabel:"red"}) : this.setState({passwordRequiredLabel:"hide"});

        if (this.state.username === mockUsername && this.state.password === mockPassword) {
            window.sessionStorage.setItem("access-token", accessToken);
            this.setState({invalidLoginLabel:"hide"});
            this.setState({userLoggedIn:true});
            this.props.history.push('/home');
        } else {
            if(this.state.username !== "" && this.state.password !== "")
                this.setState({invalidLoginLabel:"red"});
        }

    }

    render() {
        return (
            <div>
                <Header {...this.props} loggedIn={false}/>
            <div className="loginFormContainer">
                <Card className="card">
                    <CardContent className="card-content">
                        <Typography variant="h5">LOGIN</Typography>
                        <br />
                        <FormControl className="form-control" required>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" type="text" onChange={this.usernameChangedHandler} />
                            <FormHelperText>
                                <span className={this.state.usernameRequiredLabel}>required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl className="form-control" required>
                            <InputLabel htmlFor="loginPassword">Password</InputLabel>
                            <Input id="loginPassword" type="password" onChange={this.passwordChangedHandler}  />
                            <FormHelperText>
                                <span className={this.state.passwordRequiredLabel}>required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormHelperText>
                             <span className={this.state.invalidLoginLabel}>Incorrect username and/or password</span>
                        </FormHelperText>
                        <br />
                        <Link to="/home"><Button variant="contained" color="primary" onClick={this.loginClickedHandler}>LOGIN</Button></Link>
                    </CardContent>
                </Card>
            </div>
            </div>
        );
    }
}

export default withRouter(Login);