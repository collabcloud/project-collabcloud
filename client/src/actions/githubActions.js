/* These actions are for any interaction (other than authentication) with the GitHub API */
import axios from "axios";
import { GET_GIT_REPOS } from "./types"

// Create an action to save GitHub repo information for a given user to the store
export const getGithubRepos = ({ githubUsername, repoVisibility }) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        // Send a GET request to the back-end to get the user's repos
        const res = await axios.get("/api/github/repos", {
            params: {
                username: githubUsername,
                visibility: repoVisibility
            }
        }, config);
        
        // If success, dispatch the action
        if (res) {
            // Send our information to the store
            dispatch({
                type: GET_GIT_REPOS,
                payload: res.data
            });
        } else {
            console.log(`An error occured. Error: ${res.status}`);
        }
    } catch (err) {
        console.log("Error occurred when getting GitHub repos");
        console.log(err);
    }
};