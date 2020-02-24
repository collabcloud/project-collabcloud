/*
    Packages
*/
import React, {useState, useEffect, useRef} from "react";
import { NavigationBar } from "../../../components/base/NavigationBar";

import { register } from "../../../actions/registerActions";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

const state = require("../../../store");
const Register2 = ({registered,githubExists, register, history}) => {
        

        /*return (<body>
            
            <div class="container">
        
                <div style={{textAlign: "center" ,marginTop: '50px'}}>

                    <form onSubmit={onSubmit}>
                    <div style={{display: "inline-block", textAlign:'left', margin:'20px'}}>
                        
                        <label style={{fontWeight: 'bold', fontSize: '23px', marginTop: '5px'}}>Username</label> <br/>
                        <input className="form-control form-control-md" style={{width: '400px'}} type="text" name="username" onChange={e =>onChange(e)} value={formData.username} placeholder="Enter a Username" required/> <br/>
                        <label style={{fontWeight: 'bold', fontSize: '23px', marginTop: '5px'}}>Password</label> <br/>
                        <input className="form-control form-control-md" type="password" name="password" onChange={e =>onChange(e)} value={formData.password} placeholder="Enter a Password"/> <br />
                        <label style={{fontWeight: 'bold', fontSize: '23px', marginTop: '5px'}}>Confirm Password</label> <br/>
                        <input className="form-control form-control-md" type="password" name="confirmpassword" onChange={e =>onChange(e)} value= {formData.confirmpassword}placeholder=""/> <br/>
                        <input className="btn btn-secondary" type="submit" name="submit" value="Sign Up"/>
                        <div style={{display: "inline-block", textAlign:'left', margin:'20px'}}> 
                        </div>
                    </div>
                    </form>
                    
                </div>
            </div>
        </body>*/
};
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
/**
 * 
 * Standard function that maps Redux state to the Props of Register2
 */
function mapStateToProps(state){
    return {registered: state.register.registered, githubExists: state.register.githubExists, attempted: state.register.attempted};
}
/**
 * 
 * Standard function that maps Redux action dispatches to the Props of Register2
 */
function mapDispatchToProps(dispatch){
    return {
        register: (auth_code, formData) => {
            dispatch(register(auth_code, formData));
            
        }
    };
}
/**
 * Standard connect call
 */
export default connect(mapStateToProps, mapDispatchToProps)(Register2);