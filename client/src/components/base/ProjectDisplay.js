import React, { useEffect } from "react";
import PropTypes from "prop-types";

import ProjectBox from "./ProjectBox";
import { get_user_projects } from "../../actions/projectActions";
import { connect } from "react-redux";

const ProjectDisplay = ({ get_user_projects, projects, ...props }) => {
  useEffect(() => {
    if (props.uid) {
      get_user_projects(props.uid);
    }
  }, [get_user_projects, props.uid]);
  /*
  const projects = [
    {
      name: "Example-Project",
      desc: "Hi! This is literally just an example description",
      tech: [
        { id: 1, name: "MongoDB" },
        { id: 2, name: "Express" },
        { id: 3, name: "React" },
        { id: 4, name: "Node.js" }
      ],
      followers: 40,
      likes: 20
    },
    {
      name: "Harmoney",
      desc: "Streamlined group payments solution",
      tech: [
        { id: 1, name: "MongoDB" },
        { id: 2, name: "Express" },
        { id: 3, name: "React" },
        { id: 4, name: "Node.js" }
      ],
      followers: 469,
      likes: 200
    }
  ];*/

  function renderProjects() {
    if (projects && projects.length > 0) {
      const project_list = projects.map((project, index) => (
        <ProjectBox
          key={index}
          name={project.projectName}
          desc={project.projectDescription}
          tech={project.technologiesUsed}
          followers={0}
          likes={0}
        />
      ));
      return project_list;
    } else {
      return <h4>No projects to display.</h4>;
    }
  }

  return <div>{renderProjects()}</div>;
};

function mapStateToProps(state) {
  return {
    projects: state.project.projects
  };
}

function mapDispatchToProps(dispatch) {
  return {
    get_user_projects: uid => {
      dispatch(get_user_projects(uid));
    }
  };
}

ProjectDisplay.propTypes = {
  get_user_projects: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDisplay);
