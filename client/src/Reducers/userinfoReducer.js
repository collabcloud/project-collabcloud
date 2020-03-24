import {
    GET_INFO
} from "../actions/types";

// Add Single Project
const initialState = {
    profile: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_INFO:
            return {
                ...state,
                profile: action.payload 
            };
        default:
            return state;
    }
};