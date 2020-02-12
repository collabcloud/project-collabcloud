import {
    ADD_PROJECT,
    GET_PROJECT,
    PROJECT_LOADING
} from "../actions/types";

// Add Single Project
const initialState = {
    projects = {},
    loading: true
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PROJECT:
            return {
                ...state,
                projects: {
                ...state.projects,
                [action.payload.id]: action.payload
            },
            loading: true
        }
        default:
            return state;
    }
};