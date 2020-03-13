import axios from "axios";
import { USER, RESOURCE_NOT_FOUND, ATTEMPT, GET_SUBFORUMS, GET_SUCCESSFUL } from "./types";

//Returns a list of subforum objects
//{sid: XXXXX, name: XXXXX, desc: XXXXX}
export const get_subforums = () => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const url = '/api/forum/subforum';
    
    axios.get(url, config).then((response) => {
        dispatch({
            type: GET_SUCCESSFUL,
            payload: response.data
        });
    }).catch((err) => {
        if (err.response.status === 404) {
            dispatch({
                type: RESOURCE_NOT_FOUND
            });
        } else {
            dispatch({
                type: ATTEMPT
            });
        }
    })
};


//Returns a list of thread objects
//{tid: XXXXX, sid: XXXX, topic: XXXXX, content: XXXXX, submitter: XXXXX, dateCreated: XXXXXX}
export const get_threads = (sid) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const url = '/api/forum/thread';
    const body = JSON.stringify({sid: sid});
    
    axios.get(url, body, config).then((response) => {
        dispatch({
            type: GET_SUCCESSFUL,
            payload: response.data
        });
    }).catch((err) => {
        if (err.response.status === 404) {
            dispatch({
                type: RESOURCE_NOT_FOUND
            });
        } else {
            dispatch({
                type: ATTEMPT
            });
        }
    })
};


//Returns a list of post objects in the specified thread
//{tid: XXXXX, sid: XXXX, topic: XXXXX, content: XXXXX, submitter: XXXXX, dateCreated: XXXXXX}
export const get_posts = (sid) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const url = '/api/forum/thread';
    const body = JSON.stringify({sid: sid});
    
    axios.get(url, body, config).then((response) => {
        dispatch({
            type: GET_SUCCESSFUL,
            payload: response.data
        });
    }).catch((err) => {
        if (err.response.status === 404) {
            dispatch({
                type: RESOURCE_NOT_FOUND
            });
        } else {
            dispatch({
                type: ATTEMPT
            });
        }
    })
};

//{}
export const post_subforum = (name, description) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const url = '/api/forum/post';
    const body = JSON.stringify({name: name, description: description});
    
    axios.get(url, body, config).then((response) => {
        dispatch({
            type: GET_SUCCESSFUL,
            payload: response.data
        });
    }).catch((err) => {
        if (err.response.status === 404) {
            dispatch({
                type: RESOURCE_NOT_FOUND
            });
        } else {
            dispatch({
                type: ATTEMPT
            });
        }
    })
};

export const post_thread = (sid, submitter, topic, content) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const url = '/api/forum/post';
    const body = JSON.stringify({sid: sid, submitter: submitter, 
        topic: topic, content: content});
    
    axios.post(url, body, config).then((response) => {
        dispatch({
            type: GET_SUCCESSFUL,
            payload: response.data
        });
    }).catch((err) => {
        if (err.response.status === 404) {
            dispatch({
                type: RESOURCE_NOT_FOUND
            });
        } else {
            dispatch({
                type: ATTEMPT
            });
        }
    })
};

export const make_post = (tid, sid, submitter, content) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const url = '/api/forum/post';
    const body = JSON.stringify({tid: tid, sid: sid, submitter: submitter, 
        content: content});
    
    axios.post(url, body, config).then((response) => {
        dispatch({
            type: GET_SUCCESSFUL,
            payload: response.data
        });
    }).catch((err) => {
        if (err.response.status === 404) {
            dispatch({
                type: RESOURCE_NOT_FOUND
            });
        } else {
            dispatch({
                type: ATTEMPT
            });
        }
    })
};