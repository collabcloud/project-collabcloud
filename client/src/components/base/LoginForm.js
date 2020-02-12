import React , { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "../../css/LoginForm.css"



export function LoginForm(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);


    const handleSubmit = (e) => {
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
        }

        setValidated(true);
        alert(`Submitting ${username} ${password}`);
    }

    return (
        <div>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="login-form">
                <Form.Group controlId="formBasicUsername">
                    <Form.Label 
                        className="float-left">Username</Form.Label>
                    <Form.Control  
                        required
                        name="username"
                        type="text" 
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
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
                        onChange={(e) => setPassword(e.target.value)}/>
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