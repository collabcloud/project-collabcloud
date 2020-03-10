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
    console.log(body);
    
    axios.post(url, body, config).then((response)=>{
        console.log("Followed");
        dispatch({
            type: USER,
            payload: response.data
        });
    }).catch((err) => {
        console.log(err.response.status);
        if (err.response.status == 404) {
            console.log("One or more users do not exist");
            dispatch({
                type: USER_NOT_FOUND
            });
        }
        else{
            dispatch({
                type: ATTEMPT
            });

        }
    console.log("Error occurred while following");
        });
    
};