import React, {useEffect} from "react";
import { register } from "../../../actions/registerActions";
import { connect } from "react-redux";
async function githubAuth(register){
    /**
     * This function retrieves the code that github puts on the URL
     * and makes a fetch to the express endpoint /api/users/register/github
     * ?code=something
     */
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    const get_code= (code) =>{
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
        register(code);
    }
}
const Register = ({register}) => {
    useEffect(() => {
        githubAuth(register);   
    }, []);
    return (
    <div>
        <p>
            This is a Register page
            <a href="https://github.com/login/oauth/authorize?client_id=08f4f6db13802f8cd769&scope=repo">
            Login with github
            </a>
        </p>
    </div>
)};

function mapStateToProps(state){
    return {loggedIn: state.register.loggedIn};
}

function mapDispatchToProps(dispatch){
    return {
        register: (auth_code) => {
            dispatch(register(auth_code));
        }
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(Register);
