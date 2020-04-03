import {
  GET_USERS,
  GET_REQUESTS,
  USER_ALREADY_REQUESTED,
  USER_REQUESTED,
  RESOURCE_NOT_FOUND,
  INVALID
} from "../actions/types";

// Add Single Project
const initialState = {
  users: [],
  uids: [],
  requests: [],
  loading: true,
  status: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        loading: false,
        users: action.payload
      };
    case GET_REQUESTS:
      return {
        ...state,
        requests: action.payload
      };
    case USER_ALREADY_REQUESTED:
      return {
        ...state,
        status: 400
      };
    case USER_REQUESTED:
      return {
        ...state,
        status: 200
      };
    case RESOURCE_NOT_FOUND:
      return {
        ...state,
        status: 404
      };
    case INVALID:
      return {
        ...state,
        status: 409
      };
    default:
      return state;
  }
};
