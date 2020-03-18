import axios from "axios";
import { GET_INFO } from "./types";
import {setAlert} from "./alert";

export const get_user_info = (uid) => async dispatch => {

	const config = {
		headers: {
			"Content-Type": "application/json"
		}
    };
	try {
        const url = "/api/users/profile";
        const body = JSON.stringify({uid});
        console.log("body is " + body);
		let response = await axios.get(url, {
            params: {
                uid: uid
            }
        }, config);
        // TODO: Add in a type for if the response fails, and then catch that type
		if (response) {
            // Login information is wrong (eg. wrong password or username)
            if (response.status === 400) {
                console.log("UID doesn't exist");
            }
            // User logs in successfully
            else if (response.status === 200) {
                console.log("retrieved the record: " + response.data.user);
                dispatch({
                    type: GET_INFO,
                    payload: response.data.user
                });
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


export const update_user_info = ({uid, name, last_name, city_field, province, description}) => async dispatch => {

    const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            const url = "/api/users/profile";
            const body = {
                uid: uid, 
                name: name, 
                last_name: last_name, 
                city_field: city_field, 
                province: province, 
                description: description};
            console.log(body);
            let response = await axios.put(url, body, config);
            // TODO: Add in a type for if the response fails, and then catch that type
            if (response) {
                // Login information is wrong (eg. wrong password or username)
                if (response.status === 400) {
                    console.log("UID doesn't exist");
                    dispatch(
                        setAlert("UID doesn't exist", "danger")
                    );
                }
                // User logs in successfully
                else if (response.status === 200) {
                    console.log("update success")
                    dispatch({
                        type: GET_INFO,
                        payload: {
                            uid: uid,
                            firstname: name,
                            lastname: last_name,
                            city: city_field,
                            province: province,
                            description: description
                        }
                    });
                    dispatch(
                        setAlert("Updated Profile", "success")
                    );
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
      },
      config
    );
    // TODO: Add in a type for if the response fails, and then catch that type
    if (response) {
      // Login information is wrong (eg. wrong password or username)
      if (response.status === 400) {
        console.log("UID doesn't exist");
      }
      // User logs in successfully
      else if (response.status === 200) {
        dispatch({
          type: GET_INFO,
          payload: response.data.user
        });
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

export const update_user_info = ({
  uid,
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
      // Login information is wrong (eg. wrong password or username)
      if (response.status === 400) {
        console.log("UID doesn't exist");
      }
      // User logs in successfully
      else if (response.status === 200) {
        dispatch({
          type: GET_INFO,
          payload: {
            uid: uid,
            firstname: name,
            lastname: last_name,
            city: city_field,
            province: province,
            description: description
          }
        });
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
