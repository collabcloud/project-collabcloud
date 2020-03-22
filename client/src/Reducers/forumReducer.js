import {
  RESOURCE_NOT_FOUND,
  POST_SUCCESSFUL,
  GET_SUBFORUMS,
  GET_THREADS,
  GET_POSTS,
  ATTEMPT
} from "../actions/types";

// This initial state is a representation of what we need to store in the store
const initialState = {
  followed: false,
  status: "",
  subforums: [],
  threads: [],
  posts: []
};

// Takes the previous state, and an action, and returns the next state
export default (state = initialState, action) => {
  // Determine which type of action was sent to the store
  switch (action.type) {
    case POST_SUCCESSFUL:
      return {
        ...state,
        status: "Success"
      };
    case GET_SUBFORUMS:
      return {
        ...state,
        subforums: action.payload,
        status: "Success"
      };
    case GET_THREADS:
      return {
        ...state,
        threads: action.payload,
        status: "Success"
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        status: "Success"
      };
    case RESOURCE_NOT_FOUND:
      return {
        ...state,
        status: "404 Resource Not Found"
      };
    case ATTEMPT:
      return {
        ...state,
        status: "500 Internal Server Error"
      };
    default:
      return state;
  }
};
