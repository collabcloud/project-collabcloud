import {
    LOGIN
} from "../actions/types";

// Add Single Project
const initialState = {
    loggedIn: false
};

export default (state = initialState, action) => {
    // console.log("action type "+action.type);
    switch (action.type) {
        case LOGIN:
            console.log("loginReducer.js line 14: loggedIn value is true");
            return {
                ...state,
                loggedIn: true
            };
        default:
            console.log("loginReducer.js line 20");
            return state;
    }
};