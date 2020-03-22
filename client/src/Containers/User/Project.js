import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Alert } from "react-bootstrap";
import { NavigationBar } from "../../components/base/NavigationBar";
import { ProjectOverview } from "../../components/base/ProjectOverview";
import { ProjectForm } from "../../components/base/ProjectForm";
import { Contributors } from "../../components/base/Contributors";
import "../../css/Project.css";

// Redux imports
import { connect } from "react-redux"; // connects the ProjectForm component to the Redux store
import { updateProject, deleteProject, getProjectInformation, leaveProject, joinProject, resetProjectActionStatus } from "../../actions/projectActions";
import PropTypes from "prop-types";

// TODO: Get the PID of this project from the store, or the name of the project from the dynamic path
// This is the PID of the project whose information we want to get
const projectId = "d0f46d7e-e4c9-5811-aa37-c3602cca8cd3";

const Project = ({ getProjectInformation, updateProject, deleteProject, leaveProject, joinProject, resetProjectActionStatus, projectInformation, updateSuccess, deleteSuccess, leaveSuccess, joinSuccess, loggedInUid }) => {

    const history = useHistory();
    console.log(`Currently logged in user is: ${loggedInUid}`);
    const [isShowingSettings, modifySettings] = useState(false);
    const [hasUserJoined, setUserJoinedProject] = useState(false);
    const [successfullyDeleted, setDeleted] = useState(false);
    const [successfullyUpdated, setUpdated] = useState(false);
    let requestedToUpdate = false;
    let requestedToJoin = false;
    let requestedToLeave = false;
    let requestedToDelete = false;

	// Loads project information
	useEffect(() => {
        // console.log("Repopulating project information");
        getProjectInformation({ projectId });
	}, [getProjectInformation, updateSuccess, joinSuccess, leaveSuccess]);
    
    // Check if the logged in user is part of this project
    useEffect(() => {
        const collaborators = projectInformation.collaborators;
        collaborators.forEach(collaborator => {
            if (collaborator.userUid === loggedInUid) {
                setUserJoinedProject(true);
            }
        });
    }, [projectInformation, loggedInUid]);

    // When a user tries to delete their project, check if deletion was successful
    useEffect(() => {
        if (deleteSuccess) {
            setDeleted(true);
            resetProjectActionStatus();

            // Redirect user to dashboard (since there is no project to look at anymore)
            history.push("/dashboard");
        } else if (requestedToDelete) {
            // TODO: Get Furqan's alerts up here
            console.log("Unsuccessful deletion!");
            requestedToDelete = false;
        }
    }, [deleteSuccess, history]);

    // When a user tries to update their project, check if update was successful
    useEffect(() => {
        if (updateSuccess) {
            // console.log("Update success");
            setUpdated(true);
            resetProjectActionStatus();
            requestedToUpdate = false;
        } else if (requestedToUpdate){
            // TODO: Get Furqan's alerts up here
            console.log("Unsuccessful update");
            requestedToUpdate = false;
        }
    }, [updateSuccess]);

    // When a user tries to leave a project, check if leaving was successful
    useEffect(() => {
        if (leaveSuccess) {
            // console.log("Successfully left project");
            requestedToLeave = false;
            setUserJoinedProject(false);
            resetProjectActionStatus();
        } else if (requestedToLeave) {
            // TODO: Get Furqan's alerts up here
            console.log("Could not leave project");
            requestedToLeave = false;
        }
    }, [leaveSuccess]);

    // When a user tries to join a project, check if joining was successful
    useEffect(() => {
        if (joinSuccess) {
            // console.log("Successfully joined project");
            requestedToJoin = false;
            setUserJoinedProject(true);
            resetProjectActionStatus();
        } else if (requestedToJoin){
            // TODO: Get Furqan's alerts up here
            console.log("Could not join project");
            requestedToJoin = false;
        }
    }, [joinSuccess]);

    // Toggles the Settings view, triggered by user
    const toggleSettings = () => {
        modifySettings(!isShowingSettings);
    };

    // User requests to join a Project
    const requestToJoinProject = () => {
        requestedToJoin = true;

        // Only collaborators may join an existing project, so we hardcode that field
        joinProject(loggedInUid, projectInformation.project.pid, "collaborator");
    }

    // User requests to leave a project
    const requestToLeaveProject = () => {
        requestedToLeave = true;

        // Only collaborators may leave a project, so we hardcode that field
        leaveProject(loggedInUid, projectInformation.project.pid, "collaborator");
    }

    // Calls updateProject() from redux
    const updateThisProject = ({ pid, projectName, projectDescription, isProjectPublic, tech, links }) => {
        requestedToUpdate = true;
        updateProject({ pid, projectName, projectDescription, isProjectPublic, tech, links });
    }

    // Calls deleteProject() from redux
    const deleteThisProject = (pid) => {
        requestedToDelete = true;
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
                {(isShowingSettings) ? 
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
                        requestToLeaveProject={requestToLeaveProject}
                        hasUserJoined={hasUserJoined}
                        loggedInUid={loggedInUid}
				    />
                }

                {/* Conditionally render the contributors list*/}
                {!isShowingSettings &&
				    <Contributors 
                        projectInformation={projectInformation}
                    />
                }
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
        deleteSuccess: state.project.deleteSuccess,
        leaveSuccess: state.project.leaveSuccess,
        joinSuccess: state.project.joinSuccess,
        loggedInUid: state.user.uid
	}
}

// Gives our Project component access to the redux dispatch functions
function mapDispatchToProps(dispatch) {
	return {
		getProjectInformation: (pid) => {
			dispatch(getProjectInformation(pid));
        },
        updateProject: (pid, projectName, projectDescription, isProjectPublic, tech, links) => {
            dispatch(updateProject(pid, projectName, projectDescription, isProjectPublic, tech, links));
        },
        deleteProject: (pid) => {
            dispatch(deleteProject(pid));
        },
        leaveProject: (uid, pid, memberStatus) => {
            dispatch(leaveProject(uid, pid, memberStatus));
        },
        joinProject: (uid, pid, memberStatus) => {
            dispatch(joinProject(uid, pid, memberStatus));
        },
        resetProjectActionStatus: () => {
            dispatch(resetProjectActionStatus());
        }
	};
}

// List of dispatch functions that will be available to the component
Project.propTypes = {
    getProjectInformation: PropTypes.func.isRequired,
    updateProject: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
    leaveProject: PropTypes.func.isRequired,
    joinProject: PropTypes.func.isRequired,
    resetProjectActionStatus: PropTypes.func.isRequired
};


// Inserting a null value where mapStateToProps() should be
export default connect(mapStateToProps, mapDispatchToProps)(Project);