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

const Explore = () => {

  return (
    <div>
      <NavigationBar />
    </div>
  );
}

export default Explore;