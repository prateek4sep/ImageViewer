import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Card, CardContent, Typography } from '@material-ui/core';
import './Login.css';

class Login extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="loginFormContainer">
                <Card className="card">
                    <CardContent className="card-content">
                        <Typography variant="h5">LOGIN</Typography>
                        <br />
                        <FormControl className="form-control" required>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" type="text" />
                            <FormHelperText>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl className="form-control" required>
                            <InputLabel htmlFor="loginPassword">Password</InputLabel>
                            <Input id="loginPassword" type="password" />
                            <FormHelperText>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br /><br />
                        <Button variant="contained" color="primary">LOGIN</Button>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default Login;