import axios from "axios";
import {GET_TOKEN} from "./types";
import { FaClosedCaptioning } from "react-icons/fa";

// Add Project Action
export const addProject = auth_code => async dispatch => {
    config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const url = '/api/users/register/github';
        const myJSON = {code: auth_code}
        let response = await axios({
            url: url,
            method: 'POST',
            config,
            body: JSON.stringify(myJSON)
        });
        
        // If success, dispatch action
        if (res) {
            dispatch({
                type: ADD_PROJECT,
                payload: res.data._id
            });
        }
    } catch (err) {
        console.log("Error Creating a Project");
        console.log(err);
    }
};