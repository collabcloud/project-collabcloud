import {
    GET_TOKEN
} from "../actions/types";

// Add Single Project
const initialState = {
    loggedIn: false,

};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_TOKEN:
            return {
                ...state,
                loggedIn: true
            };
        default:
            return state;
    }
};