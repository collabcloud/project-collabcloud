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
import { updateProject, deleteProject, getProjectInformation, leaveProject } from "../../actions/projectActions";
import PropTypes from "prop-types";

// TODO: Get the PID of this project from the store, or the name of the project from the dynamic path
// This is the PID of the project whose information we want to get
const projectId = "d0f46d7e-e4c9-5811-aa37-c3602cca8cd3";

const Project = ({ getProjectInformation, updateProject, deleteProject, leaveProject, projectInformation, updateSuccess, deleteSuccess, leaveSuccess, loggedInUid }) => {
    const history = useHistory();
    console.log(`Currently logged in user is: ${loggedInUid}`);
    const [isShowingSettings, modifySettings] = useState(false);
    const [hasUserJoined, setUserJoinedProject] = useState(false);
    const [successfullyDeleted, setDeleted] = useState(false);
    const [successfullyUpdated, setUpdated] = useState(false);

	// Loads project information
	useEffect(() => {
        // console.log("Repopulating project information");
        getProjectInformation({ projectId });
	}, [getProjectInformation, updateSuccess]);
    
    // Check if the logged in user is part of this project
    useEffect(() => {
        const collaborators = projectInformation.collaborators;
        collaborators.forEach(collaborator => {
            if (collaborator.userUid === loggedInUid) {
                setUserJoinedProject(true);
            }
        });
    }, [projectInformation]);

    // When a user tries to delete their project, check if deletion was successful
    useEffect(() => {
        if (deleteSuccess) {
            setDeleted(true);

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

    // When a user triesto leave a project, check if leaving was successful
    useEffect(() => {
        if (leaveSuccess) {
            console.log("Successfully left project");
            setUserJoinedProject(false);
        } else {
            // TODO: Get Furqan's alerts up here
            console.log("Unsuccessful leave");
        }
    }, [leaveSuccess]);

    // Toggles the Settings view
    const toggleSettings = () => {
        // console.log("Clicked on toggle settings");
        modifySettings(!isShowingSettings);
    };

    // TODO: Add this functionality. User requests to join a Project
    const requestToJoinProject = () => {
        console.log("Clicked on 'Request to Join' button");

        if (true) {
            console.log("Successfully joined project");
            setUserJoinedProject(true);
        } else {
            console.log("Could not join project");
        }
    }

    // TODO: Add this functionality. User requests to leave a project
    const requestToLeaveProject = () => {
        console.log("Clicked on 'Leave Project' button");
        console.log(loggedInUid);
        console.log(projectInformation.project.pid);
        console.log(projectInformation);

        // Only collaborators may leave a project, so we hardcode that field
        leaveProject(loggedInUid, projectInformation.project.pid, "collaborator");
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
	};
}

// List of dispatch functions that will be available to the component
Project.propTypes = {
    getProjectInformation: PropTypes.func.isRequired,
    updateProject: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
    leaveProject: PropTypes.func.isRequired
};


// Inserting a null value where mapStateToProps() should be
export default connect(mapStateToProps, mapDispatchToProps)(Project);