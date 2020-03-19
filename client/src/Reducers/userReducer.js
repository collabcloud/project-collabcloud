import {
    GET_USERS,
    USER_ALREADY_REQUESTED,
    USER_REQUESTED,
    GET_UIDS
} from "../actions/types";

// Add Single Project
const initialState = {
    users: [],
    uids: [],
    loading: true,
    requested: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                loading: false,
                users: action.payload
            };
        case GET_UIDS:
            return {
                ...state,
                loading: false,
                uids: action.payload
            }
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