import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { NavigationBar } from "../../components/base/NavigationBar";
import { ProjectResultList } from "../../components/base/ProjectResultList";
import { UserResultList } from "../../components/base/UserResultList";
import { FaGithub, FaLinkedin, FaDev } from 'react-icons/fa';
import { MdWeb } from 'react-icons/md'; 

// Redux Imports
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "../../css/Search.css";

const Search = () => {

    //const [projects, setProjects] = useState([]);
  
    useEffect(()=>{
    }); 
  
    return (
      <div>
        <NavigationBar />
        <Container>
          <h2>Relevant Projects to your Search</h2>
          <ProjectResultList SearchFor="hi"/> 
        </Container>
        <Container>
          <h2>Relevant Users to your Search</h2>
          <UserResultList SearchFor="hi"/> 
        </Container>
      </div>
    );
  }
  
function mapStateToProps(state){
return {};
}

function mapDispatchToProps(dispatch){
return {
    getPublicProjects: () => {
    }
};
}
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Search);