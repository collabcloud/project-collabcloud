import axios from "axios";
import { USER_LOADED, PUT_SUCCESSFUL, GET_SUCCESSFUL } from "./types";
import { setAlert } from "./alert";

export const get_user_info = uid => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const url = "/api/user/" + uid;
    let response = await axios.get(url, config);

    if (response) {
      if (response.status === 404) {
        dispatch(setAlert("Requested UID doesn't exist", "danger"));
      } else if (response.status === 200) {
        dispatch({
          type: GET_SUCCESSFUL,
          payload: response.data
        });
      }
    }
  } catch (err) {
    console.log("Error occurred while retrieving user data");
    console.log(err);
  }
};

export const update_user_info = ({
  uid,
  username,
  name,
  last_name,
  city_field,
  province,
  description
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const url = "/api/users/profile";
    if (province === "Choose...") {
      province = undefined;
      city_field = undefined;
    }
    if (name === "" || last_name === "") {
      name = undefined;
      last_name = undefined;
    }
    if (description === "") {
      description = undefined;
    }
    const body = {
      uid: uid,
      name: name,
      last_name: last_name,
      city_field: city_field,
      province: province,
      description: description
    };
    let response = await axios.put(url, body, config);
    // TODO: Add in a type for if the response fails, and then catch that type
    if (response) {
      //uid doesnt exist
      if (response.status === 400) {
        dispatch(setAlert("UID doesn't exist", "danger"));
      } else if (response.status === 200) {
        dispatch({
          type: USER_LOADED,
          payload: {
            uid: uid,
            username: username,
            firstname: name,
            lastname: last_name,
            city: city_field,
            province: province,
            description: description,
            avatar: response.data.avatar
          }
        });
        dispatch(setAlert("Updated Profile", "success"));
      }
      // Internal server error
      else {
        console.log("500 Internal Server Error");
      }
    } else {
      console.log("Couldn't retrieve user");
    }
  } catch (err) {
    console.log("Error occurred while retrieving user data");
    console.log(err);
  }
};

export const update_avatar = ({ uid, image }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const url = "/api/users/avatar";
    const body = {
      uid: uid,
      image: image
    };
    let response = await axios.put(url, body, config);
    if (response) {
      // Login information is wrong (eg. wrong password or username)
      if (response.status === 400) {
        console.log("UID doesn't exist");
        dispatch(setAlert("UID doesn't exist", "danger"));
      }
      // User logs in successfully
      else if (response.status === 200) {
        console.log("update success");
        dispatch({ type: PUT_SUCCESSFUL });
        dispatch(setAlert("Uploaded avatar", "success"));
      }
      // Internal server error
      else {
        console.log("500 Internal Server Error");
      }
    } else {
      console.log("Couldn't retrieve user");
    }
  } catch (err) {
    console.log("Error occurred while retrieving user data");
    console.log(err);
  }
};
