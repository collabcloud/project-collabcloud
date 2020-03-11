import React from "react";
import LoginForm from "../../../components/base/LoginForm";
import Card from 'react-bootstrap/Card'
import "../../../css/LoginForm.css"
import Alert from "../../../components/base/Alert"

const LoginPage = (props) => {
    return (
    <>
        <div>
            <Card bg="light" className="login-form" style={{ width: '18rem', marginTop: 50 }}>
                <h1 className="header" style ={{marginTop: 10}}>Login</h1>
                <LoginForm/>
            </Card>
            <Alert />
        </div>
    </>
)};

export default LoginPage;
