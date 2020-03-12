import axios from "axios";
import { USER, USER_NOT_FOUND, ATTEMPT, GET_SUBFORUMS, GET_SUCCESSFUL } from "./types";

export const get_subforums = () => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const url = '/api/forum/getSubforums';
    
    axios.get(url, config).then((response) => {
        dispatch({
            type: GET_SUCCESSFUL,
            payload: response.data
        });
    }).catch((err) => {
        if (err.response.status === 404) {
            dispatch({
                type: DATA_NOT_FOUND
            });
        } else {
            dispatch({
                type: ATTEMPT
            });
        }
    })
};

export const get_threads = (sid) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const url = '/api/forum/getThreads';
    const body = JSON.stringify({sid: sid});
    
    axios.get(url, body, config).then((response) => {
        dispatch({
            type: GET_SUCCESSFUL,
            payload: response.data
        });
    }).catch((err) => {
        if (err.response.status === 404) {
            dispatch({
                type: DATA_NOT_FOUND
            });
        } else {
            dispatch({
                type: ATTEMPT
            });
        }
    })
};

export const get_posts = (tid) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const url = '/api/forum/getPosts';
    const body = JSON.stringify({tid: tid});
    
    axios.get(url, body, config).then((response) => {
        dispatch({
            type: GET_SUCCESSFUL,
            payload: response.data
        });
    }).catch((err) => {
        if (err.response.status === 404) {
            dispatch({
                type: DATA_NOT_FOUND
            });
        } else {
            dispatch({
                type: ATTEMPT
            });
        }
    })
};

export const post_thread = (tid) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const url = '/api/forum/getPosts';
    const body = JSON.stringify({tid: tid});
    
    axios.get(url, body, config).then((response) => {
        dispatch({
            type: GET_SUCCESSFUL,
            payload: response.data
        });
    }).catch((err) => {
        if (err.response.status === 404) {
            dispatch({
                type: DATA_NOT_FOUND
            });
        } else {
            dispatch({
                type: ATTEMPT
            });
        }
    })
};




/*
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
*/