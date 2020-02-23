import axios from "axios";
import { ADD_PROJECT, GET_PROJECT, PROJECT_LOADING } from "./types"

// Add Project Action
export const addProject = ({ name, desc, visibility, tech, links }) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({
        projectName: name,
        description: desc,
        visibility: visibility,
        // ownerUserID: userid,
        // gitRepoID: repoID,
        technologiesUsed: tech,
        techLinks: links
    })

    try {
        const res = await axios.post("/api/projects/create", body, config);

        // If success, dispatch action
        if (res) {
            dispatch({
                type: ADD_PROJECT,
                payload: res.data
            });
        } else {
            console.log("Couldn't add venture");
        }
    } catch (err) {
        console.log("Error Creating a Project");
        console.log(err);
    }
};