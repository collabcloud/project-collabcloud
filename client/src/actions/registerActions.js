import axios from "axios";
import {
  GET_TOKEN,
  GITHUB_EXISTS,
  ATTEMPT,
  GITHUB_USERNAME_NOMATCH
} from "./types";

// Registeration action
export const register = (auth_code, formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const url = "/api/users/register";
  const body = JSON.stringify({ code: auth_code, ...formData });

  // If success, dispatch action
  axios
    .post(url, body, config)
    .then(response => {
      // Registration succeeded
      dispatch({
        type: GET_TOKEN,
        payload: response.data
      });
    })
    .catch(err => {
      // Registration failed
      console.log(`Error occurred while registering. Code is ${err.response.status}`);
      if (err.response.status === 301) {
        // Provided username already exists in database
        dispatch({
          type: GITHUB_EXISTS
        });
      } else if (err.response.status === 400) {
        dispatch({
          type: GITHUB_USERNAME_NOMATCH
        });
      } else {
        dispatch({
          type: ATTEMPT
        });
      }
    });
};
