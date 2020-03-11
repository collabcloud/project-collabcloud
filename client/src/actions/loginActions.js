import axios from "axios";
import { LOGIN } from "./types";
import { setAlert } from "./alert";

export const login = (username, password) => async dispatch => {
	//console.log("Redux register");
	//console.log(username);
	//console.log(password);

	const config = {
		headers: {
			"Content-Type": "application/json"
		}
    };
	try {
		const url = "/api/users/login";
		const body = JSON.stringify({ username, password });

		let response = await axios.post(url, body, config);
		//console.log("response" + response);
        //console.log("response status" + response.status);
        // TODO: Add in a type for if the response fails, and then catch that type
		if (response) {
            // Login information is wrong (eg. wrong password or username)
            if (response.status === 400) {
				console.log("Username or password does not exist, or is incorrect");
				dispatch(setAlert("Invalid Credentials", "danger"));
				
            }
            // User logs in successfully
            else if (response.status === 200) {
                //console.log("if response");
                dispatch({
                    type: LOGIN,
                    payload: response.data
				});
				
				dispatch(setAlert("Login Successful", "success"));
            } 
            // Internal server error
            else {
                console.log("Couldn't login: 500 Internal Server Error");    
            }
		} else {
			console.log("Couldn't Login");
		}
	} catch (err) {
		console.log("Error occurred while logging In");
		dispatch(setAlert("Invalid Credentials", "danger"));
		console.log(err);
	}
};
