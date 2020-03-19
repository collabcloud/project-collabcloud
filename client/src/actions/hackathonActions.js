import axios from "axios";
import { GET_HACKATHONS } from "./types"

export const getHackathons = () => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const res = await axios.get("/api/hackathons/", config);
        
        // If success, dispatch action
        if (res) {
            dispatch({
                type: GET_HACKATHONS,
                payload: res.data.hackathons_obj.hackathons_lst         
            });
        } else {
            console.log("Couldn't get hackathons");
        }
    } catch (err) {
        console.log("Error occured when retrieving hackathons");
        console.log(err);
    }
};
