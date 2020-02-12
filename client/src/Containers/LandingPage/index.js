import React from 'react';
// Individual Imports
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import "../../css/LandingPage.css"
import "../../index.css"

function Landing() {
  
  return (
  <div>
    <div style={{textAlign:"right"}}>
      <img 
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

export default Landing;