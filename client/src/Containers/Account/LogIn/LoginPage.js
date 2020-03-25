import React, { useEffect } from "react";
import LoginForm from "../../../components/base/LoginForm";
import Card from 'react-bootstrap/Card'
import "../../../css/LoginForm.css"
import Alert from "../../../components/base/Alert"
import { setRegisterMessage } from "../../../actions/loginActions";
import { connect } from "react-redux";
const LoginPage = (props) => {
    useEffect(function(){
        
        if(props.location.state){
            console.log("hi");
            var temp = props.location.state;
            if(!temp.message) return;
            console.log(temp.message);
            props.setRegisterMessage(temp.message, temp.type, 4000);
        }
    },[]);
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

function mapStateToProps(state){
    return {};
}
/**
 * 
 * Standard function that maps Redux action dispatches to the Props of Register2
 */
function mapDispatchToProps(dispatch){
    return {
        setRegisterMessage: (message, type, timeout) => {
            dispatch(setRegisterMessage(message, type, timeout));
            
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
