import axios from "axios";
import { GET_TOKEN } from "./types";

// Registeration action
export const register = (auth_code, formData) => async dispatch => {
    console.log("Redux register");
    console.log(auth_code);
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const url = '/api/users/register';
        const body = JSON.stringify({code: auth_code, ...formData})
        console.log(body)
        let response = await axios.post(url, body, config);
        
        // If success, dispatch action
        // TODO: Check the response for whether or not the user is 
        // already registered on github or not
        if (response) {
            dispatch({
                type: GET_TOKEN,
                payload: response.data
            });
        }
        else{
            console.log("Couldnt register");
        }
    } catch (err) {
        console.log("Error Creating a Project");
        console.log(err);
    }
};