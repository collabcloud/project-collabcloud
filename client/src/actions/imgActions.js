import axios from "axios";
import { POST_SUCCESSFUL } from "./types";
import { setAlert } from "./alert";

export const postAvatar = (uid, file) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const url =
      "https://cors-anywhere.herokuapp.com/https://api.imgur.com/3/image";
    const clientId = "d162fd6f83e78ed";
    const fd = new FormData();
    fd.append("image", file);

    //const body = JSON.stringify({ uid: uid, file: file });
    const res = await axios.post(url, fd, {
      headers: {
        Authorization: "Client-ID " + clientId
      }
    });

    // If success, dispatch the action
    if (res) {
      // Send our information to the store

      const link = res.data.data.link;

      const user_url = "/api/users/avatar";

      const body = {
        uid: uid,
        image: link
      };

      let response = await axios.put(user_url, body, config);

      if (response) {
        dispatch({
          type: POST_SUCCESSFUL,
          payload: res.data.data.link
        });
      }
    } else {
      dispatch(setAlert("Internal server error", "danger"));
    }
  } catch (err) {
    dispatch(setAlert("Error occurred when uploading an image", "danger"));
  }
};

export const postProject = (pid, file) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const url =
      "https://cors-anywhere.herokuapp.com/https://api.imgur.com/3/image";
    const clientId = "d162fd6f83e78ed";
    const fd = new FormData();
    fd.append("image", file);
    const res = await axios.post(url, fd, {
      headers: {
        Authorization: "Client-ID " + clientId
      }
    });

    // If success, dispatch the action
    if (res) {
      // Send our information to the store

      const link = res.data.data.link;

      const project_url = "/api/projects/img";

      const body = {
        pid: pid,
        image: link
      };

      let response = await axios.put(project_url, body, config);

      if (response) {
        dispatch({
          type: POST_SUCCESSFUL,
          payload: res.data.data.link
        });
      }
    } else {
      dispatch(setAlert("Internal server error", "danger"));
    }
  } catch (err) {
    dispatch(setAlert("Error occurred when uploading an image", "danger"));
  }
};
