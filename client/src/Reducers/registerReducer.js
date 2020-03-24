import {
    GET_TOKEN, GITHUB_EXISTS, ATTEMPT
} from "../actions/types";

// Add Single Project
const initialState = {
    loggedIn: false,
    attempted: false,
    registered: false,
    githubExists: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ATTEMPT:
            const obj = {
                ...state,
                attempted: true,
                registered: false,
                githubExists: false
            }
            return obj;
        case GET_TOKEN:
            const obj1 = {
                ...state,
                attempted: true,
                registered: true,
                githubExists: false
            }
            return obj1;
        case GITHUB_EXISTS:
            const obj2 = {
                ...state,
                attempted: true,
                registered: false,
                githubExists: true
            };
            return obj2;
        default:
            return state;
    }
};