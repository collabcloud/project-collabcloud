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

    const body = JSON.stringify({ 
        username: githubUsername,
        visibility: repoVisibility
    })
    try {
        const res = await axios.get("/api/github/repos", {
            params: {
                username: "matthuynh",
                visibility: "public"
            }
        }, config);
        
        // If success, dispatch the action
        if (res) {
            // console.log(res);
            // Send our information to the store
            dispatch({
                type: GET_GIT_REPOS,
                payload: res.data
            });
        } else {
            console.log(`Some other error, error code is ${res.status}`);
        }
    } catch (err) {
        console.log("Error with getting GitHub repos");
        console.log(err);
    }
};