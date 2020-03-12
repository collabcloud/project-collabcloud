import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
// import { Carousel } from "react-bootstrap";
import { NavigationBar } from "../../components/base/NavigationBar";
import { ProjectOverview } from "../../components/base/ProjectOverview";
import { ProjectForm } from "../../components/base/ProjectForm";
import { Contributors } from "../../components/base/Contributors";
// import { Slideshow } from "../../components/base/Slideshow";

// import Picture1 from "./img/1.jpg";
// import Picture2 from "./img/2.jpg";
// import Picture3 from "./img/3.jpg";
import "../../css/Project.css";

// Redux imports
import { connect } from "react-redux";
import { getProjectInformation } from "../../actions/projectActions";
import PropTypes from "prop-types";

// TODO: Get the PID of this project from the store, or the name of the project from the dynamic path
// This is the PID of the project whose information we want to get
const projectId = "c99cd1bd-8b05-53af-9fe1-5f7b7235806f";

const Project = ({ getProjectInformation, projectInformation }) => {
	// Loads project information
	useEffect(() => {
		getProjectInformation({ projectId });
	}, [getProjectInformation]);

    // Used for conditionally rendering the "Project Settings" section
    const [isShowingSettings, modifySettings] = useState(false);

    const [hasJoinedProject, modifyProjectJoinStatus] = useState(true);

    // TODO: This toggle should only be visible to the owner of the page
    // Toggles the Settings view
    const toggleSettings = () => {
        console.log("Clicked on toggle settings");
        modifySettings(!isShowingSettings);
    };

    // TODO: Add this functionality. A User can request to join a Project
    const requestToJoinProject = () => {
        console.log("Clicked on 'Request to Join' button");
        modifyProjectJoinStatus(true);
    }

    const leaveProject = () => {
        console.log("Clicked on 'Leave Project' button");
        modifyProjectJoinStatus(false);
    }

    // TODO: useHistory()?

	return (
		<div>
			<NavigationBar />
			<Container
				fluid
				className="col-md-8 align-items-start"
				style={{ paddingTop: "50px" }}
			>

                {/* Conditionally render either the informational view or the settings view */}
                {isShowingSettings ? 
                    <ProjectForm 
                        projectInformation={projectInformation} 
                        toggleSettings={toggleSettings}
                    />
                    :
                    <ProjectOverview 
                        projectInformation={projectInformation} 
                        toggleSettings={toggleSettings}
                        requestToJoinProject={requestToJoinProject}
                        leaveProject={leaveProject}
                        hasJoinedProject={hasJoinedProject}
				    />
                }

                {/* Conditionally render the contributors list*/}
                {!isShowingSettings &&
                    // TODO: Pass in a Users list of contributors here
				    <Contributors />
                }
				
                {/* <Slideshow pic1={Picture1} pic2={Picture2} pic3={Picture3} /> */}
			</Container>
		</div>
	);
};

function mapStateToProps(state) {
	return { projectInformation: state.project.individualProject };
}

function mapDispatchToProps(dispatch) {
	return {
		getProjectInformation: pid => {
			dispatch(getProjectInformation(pid));
		}
	};
}

Project.propTypes = {
	getProjectInformation: PropTypes.func.isRequired
};

// Inserting a null value where mapStateToProps() should be
export default connect(mapStateToProps, mapDispatchToProps)(Project);
