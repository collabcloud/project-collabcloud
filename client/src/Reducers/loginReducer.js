import {
    LOGIN,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT
} from "../actions/types";

const initialState = {
    loggedIn: false
};

export default (state = initialState, action) => {
    // console.log("action type "+action.type);
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                loggedIn: true
            }
        case LOGIN:
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                loggedIn: true
            };
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                loggedIn: false
            };
        default:
            return state;
    }
};