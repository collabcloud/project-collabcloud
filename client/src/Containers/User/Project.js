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
import { connect } from "react-redux"; // connects the ProjectForm component to the Redux store
import { updateProject, deleteProject, getProjectInformation } from "../../actions/projectActions";
import PropTypes from "prop-types";

// TODO: Get the PID of this project from the store, or the name of the project from the dynamic path
// This is the PID of the project whose information we want to get
const projectId = "c99cd1bd-8b05-53af-9fe1-5f7b7235806f";

const Project = ({ getProjectInformation, updateProject, deleteProject, projectInformation, updateSuccess, deleteSuccess }) => {
	// Loads project information
	useEffect(() => {
		getProjectInformation({ projectId });
	}, [getProjectInformation]);

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

    // TODO: Add this functionality
    const leaveProject = () => {
        console.log("Clicked on 'Leave Project' button");
        modifyProjectJoinStatus(false);
    }

    // Calls updateProject() from redux
    const updateThisProject = (pid, projectName, tech, projectDescription, isProjectPublic, links) => {
        console.log("About to dispatch updateProject()");
        updateProject({
			pid,
			projectName,
			tech,
			projectDescription,
			isProjectPublic,
			links
		});
    }

    // Calls deleteProject() from redux
    const deleteThisProject = (pid) => {
        console.log("About to dispatch deleteProject()");
        deleteProject(pid);
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
                        projectId={projectId}
                        toggleSettings={toggleSettings}
                        updateThisProject={updateThisProject}
                        deleteThisProject={deleteThisProject}
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

// Transforms Redux store state into the props for this Project component
// This function is called whenever the store state changes
function mapStateToProps(state) {
    return {
        projectInformation: state.project.individualProject,
		updateSuccess: state.project.updateSuccess,
		deleteSuccess: state.project.updateSuccess
	}
}

// Gives our Project component access to the redux dispatch functions
function mapDispatchToProps(dispatch) {
	return {
		getProjectInformation: (pid) => {
			dispatch(getProjectInformation(pid));
        },
        updateProject: (pid, projectName, tech, projectDescription, isProjectPublic, links) => {
            dispatch(updateProject(pid, projectName, tech, projectDescription, isProjectPublic, links));
        },
        deleteProject: (pid) => {
            dispatch(deleteProject(pid));
        }
	};
}

// List of dispatch functions that will be available to the component
Project.propTypes = {
    getProjectInformation: PropTypes.func.isRequired,
    updateProject: PropTypes.func.isRequired,
	deleteProject: PropTypes.func.isRequired
};

// Inserting a null value where mapStateToProps() should be
export default connect(mapStateToProps, mapDispatchToProps)(Project);