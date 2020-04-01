import {
  RESOURCE_NOT_FOUND,
  POST_SUCCESSFUL,
  GET_SUBFORUMS,
  GET_SUBFORUM,
  GET_THREAD,
  GET_THREADS,
  GET_POSTS,
  ATTEMPT
} from "../actions/types";

// This initial state is a representation of what we need to store in the store
const initialState = {
  followed: false,
  status: 0,
  subforum: "",
  thread: "",
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
        status: 200
      };
    case GET_SUBFORUM:
      return {
        ...state,
        subforum: action.payload,
        status: 200
      };
    case GET_SUBFORUMS:
      return {
        ...state,
        subforums: action.payload,
        status: 200
      };
    case GET_THREAD:
      return {
        ...state,
        thread: action.payload,
        status: 200
      };
    case GET_THREADS:
      return {
        ...state,
        threads: action.payload,
        status: 200
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        status: 200
      };
    case RESOURCE_NOT_FOUND:
      return {
        ...state,
        status: 404
      };
    case ATTEMPT:
      return {
        ...state,
        status: 500
      };
    default:
      return state;
  }
};
