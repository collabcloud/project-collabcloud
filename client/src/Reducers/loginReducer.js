import {
    LOGIN
} from "../actions/types";

// Add Single Project
const initialState = {
    loggedIn: false
};

export default (state = initialState, action) => {
    
    console.log("action type "+action.type);
    switch (action.type) {
        case LOGIN:
            console.log("Here");
            return {
                ...state,
                loggedIn: true
            };
        default:
            return state;
    }
};