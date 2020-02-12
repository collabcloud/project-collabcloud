import axios from "axios";
import { ADD_PROJECT, GET_PROJECT, PROJECT_LOADING } from "../actions/types";
import { FaClosedCaptioning } from "react-icons/fa";

// Add Project Action
export const addProject = formData => async dispatch => {
    config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const res = await axios.post(
            "/api/projects/create",
            formData,
            config
        );
        
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