import React, {useEffect} from "react";

function githubAuth(){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    console.log(vars);
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


}
const Register = () => {
    useEffect(githubAuth);
    return (
    <div>
        <p>
            This is a Register page
            <a href="https://github.com/login/oauth/authorize?client_id=08f4f6db13802f8cd769">
            Login with github
            </a>
        </p>
    </div>
)};

export default Register;
