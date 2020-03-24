import {
    LOGIN,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT
} from "../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    loggedIn: null,
    profile: {}
};

export default (state = initialState, action) => {
    // console.log("action type "+action.type);
    switch (action.type) {
        case USER_LOADED:
            console.log("SETTING PROFILE" + JSON.stringify(action.payload));
            return {
                ...state,
                loggedIn: true,
                profile: action.payload
            }
        case LOGIN:
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                loggedIn: true,
                profile: action.payload
            };
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                loggedIn: false,
                profile: {}
            };
        default:
            return state;
    }
};