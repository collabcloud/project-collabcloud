import {
    SEARCH
} from "../actions/types";

// Add Single Project
const initialState = {
    searchedProjects: [],
    searchedUsers: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SEARCH:
            return {
                ...state,
                searchedProjects: action.payload.projects,
                searchedUsers: action.payload.users
            }
        default:
            return state;
    }
};