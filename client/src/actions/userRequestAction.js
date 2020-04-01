import axios from "axios";
import {
  GET_USERS,
  GET_REQUESTS,
  USER_REQUESTED,
  USER_ALREADY_REQUESTED,
  RESOURCE_NOT_FOUND,
  JOIN_PROJECT,
  INVALID
} from "./types";

//Get All Users
export const getUsers = () => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.get("/api/users/public", config);

    // If success, dispatch action
    if (res) {
      dispatch({
        type: GET_USERS,
        payload: res.data.users_obj.users_lst
      });
    } else {
      console.log("Couldn't get users");
    }
  } catch (err) {
    console.log("Error occured when retrieving users");
    console.log(err);
  }
};

// Get all project requests to a user
export const get_user_requests = requestee => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const url = "/api/users/request/user/" + requestee;

  axios
    .get(url, config)
    .then(response => {
      dispatch({
        type: GET_REQUESTS,
        payload: response.data
      });
    })
    .catch(err => {
      if (err.response.status === 404) {
        dispatch({
          type: RESOURCE_NOT_FOUND
        });
      } else {
        console.log("500 Interal Error - Occurred while: requesting user");
      }
    });
};

// Get all project requests to a user
export const get_project_requests = pid => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const url = "/api/users/request/project/" + pid;

  axios
    .get(url, config)
    .then(response => {
      dispatch({
        type: GET_REQUESTS,
        payload: response.data
      });
    })
    .catch(err => {
      if (err.response.status === 404) {
        dispatch({
          type: RESOURCE_NOT_FOUND
        });
      } else {
        console.log("500 Interal Error - Occurred while: requesting user");
      }
    });
};

// Given a userId and projectId, add the user to that project
export const accept_request = (
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
    const res = await axios.post("/api/projects/accept", body, config);

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

// Create a project request to a user
export const request_user = (requestee, requester, pid) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const url = "/api/users/request";
  const body = JSON.stringify({
    requestee: requestee,
    requester: requester,
    pid: pid
  });
  console.log(body);
  axios
    .post(url, body, config)
    .then(response => {
      dispatch({
        type: USER_REQUESTED,
        payload: response.data
      });
    })
    .catch(err => {
      if (err.response.status === 404) {
        dispatch({
          type: RESOURCE_NOT_FOUND
        });
      } else if (err.response.status === 400) {
        dispatch({
          type: USER_ALREADY_REQUESTED
        });
      } else if (err.response.status === 409) {
        dispatch({
          type: INVALID
        });
      } else {
        console.log("500 Interal Error - Occurred while: requesting user");
      }
    });
};
