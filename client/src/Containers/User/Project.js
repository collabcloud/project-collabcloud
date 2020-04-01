import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Alert } from "react-bootstrap";
import NavigationBar from "../../components/specialized/Nav/NavigationBar";
import { ProjectOverview } from "../../components/specialized/Project/ProjectOverview";
import { ProjectForm } from "../../components/specialized/Project/ProjectForm";
import { Contributors } from "../../components/specialized/Project/Contributors";
// Redux imports
import { connect } from "react-redux"; // connects the ProjectForm component to the Redux store
import { setAlert } from "../../actions/alert";
import {
  updateProject,
  deleteProject,
  getProjectInformation,
  leaveProject,
  joinProject,
  resetProjectActionStatus
} from "../../actions/projectActions";
import {
  get_project_requests,
  request_user,
  accept_request
} from "../../actions/userRequestAction";
import PropTypes from "prop-types";
import "../../css/Project.css";

const Project = props => {
  const {
    getProjectInformation,
    updateProject,
    deleteProject,
    joinProject,
    accept_request,
    leaveProject,
    resetProjectActionStatus,
    get_project_requests,
    request_user,
    projectInformation,
    requests,
    updateSuccess,
    joinSuccess,
    leaveSuccess,
    loggedInUid,
    deleteSuccess,
    match,
    setAlert,
    status,
    requestStatus
  } = props;

  // This is the PID of the project whose information we want to get
  const projectId = match.params.pid;

  const history = useHistory();
  const [showSettings, setShowSettings] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [hasUserJoined, setUserJoinedProject] = useState(false);
  const [successfullyUpdated, setUpdated] = useState(false);
  const [requestedToJoin, setRequestedToJoin] = useState(false);
  const [requestedToJoinProject, setRequestedToJoinProject] = useState(false);
  let requestedToUpdate = false;
  //let requestedToJoin = false;
  let requestedToLeave = false;
  let requestedToDelete = false;

  // Loads project information
  useEffect(() => {
    getProjectInformation({ projectId });
    get_project_requests(projectId);
  }, [
    getProjectInformation,
    updateSuccess,
    joinSuccess,
    leaveSuccess,
    projectId
  ]);
  // 404 redirect
  useEffect(() => {
    if (status === 500) {
      history.push("/404");
    }
  }, [projectInformation, status, history]);

  // Check if the logged in user is part of this project
  useEffect(() => {
    const collaborators = projectInformation.collaborators;
    collaborators.forEach(collaborator => {
      if (collaborator.userUid === loggedInUid) {
        setUserJoinedProject(true);
      }
    });
  }, [projectInformation, loggedInUid]);

  useEffect(() => {
    requests.forEach(request => {
      if (request.requestee_uid === loggedInUid) {
        setRequestedToJoin(true);
      }
      if (request.requester_uid === loggedInUid) {
        console.log("hi");
        setRequestedToJoinProject(true);
      }
    });
  }, [requests, loggedInUid]);

  // When a user tries to delete their project, check if deletion was successful
  useEffect(() => {
    if (deleteSuccess) {
      resetProjectActionStatus();
      setAlert("Successfully deleted your project", "success");
      requestedToDelete = false;

      // Redirect user to dashboard (since there is no project to look at anymore)
      history.push("/dashboard");
    } else if (requestedToDelete) {
      setAlert("Could not delete your project", "danger");
      requestedToDelete = false;
    }
  }, [deleteSuccess, history]);

  // When a user tries to update their project, check if update was successful
  useEffect(() => {
    if (updateSuccess) {
      setUpdated(true);
      resetProjectActionStatus();
      setAlert("Successfully updated your project", "success");
      requestedToUpdate = false;
    } else if (requestedToUpdate) {
      setAlert("Could not update your project", "danger");
      requestedToUpdate = false;
    }
  }, [updateSuccess]);

  // When a user tries to leave a project, check if leaving was successful
  useEffect(() => {
    if (leaveSuccess) {
      requestedToLeave = false;
      setUserJoinedProject(false);
      resetProjectActionStatus();
      setAlert("Successfully left project", "success");
    } else if (requestedToLeave) {
      setAlert("Could not leave your project", "danger");
      requestedToLeave = false;
    }
  }, [leaveSuccess]);

  // When a user tries to join a project, check if joining was successful
  useEffect(() => {
    if (joinSuccess) {
      // console.log("Successfully joined project");
      setRequestedToJoin(false);
      setUserJoinedProject(true);
      resetProjectActionStatus();
      setAlert("Successfully joined project", "success");
    } else if (requestedToJoin) {
      setAlert("Could not join project", "danger");
      requestedToJoin = false;
    }
  }, [joinSuccess]);

  // Toggles the Settings view, triggered by user
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  // Toggles the Request page view
  const toggleRequests = () => {
    setShowRequests(!showRequests);
  };

  // User requests to join a Project
  const requestToJoinProject = () => {
    request_user(
      projectInformation.collaborators[0].username,
      loggedInUid,
      projectInformation.project.pid
    );
  };

  // User accepts a join request
  const acceptRequest = () => {
    joinProject(loggedInUid, projectInformation.project.pid, "collaborator");
  };

  const acceptUserRequest = uid => {
    accept_request(uid, projectInformation.project.pid, "collaborator");
  };

  // User requests to leave a project
  const requestToLeaveProject = () => {
    requestedToLeave = true;

    // Only collaborators may leave a project, so we hardcode that field
    leaveProject(loggedInUid, projectInformation.project.pid, "collaborator");
  };

  //Request a user to join a project
  const requestUser = requestee => {
    request_user(
      requestee,
      projectInformation.project.ownerId,
      projectInformation.project.pid
    );
  };

  // Calls updateProject() from redux
  const updateThisProject = ({
    pid,
    projectName,
    projectDescription,
    isProjectPublic,
    tech,
    links
  }) => {
    requestedToUpdate = true;
    updateProject({
      pid,
      projectName,
      projectDescription,
      isProjectPublic,
      tech,
      links
    });
  };

  // Calls deleteProject() from redux
  const deleteThisProject = pid => {
    requestedToDelete = true;
    deleteProject(pid);
  };

  return (
    <div>
      <NavigationBar />
      <Container
        fluid
        className="col-md-8 align-items-start"
        style={{ paddingTop: "50px" }}
      >
        {/* Conditionally render any feedback for when a user updates a project */}
        {successfullyUpdated && (
          <Alert variant="success">
            <Alert.Heading> NOTICE! </Alert.Heading>
            <p>You successfully updated your project</p>
          </Alert>
        )}

        {/* Conditionally render either the informational view or the settings view */}
        {showSettings ? (
          <ProjectForm
            projectInformation={projectInformation}
            toggleSettings={toggleSettings}
            updateThisProject={updateThisProject}
            deleteThisProject={deleteThisProject}
          />
        ) : (
          <ProjectOverview
            projectInformation={projectInformation}
            requests={requests}
            toggleSettings={toggleSettings}
            toggleRequests={toggleRequests}
            requestToJoinProject={requestToJoinProject}
            acceptRequest={acceptRequest}
            acceptUserRequest={acceptUserRequest}
            requestToLeaveProject={requestToLeaveProject}
            requestUser={requestUser}
            requestStatus={requestStatus}
            requestedToJoin={requestedToJoin}
            requestedToJoinProject={requestedToJoinProject}
            hasUserJoined={hasUserJoined}
            loggedInUid={loggedInUid}
          />
        )}

        {/* Conditionally render the contributors list*/}
        {!showSettings && (
          <Contributors projectInformation={projectInformation} />
        )}
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
    loggedInUid: state.user.uid,
    status: state.project.status,
    requestStatus: state.users.status,
    requests: state.users.requests
  };
}

// Gives our Project component access to the redux dispatch functions
function mapDispatchToProps(dispatch) {
  return {
    getProjectInformation: pid => {
      dispatch(getProjectInformation(pid));
    },
    updateProject: (
      pid,
      projectName,
      projectDescription,
      isProjectPublic,
      tech,
      links
    ) => {
      dispatch(
        updateProject(
          pid,
          projectName,
          projectDescription,
          isProjectPublic,
          tech,
          links
        )
      );
    },
    deleteProject: pid => {
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
    },
    setAlert: (message, alertType) => {
      dispatch(setAlert(message, alertType));
    },
    get_project_requests: pid => {
      dispatch(get_project_requests(pid));
    },
    request_user: (requestee, requester, pid) => {
      dispatch(request_user(requestee, requester, pid));
    },
    accept_request: (uid, pid, memberStatus) => {
      dispatch(accept_request(uid, pid, memberStatus));
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
  resetProjectActionStatus: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  request_user: PropTypes.func.isRequired
};

// Inserting a null value where mapStateToProps() should be
export default connect(mapStateToProps, mapDispatchToProps)(Project);
