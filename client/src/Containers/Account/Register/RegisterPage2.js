/*
    Packages
*/
import React from "react";
import RegisterForm from "../../../components/specialized/Account/RegisterForm";
import Card from "react-bootstrap/Card";
import "../../../css/LoginForm.css";

//const state = require("../../../store");
const Register2 = props => {
  return (
    <div>
      <Card
        bg="light"
        className="login-form"
        style={{ width: "30rem", marginTop: 50 }}
      >
        <h1 className="header" style={{ marginTop: 20 }}>
          Register
        </h1>
        <RegisterForm />
      </Card>
    </div>
  );
};
export default Register2;
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
