import {
    GET_USERS
} from "../actions/types";

// Add Single Project
const initialState = {
    users: [],
    loading: true
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                loading: false,
                users: action.payload
            };
        default:
            return state;
    }
};