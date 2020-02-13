import React, {useState} from "react";
import { NavigationBar } from "../../../components/base/NavigationBar";

import { register } from "../../../actions/registerActions";
import { connect } from "react-redux";

const Register2 = ({register}) => {

        const [formData, setFormData] = useState({
            username: "",
            password: ""
        });

        const {username, password} = formData;

        const onChange = e =>{
            setFormData({...formData, [e.target.name]: e.target.value});
        }

        function onSubmit(e){
            e.preventDefault()
            githubAuth(register, username, password);
        }
        return (<body>
            
            <div class="container">
        
                <div style={{textAlign: "center" ,marginTop: '50px'}}>

                    <form onSubmit={onSubmit}>
                    <div style={{display: "inline-block", textAlign:'left', margin:'20px'}}>
                        
                        <label style={{fontWeight: 'bold', fontSize: '23px', marginTop: '5px'}}>Username</label> <br/>
                        <input className="form-control form-control-md" style={{width: '400px'}} type="text" name="username" onChange={e =>onChange(e)} value={username} placeholder="Enter a Username" required/> <br/>
                        <label style={{fontWeight: 'bold', fontSize: '23px', marginTop: '5px'}}>Password</label> <br/>
                        <input className="form-control form-control-md" type="password" name="password" onChange={e =>onChange(e)} value={password} placeholder="Enter a Password"/> <br />
                        <label style={{fontWeight: 'bold', fontSize: '23px', marginTop: '5px'}}>Confirm Password</label> <br/>
                        <input className="form-control form-control-md" type="password" name="confirmpassword" placeholder=""/> <br/>
                        <input className="btn btn-secondary" type="submit" name="submit" value="Sign Up"/>
                        
                    </div>
                    </form>
                    
                </div>
            </div>
        </body>
)};

async function githubAuth(register, username, password){
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
    console.log(username);
    console.log(password);
    console.log(register);
    if(code){
        console.log(username);
        console.log(password);
        console.log(register);
        register(code, username, password);
    }
}

function mapStateToProps(state){
    return {loggedIn: state.register.loggedIn};
}

function mapDispatchToProps(dispatch){
    return {
        register: (auth_code, username, password) => {
            dispatch(register(auth_code, username, password));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register2);