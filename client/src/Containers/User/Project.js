import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Alert } from "react-bootstrap";
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
const projectId = "a720142a-4076-5c0d-9edc-5236c9be2b55";

const Project = ({ getProjectInformation, updateProject, deleteProject, projectInformation, updateSuccess, deleteSuccess }) => {
    const history = useHistory();

	// Loads project information
	useEffect(() => {
        // console.log("Repopulating project information");
		getProjectInformation({ projectId });
	}, [getProjectInformation, updateSuccess]);
    
    const [isShowingSettings, modifySettings] = useState(false);
    const [hasJoinedProject, modifyProjectJoinStatus] = useState(true);
    const [successfullyDeleted, setDeleted] = useState(false);
    const [successfullyUpdated, setUpdated] = useState(false);

    // When a user tries to delete their project, check if deletion was successful
    useEffect(() => {
        if (deleteSuccess) {
            setDeleted(true);
            // console.log("Deletion success");
            // Redirect user to dashboard (since there is no project to look at anymore)
            history.push("/dashboard");
        } else {
            // TODO: Get Furqan's alerts up here
            // console.log("Unsuccessful deletion!");
        }
    }, [deleteSuccess, history]);

    // When a user tries to update their project, check if update was successful
    useEffect(() => {
        if (updateSuccess) {
            setUpdated(true);
            // console.log("Update success");
        } else {
            // TODO: Get Furqan's alerts up here
            // console.log("Unsuccessful update");
        }
    }, [updateSuccess]);


    // TODO: This toggle should only be visible to the owner of the page
    // Toggles the Settings view
    const toggleSettings = () => {
        // console.log("Clicked on toggle settings");
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
    const updateThisProject = ({ pid, projectName, projectDescription, isProjectPublic, tech, links }) => {
        // We set successfullyUpdated to false (just in case it was true before, meaning that it has already been updated once, and that the user is triggering a second update)
        setUpdated(false); // FIXME: Sometimes, this doesn't trigger the useEffect to re-populate projectInformation
        updateProject({
			pid,
			projectName,
			projectDescription,
			isProjectPublic,
			tech,
			links
		});
    }

    // Calls deleteProject() from redux
    const deleteThisProject = (pid) => {
        deleteProject(pid);
    }

	return (
		<div>
			<NavigationBar />
			<Container
				fluid
				className="col-md-8 align-items-start"
				style={{ paddingTop: "50px" }}
			>
                {/* Conditionally render any feedback for when a user updates a project */}
                {successfullyUpdated && 
                    <Alert variant="success">
                        <Alert.Heading> NOTICE! </Alert.Heading>
                        <p>
                            You successfully updated your project
                        </p>
                    </Alert> 
                }

                {/* Conditionally render either the informational view or the settings view */}
                {isShowingSettings ? 
                    <ProjectForm 
                        projectInformation={projectInformation} 
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
		deleteSuccess: state.project.deleteSuccess
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