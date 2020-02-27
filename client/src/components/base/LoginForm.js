import React , { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { login } from "../../actions/loginActions";
import { connect } from "react-redux";

import "../../css/LoginForm.css"
import { useHistory } from "react-router-dom";



function LoginForm({loggedIn, login}){

    const [validated, setValidated] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const {username, password} = formData;

    const history = useHistory();

    useEffect(() => {
        console.log(loggedIn);
        if(loggedIn){
            console.log("logged in!");
            history.push("/dashboard");
            //redirect to /dashboard
        }
    });

    const onChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(login)
        
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
         e.preventDefault();
         e.stopPropagation();
        }

        setValidated(true);
        // alert(`Submitting ${username} ${password}`);
        submitLoginForm(login,username,password);        
    }

    return (
        <div>
            <Form noValidate validated={validated} onSubmit={onSubmit} className="login-form">
                <Form.Group controlId="formBasicUsername">
                    <Form.Label 
                        className="float-left">Username</Form.Label>
                    <Form.Control  
                        required
                        name="username"
                        type="text" 
                        placeholder="Enter username"
                        value={username}
                        onChange={e => onChange(e)} />
                    <Form.Control.Feedback type="invalid">Please enter your username</Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label
                        className="float-left">Password</Form.Label>
                    <Form.Control
                        required 
                        name="password"
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={e => onChange(e)}/>
                        <Form.Control.Feedback type="invalid">Please enter your password</Form.Control.Feedback>
                </Form.Group>
                    <Button variant="outline-primary" type="submit" block>
                        Submit
                    </Button>
            </Form>
            <div>
            <img
                alt=""
                src={require('../../logo.png')}
                width="70"
                height="35"
                style={{marginTop: 40, marginBottom: 20}}/>

            </div>

        </div>
    );
} 

async function submitLoginForm(login, username, password){
    console.log(username);
    console.log(password);
    login(username,password);
}

function mapStateToProps(state){
    return {loggedIn: state.login.loggedIn};
}

function mapDispatchToProps(dispatch){
    return {
        login: (username, password) => {
            dispatch(login(username, password));
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);