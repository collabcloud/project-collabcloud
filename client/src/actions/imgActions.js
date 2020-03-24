import axios from "axios";
import { POST_SUCCESSFUL } from "./types";

export const postAvatar = (uid, file) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const url = "https://api.imgur.com/3/image";
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
      dispatch({
        type: POST_SUCCESSFUL,
        payload: res.data.data.link
      });
    } else {
      console.log(`An error occured. Error: ${res.status}`);
    }
  } catch (err) {
    console.log("Error occurred when uploading image");
    console.log(err);
  }
};
