import { POST_SUCCESSFUL } from "../actions/types";

// This initial state is a representation of what we need to store in the store
const initialState = {
  link: ""
};

// Takes the previous state, and an action, and returns the next state
export default (state = initialState, action) => {
  // Determine which type of action was sent to the store
  switch (action.type) {
    case POST_SUCCESSFUL:
      return {
        ...state,
        link: action.payload
      };
    default:
      return state;
  }
};
