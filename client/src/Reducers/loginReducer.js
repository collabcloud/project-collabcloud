import {
    LOGIN
} from "../actions/types";

// Add Single Project
const initialState = {
    loggedIn: false,

};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loggedIn: true
            };
        default:
            return state;
    }
};