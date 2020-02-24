import React , { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "../../css/LoginForm.css"



export function RegisterForm(props) {

   
    useEffect(() => {
    if (githubExists){
        console.log("authFailed");
        history.push({
            pathname:'/login',
            state: {message: "You already signed up with github"}
        })
    }
    else if(registered){
        console.log("registered");
    }
    else if(attempted){
        console.log("Failed attempt")
    }
    });
     /*
            The form data that will be submitted.
            Simply add more entries on the object to add more
            entries in the form submission
        */
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmpassword: ""
    });
     /**
      * Modify the formData when something has been changed
      * 
      */
    const onChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }
     /**
      * Submit the form through redux to the server 
      * 
      * */
     //TODO: Redirect to /login if loggedIn is true
    async function onSubmit(e){
        e.preventDefault();
        githubAuth(register, formData);
        
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

/**
 * This function retrieves the code that github puts on the URL
 * and makes a fetch to the express endpoint /api/users/register/github
 * ?code=something
 */
async function githubAuth(register, formData){
    
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    const get_code = (code) =>{
        for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if (pair[0] === code) {
            return pair[1]
        }
    }
    
    }; 
    const code = get_code("code");
    console.log(code);
    if(code){
        register(code, formData);
    }
}