import React, { useState, useEffect } from "react";
import { Container, Jumbotron, Carousel, Button } from "react-bootstrap";
import { NavigationBar } from "../../components/base/NavigationBar";
import { ProjectOverview } from "../../components/base/ProjectOverview";
import { ProjectForm } from "../../components/base/ProjectForm";
import { Contributors } from "../../components/base/Contributors";
import { Slideshow } from "../../components/base/Slideshow";

import Picture1 from "./img/1.jpg";
import Picture2 from "./img/2.jpg";
import Picture3 from "./img/3.jpg";
import "../../css/Project.css";

// Redux imports
import { connect } from "react-redux";
import { getProjectInformation } from "../../actions/projectActions";
import PropTypes from "prop-types";

// TODO: This toggle should only be visible to the owner of the page
let showSettings = !true;

// Toggles the Settings view
const toggleSettings = () => {
  console.log("Clicked on toggle settings");
  showSettings = !showSettings;
};

// TODO: Get the PID of this project from the store
  // This is the PID of the project whose information we want to get
  const projectId = "338b9470-caf5-54a1-b1e4-100cbfce2f94";

const Project = ({ getProjectInformation, projectInformation} ) => {
  // Loads project information
  useEffect(() => {
    getProjectInformation( { projectId } );
  }, []);

  function renderForm() {
    if (showSettings) {
      return (
        <ProjectForm projectInformation={projectInformation}/>
      );
    }
  }


	return (
		<div>
			<NavigationBar />
			<Container
				fluid
				className="col-md-8 align-items-start"
				style={{ paddingTop: "50px" }}
			>
        <ProjectOverview 
          projectInformation={projectInformation} 
          toggleSettings={toggleSettings}
        />

				{/* <Slideshow pic1={Picture1} pic2={Picture2} pic3={Picture3} /> */}

        {/* TODO: Pass in a Users list of contributors here */}
				<Contributors />

        {/* Conditionally render this when the user wants to modify settings */}
        {renderForm}
			</Container>
		</div>
	);
};


function mapStateToProps(state) {
  return { projectInformation: state.project.individualProject };
}

function mapDispatchToProps(dispatch) {
  return {
    getProjectInformation: (pid) => {
      dispatch(getProjectInformation(pid));
    }
  }
}

Project.propTypes = {
  getProjectInformation: PropTypes.func.isRequired
}

// Inserting a null value where mapStateToProps() should be
export default connect(mapStateToProps, mapDispatchToProps)(Project);
