import React, {useEffect} from "react";
import { NavigationBar } from "../../../components/base/NavigationBar";



const Register2 = () => (
        
        <body>
            
            <div class="container">
        
                <div style={{textAlign: "center" ,marginTop: '50px'}}>

                    <form>
                    <div style={{display: "inline-block", textAlign:'left', margin:'20px'}}>
                        
                        <label style={{fontWeight: 'bold', fontSize: '23px', marginTop: '5px'}}>Username</label> <br/>
                        <input className="form-control form-control-md" style={{width: '400px'}} type="text" name="user" placeholder="Enter a Username" required/> <br/>
                        <label style={{fontWeight: 'bold', fontSize: '23px', marginTop: '5px'}}>Password</label> <br/>
                        <input className="form-control form-control-md" type="text" name="user" placeholder="Enter a Password"/> <br />
                        <label style={{fontWeight: 'bold', fontSize: '23px', marginTop: '5px'}}>Confirm Password</label> <br/>
                        <input className="form-control form-control-md" type="text" name="user" placeholder=""/> <br/>
                        <input className="btn btn-secondary" type="submit" name="submit" value="Sign Up"/>
                        
                    </div>
                    </form>
                    
                </div>
            </div>
        </body>
);

export default Register2;