import axios from "axios";
import { SEARCH } from "./types"

// Add Project Action
export const search = (searchTerm) => async dispatch => {
    const config = {
        params: {
            term: searchTerm
        }
    };


    try {
        var url = "api/search";
        const res = await axios.get(url, config);

        // If success, dispatch action
        if (res) {
            dispatch({
                type: SEARCH,
                payload: res.data
            });
            
        } else{
            console.log("Couldn't add venture");
        }
    } catch (err) {
        console.log("Error occured while creating a project");
        console.log(err);
    }
};
