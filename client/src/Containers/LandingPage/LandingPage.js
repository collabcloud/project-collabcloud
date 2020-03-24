import React, { useEffect } from 'react';
// Individual Imports
import Button from 'react-bootstrap/Button';
import { Link, useHistory } from 'react-router-dom';
import "../../css/LandingPage.css"
import "../../index.css"
import { connect } from "react-redux";

function Landing({loggedIn}) {

  const history = useHistory();

  useEffect(() => {
    if(loggedIn){
        history.push("/dashboard");
    }
  });
  
  return (
  <div>
    <div style={{textAlign:"right"}}>
      <img
        alt="Outline" 
        src={require('../../resources/outline.svg')}
        style={{
                height: "100vh"
              }}
      />
    </div>
    <div>
      <Link to="/login">
        <Button 
          className="sign-reg-butt" 
          style={{top: 46, right: 208}}>Sign In
        </Button>
      </Link>
      <Link to="/register">  
        <Button 
          className="sign-reg-butt" 
          style={{top:46, right:32}} >Register
        </Button>
      </Link>
    </div>
    <div>
      <img
        alt="CollabCloud logo"
        src={require('../../logo.png')}
        className="logo"
      />
      <span className="collab-cloud" style={{top:34, left:151}}>CollabCloud</span>
      <span className="main-text" style={{top: 341, left: -10}}>
            Build your dream team of collaborators</span>
      <span className="main-text-cont" style={{top: 390, left: 0}}>to make your ideas reality.</span>
      <Link to="/register">
        <Button 
          className="get-started-butt" 
          style={{top: 471, left: 25}}>Get Started
        </Button>
      </Link>
    </div>
  </div>    
  );
}

function mapStateToProps(state){
  return {loggedIn: state.login.loggedIn};
}

export default connect(mapStateToProps, null)(Landing);