import axios from "axios";
import { USER, USER_NOT_FOUND, ATTEMPT } from "./types";

// Record the fact that follower follows the followee
export const follow_user = (followee, follower) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const url = '/api/follow/user';
    const body = JSON.stringify({followee: followee, follower: follower});
    
    axios.post(url, body, config).then((response)=>{
        dispatch({
            type: USER,
            payload: response.data
        });
    }).catch((err) => {
        if (err.response.status === 404) {
            dispatch({
                type: USER_NOT_FOUND
            });
        }
        else{
            dispatch({
                type: ATTEMPT
            });

        }
        });
    
};