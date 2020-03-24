import {
    GET_USERS,
    USER_ALREADY_REQUESTED,
    USER_REQUESTED,
} from "../actions/types";

// Add Single Project
const initialState = {
    users: [],
    uids: [],
    loading: true,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                loading: false,
                users: action.payload
            };
        case USER_ALREADY_REQUESTED:
            return {
                ...state
            };
        case USER_REQUESTED:
            return {
                ...state
            };
        default:
            return state;
    }
};