import { GET_GIT_REPOS } from "../actions/types";

// This initial state is a representation of what we need to store in the store
const initialState = {
    githubRepos: {},
    loading: true
};

// Takes the previous state, and an action, and returns the next state
export default (state = initialState, action) => {
    // Determine which type of action was sent to the store
    // console.log("Currently in github reducer");
    // console.log(action.payload);
    switch (action.type) {
        case GET_GIT_REPOS:
            return {
                // for syntax, see https://redux.js.org/recipes/using-object-spread-operator/
                ...state,
                githubReposFromState: action.payload,
                loading: false
            };
        default:
            return state;
    }
};