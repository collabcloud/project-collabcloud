import axios from "axios";
import { ADD_PROJECT, GET_PROJECT, PROJECT_LOADING, GET_PUBLIC_PROJECTS } from "./types"

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

//Get Public Projects

export const getPublicProjects = () => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const res = await axios.get("/api/projects/", config);
        
        // If success, dispatch action
        if (res) {
            dispatch({
                type: GET_PUBLIC_PROJECTS,
                payload: res.data.projects_obj.projects_lst         
            });
        } else {
            console.log("Couldn't get projects");
        }
    } catch (err) {
        console.log("Error Retrieving projects");
        console.log(err);
    }
};