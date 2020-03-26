import axios from "axios";
import { LOGIN, USER_LOADED, AUTH_ERROR, LOGOUT } from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => async dispatch => {
	if (localStorage.token) {
	  setAuthToken(localStorage.token);
	}
  
	try {
	  const res = await axios.get("/api/users/auth");
	  dispatch({
		type: USER_LOADED,
		payload: res.data[0]
	  });

	} catch (err) {
	  dispatch({
		type: AUTH_ERROR
	  });
	}
};

export const setRegisterMessage = (error, type, timeout) => async dispatch => {
	dispatch({
		type: AUTH_ERROR
	});
	dispatch(setAlert(error, type, timeout = timeout));	
}

export const login = (username, password) => async dispatch => {

	const config = {
		headers: {
			"Content-Type": "application/json"
		}
    };
	try {
		const url = "/api/users/login";
		const body = JSON.stringify({ username, password });
		let response = await axios.post(url, body, config);
        // TODO: Add in a type for if the response fails, and then catch that type
		if (response) {
            // Login information is wrong (eg. wrong password or username)
            if (response.status === 400) {
				console.log("Username or password does not exist, or is incorrect");
				dispatch({
					type: AUTH_ERROR
				})
				dispatch(setAlert("Invalid Credentials", "danger"));	
            }
            // User logs in successfully
            else if (response.status === 200) {
                dispatch({
                    type: LOGIN,
                    payload: response.data
				});
				dispatch(loadUser());
            	dispatch(setAlert("Login Successful", "success"));
            } else {
                console.log("Couldn't login: 500 Internal Server Error");    
            }
		} else {
			dispatch({
				type: AUTH_ERROR
			})
			console.log("Couldn't Login");
		}
	} catch (err) {
		dispatch({
			type: AUTH_ERROR
		})
		console.log("Error occurred while logging In");
		dispatch(setAlert("Invalid Credentials", "danger"));
		console.log(err);
	}
};

// Logout
export const logout = () => dispatch => {
	dispatch({ type: LOGOUT });
};
