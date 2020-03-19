import { USER_REQUESTED, USER_ALREADY_REQUESTED } from "../actions/types";

// This initial state is a representation of what we need to store in the store
const initialState = {
    requested: false
};

// Takes the previous state, and an action, and returns the next state
export default (state = initialState, action) => {
    // Determine which type of action was sent to the store
    switch (action.type) {
        case USER_ALREADY_REQUESTED:
            return {
                ...state,
                requested: true
            };
        case USER_REQUESTED:
            return {
                ...state,
                requested: true
            };
        default:
            return state;
    }
};