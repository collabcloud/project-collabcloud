import axios from "axios";
import {
  ADD_PROJECT,
  GET_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  GET_PUBLIC_PROJECTS,
  JOIN_PROJECT,
  LEAVE_PROJECT,
  RESET_PROJECT_ACTION_STATUS
} from "./types";

// Add Project Action
export const addProject = ({
  name,
  desc,
  isProjectPublic,
  ownerId,
  githubStars,
  tech,
  links
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // TODO: Add empty input validation for project name and project description

  const body = JSON.stringify({
    projectName: name,
    description: desc,
    isProjectPublic: isProjectPublic,
    ownerUserID: ownerId,
    githubStars: githubStars,
    // gitRepoID: repoID,
    technologiesUsed: tech,
    techLinks: links
  });

  try {
    const res = await axios.post("/api/projects/create", body, config);

    // If success, dispatch action
    if (res) {
      dispatch({
        type: ADD_PROJECT,
        payload: res.data
      });
    } else {
      console.log("Couldn't add venture");
    }
  } catch (err) {
    console.log("Error occured while creating a project");
    console.log(err);
  }
};

// Get All Projects from a User
export const get_user_projects = uid => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const url = "/api/projects/user/" + uid;
    console.log(url);
    const res = await axios.get(url, config);

    // If success, dispatch action
    if (res) {
      dispatch({
        type: GET_PUBLIC_PROJECTS,
        payload: res.data.projects_obj.projects_lst
      });
    } else {
      console.log("Couldn't get projects");
    }
  } catch (err) {
    console.log("Error occured when retrieving user's projects");
    console.log(err);
  }
};

// Get Public Projects
export const getPublicProjects = () => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.get("/api/projects/", config);

    // If success, dispatch action
    if (res) {
      dispatch({
        type: GET_PUBLIC_PROJECTS,
        payload: res.data.projects_obj.projects_lst
      });
    } else {
      console.log("Couldn't get projects");
    }
  } catch (err) {
    console.log("Error occured when retrieving projects");
    console.log(err);
  }
};

// Given a project ID, return all information for that project
export const getProjectInformation = ({ projectId }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    // Get all information for a given project
    const res = await axios.get(
      "/api/projects/information",
      {
        params: {
          projectId: projectId
        }
      },
      config
    );

    // If success, dispatch the action
    if (res.status === 200) {
      // Send our information to the redux store
      dispatch({
        type: GET_PROJECT,
        payload: res.data
      });
    } else {
      console.log(`An error occured. Error code: ${res.status}`);
    }
  } catch (err) {
    console.log(
      "Error occured when retrieving information for a single project"
    );
    console.log(err);
  }
};

// Given a projectId and attributes to update, hit the backend to update that project
export const updateProject = ({
  pid,
  projectName,
  projectDescription,
  isProjectPublic,
  tech,
  links
}) => async dispatch => {
  // console.log("Hit updateProject in projectActions");
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    pid: pid,
    projectName: projectName,
    description: projectDescription,
    isProjectPublic: isProjectPublic,
    // ownerUserID: userid,
    // gitRepoID: repoID,
    technologiesUsed: tech,
    techLinks: links
  });

  try {
    const res = await axios.post("/api/projects/update", body, config);
    // If success, dispatch action
    if (res.status === 200) {
      dispatch({
        type: UPDATE_PROJECT
      });
    } else {
      console.log("Could not update project");
    }
  } catch (err) {
    console.log("Error occured while updating a project");
    console.log(err);
  }
};

// Given a projectId hit the backend to YEET that project
export const deleteProject = projectId => async dispatch => {
  // console.log("Hit deleteProject in projectActions");
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    pid: projectId
  });

  try {
    const res = await axios.post("/api/projects/delete", body, config);

    // If success, dispatch action
    if (res.status === 200) {
      dispatch({
        type: DELETE_PROJECT
      });
    } else {
      console.log("Could not delete project");
    }
  } catch (err) {
    console.log("Error occured while deleting a project");
    console.log(err);
  }
};

// Given a userId and projectId, yeet the user from that project
export const leaveProject = (
  userId,
  projectId,
  memberStatus
) => async dispatch => {
  // console.log("Hit leaveProject in projectActions");
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    uid: userId,
    pid: projectId,
    memberStatus: memberStatus
  });

  try {
    const res = await axios.post("/api/projects/leave", body, config);

    // If success, dispatch action
    if (res.status === 200) {
      dispatch({
        type: LEAVE_PROJECT
      });
    } else {
      console.log("Could not remove user from project");
    }
  } catch (err) {
    console.log("Error occured while removing user from project");
    console.log(err);
  }
};

// Given a userId and projectId, add the user to that project
export const joinProject = (
  userId,
  projectId,
  memberStatus
) => async dispatch => {
  // console.log("Hit joinProject in projectActions");
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    uid: userId,
    pid: projectId,
    memberStatus: memberStatus
  });

  try {
    const res = await axios.post("/api/projects/join", body, config);

    // If success, dispatch action
    if (res.status === 200) {
      dispatch({
        type: JOIN_PROJECT
      });
    } else {
      console.log("Could not add user to project");
    }
  } catch (err) {
    console.log("Error occured while adding user to project");
    console.log(err);
  }
};

// After any project action, resets the "status" of that project action to its default
// Example: After updating a project successfully, updateSuccess will be true. We reset updateSuccess to false so the next project update works properly
export const resetProjectActionStatus = () => async dispatch => {
  dispatch({
    type: RESET_PROJECT_ACTION_STATUS
  });
};
