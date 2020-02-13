import axios from "axios";
import {GET_TOKEN} from "./types";
import { FaClosedCaptioning } from "react-icons/fa";

// Add Project Action
export const register = (auth_code, username, password) => async dispatch => {
    console.log("Redux register");
    console.log(auth_code);
    console.log(username);
    console.log(password)
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const url = '/api/users/register';
        const body = JSON.stringify({code: auth_code,  username, password})
        console.log(body)
        let response = await axios.post(url, body, config);
        
        // If success, dispatch action
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