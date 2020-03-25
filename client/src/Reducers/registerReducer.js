import {
    GET_TOKEN, GITHUB_EXISTS, ATTEMPT, GITHUB_USERNAME_NOMATCH
} from "../actions/types";

// Add Single Project
const initialState = {
    loggedIn: false,
    attempted: false,
    registered: false,
    githubExists: false,
    wrongUser: false
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
        case GITHUB_USERNAME_NOMATCH:
            const obj3 = {
                ... state,
                attemped: true,
                registered: false,
                wrongUser: true
            };
            console.log("what")
            return obj3;
        default:
            return state;
    }
};