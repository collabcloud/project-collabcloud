import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { TrendingProjectsList } from "../../components/base/TrendingProjectsList";
import NavigationBar from "../../components/specialized/Nav/NavigationBar";

// Redux Imports
import { connect } from "react-redux";
import { getPublicProjects } from "../../actions/projectActions";
import PropTypes from "prop-types";

import "../../css/Explore.css";

const Trending = ({ getPublicProjects, projects }) => {
  //const [projects, setProjects] = useState([]);

  useEffect(() => {
    getPublicProjects();
  });

  return (
    <div>
      <NavigationBar />
      <Container>
        <h1>Trending Projects</h1>
        <h5>View the popular projects on CollabCloud</h5>
        <TrendingProjectsList projects={projects} />
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

Trending.propTypes = {
  getPublicProjects: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Trending);
