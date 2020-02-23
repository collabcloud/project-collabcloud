import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { NavigationBar } from "../../components/base/NavigationBar";
import { ProjectsList } from "../../components/base/ProjectsList";

import { FaGithub, FaLinkedin, FaDev } from 'react-icons/fa';
import { MdWeb } from 'react-icons/md'; 

// Redux Imports
import { connect } from "react-redux";
import { addProject } from "../../actions/projectActions";
import PropTypes from "prop-types";

import "../../css/Explore.css";

const Explore = () => {

  return (
    <div>
      <NavigationBar />
      <Container>
        <h1>Explore Projects</h1>
        <h5>View the top projects on CollabCloud</h5>
        <ProjectsList />
      </Container>
    </div>
  );
}

export default Explore;