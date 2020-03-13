import axios from "axios";
import { GET_TOKEN, GITHUB_EXISTS, ATTEMPT } from "./types";

// Registeration action
export const register = (auth_code, formData) => async dispatch => {
  //console.log("Redux register");
  //console.log(auth_code);
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const url = "/api/users/register";
  const body = JSON.stringify({ code: auth_code, ...formData });

  // If success, dispatch action
  // TODO: Check the response for whether or not the user is
  // already registered on github or not
  axios
    .post(url, body, config)
    .then(response => {
      console.log("Registered");
      dispatch({
        type: GET_TOKEN,
        payload: response.data
      });
    })
    .catch(err => {
      if (err.response.status === 301) {
        dispatch({
          type: GITHUB_EXISTS
        });
      } else {
        dispatch({
          type: ATTEMPT
        });
      }
      console.log("Error occurred while registering");
    });
};
