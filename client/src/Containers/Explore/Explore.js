import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { ProjectsList } from "../../components/specialized/Explore/ProjectsList";
import NavigationBar from "../../components/specialized/Nav/NavigationBar";

// Redux Imports
import { connect } from "react-redux";
import { getPublicProjects } from "../../actions/projectActions";
import PropTypes from "prop-types";

import "../../css/Explore.css";

const Explore = ({ getPublicProjects, projects }) => {
  //const [projects, setProjects] = useState([]);

  useEffect(() => {
    getPublicProjects();
  }, [getPublicProjects]);

  return (
    <div>
      <NavigationBar />
      <Container>
        <h1>Explore Projects</h1>
        <h5>View the top projects on CollabCloud</h5>
        <ProjectsList projects={projects} />
      </Container>
    </div>
  );
};

function mapStateToProps(state) {
  return { projects: state.project.projects };
}

function mapDispatchToProps(dispatch) {
  return {
    getPublicProjects: () => {
      dispatch(getPublicProjects());
    }
  };
}

Explore.propTypes = {
  getPublicProjects: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
