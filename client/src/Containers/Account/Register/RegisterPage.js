import React, {useEffect} from "react";
import { NavigationBar } from "../../../components/base/NavigationBar";
import {Card} from 'react-bootstrap';


//TODO: Create basic button that links to authorization page, style after?

const Register = ({register}) => {
    return (
            <body >
                <div class="container">
                    <Card bg="light" style={{margin: 'auto', width: '30rem', marginTop: '50px'}}>
                    <div class="text-center" style={{marginTop:'35px'}}>
                        <font style={{fontSize:40, color: '#667eea'}}>Register</font>
                    </div>
                    <div class="text-center" style={{marginTop: '20px'}}>
                        <h3>Find projects to collaborate on or post your own</h3>
                    </div>
                    <div class="text-center">
                        <a class="btn btn-secondary text-center" style={{width: '320px', marginTop: '50px'}} href="https://github.com/login/oauth/authorize?client_id=08f4f6db13802f8cd769&scope=repo">
                        <img src={require ('./GitHub-Mark-32px.png')}/> &nbsp; <label style={{fontWeight: 'bold', fontSize: '23px', marginTop: '5px'}}>Sign up with GitHub</label>
                        </a>
                    </div>
                    <div class="text-center" style={{marginBottom: '35px'}}>
                        Already have an account? <a href="/login">Log in</a>
                    </div>
                    </Card>
                </div>
            </body> 
)};

export default Register;
