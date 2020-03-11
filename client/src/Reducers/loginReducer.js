import {
    LOGIN
} from "../actions/types";

const initialState = {
    loggedIn: false
};

export default (state = initialState, action) => {
    // console.log("action type "+action.type);
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