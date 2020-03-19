import axios from "axios";
import { GET_USERS, USER_REQUESTED, GET_UIDS } from "./types"

//Get All Users 

export const getUsers = () => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const res = await axios.get("/api/users/public", config);

        // If success, dispatch action
        if (res) {
            dispatch({
                type: GET_USERS,
                payload: res.data.users_obj.users_lst
            });
        } else {
            console.log("Couldn't get users");
        }
    } catch (err) {
        console.log("Error occured when retrieving users");
        console.log(err);
    }
};

//Get All Uids
export const getUids = () => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const res = await axios.get("/api/users/publicUid", config);

        // If success, dispatch action
        if (res) {
            dispatch({
                type: GET_UIDS,
                payload: res.data.uid_obj.uid_lst
            });
        } else {
            console.log("Couldn't get users");
        }
    } catch (err) {
        console.log("Error occured when retrieving users");
        console.log(err);
    }
};


// Record the fact that follower follows the followee
export const request_user = (requestee, requester) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const url = '/api/users/request';
    const body = JSON.stringify({ requestee: requestee, requester: requester });
    console.log(body);

    axios.post(url, body, config).then((response) => {
        console.log("Requested");
        dispatch({
            type: USER_REQUESTED,
            payload: response.data
        });
    }).catch((err) => {
        //find out what error to return if some error occurs
        // dispatch({
        //     type: ATTEMPT
        // });
        console.log("Error occurred while requesting");
    });
};