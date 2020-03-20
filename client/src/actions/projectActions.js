import axios from "axios";
import { ADD_PROJECT, GET_PROJECT, UPDATE_PROJECT, DELETE_PROJECT, GET_PUBLIC_PROJECTS } from "./types"

// Add Project Action
export const addProject = ({ name, desc, isProjectPublic, ownerId, tech, links }) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({
        projectName: name,
        description: desc,
        isProjectPublic: isProjectPublic,
        ownerUserID: ownerId,
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
        console.log("Error occured while creating a project");
        console.log(err);
    }
};

// Get Public Projects
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
        console.log("Error occured when retrieving projects");
        console.log(err);
    }
};

// Given a project ID, return all information for that project
export const getProjectInformation = ({ projectId }) => async dispatch => {    
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        // Get all information for a given project
        const res = await axios.get("/api/projects/information", {
            params: {
                projectId: projectId
            }
        }, config);

        // If success, dispatch the action
        if (res.status === 200) {
            // Send our information to the redux store
            dispatch({
                type: GET_PROJECT,
                payload: res.data
            });
        } else {
            console.log(`An error occured. Error code: ${res.status}`);
        }
    } catch (err) {
        console.log("Error occured when retrieving information for a single project");
        console.log(err)
    }
};

// Given a projectId and attributes to update, hit the backend to update that project
export const updateProject = ({ pid, projectName, projectDescription, isProjectPublic, tech, links }) => async dispatch => {
    // console.log("Hit updateProject in projectActions");
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({
        pid: pid,
        projectName: projectName,
        description: projectDescription,
        isProjectPublic: isProjectPublic,
        // ownerUserID: userid,
        // gitRepoID: repoID,
        technologiesUsed: tech,
        techLinks: links
    });

    try {
        const res = await axios.post("/api/projects/update", body, config);
        // If success, dispatch action
        if (res.status === 200) {
            dispatch({
                type: UPDATE_PROJECT
            });
        } else {
            console.log("Could not update project");
        }
    } catch (err) {
        console.log("Error occured while updating a project");
        console.log(err);
    }
}

// Given a projectId hit the backend to YEET that project
export const deleteProject = (projectId) => async dispatch => {
    // console.log("Hit deleteProject in projectActions");
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({
        pid: projectId,
    })

    try {
        const res = await axios.post("/api/projects/delete", body, config);

        // If success, dispatch action
        if (res.status === 200) {
            dispatch({
                type: DELETE_PROJECT
            });
        } else {
            console.log("Could not delete project");
        }
    } catch (err) {
        console.log("Error occured while deleting a project");
        console.log(err);
    }
}