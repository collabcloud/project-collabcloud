import {
    LOGIN,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT
} from "../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    profile: {},
    loggedIn: null
};

export default (state = initialState, action) => {
    // console.log("action type "+action.type);
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                profile: action.payload,
                loggedIn: true
            }
        case LOGIN:
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                profile:action.payload,
                loggedIn: true
            };
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                profile: {},
                loggedIn: false
            };
        default:
            return state;
    }
};