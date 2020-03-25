import { GET_INFO, PUT_SUCCESSFUL } from "../actions/types";

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
    case PUT_SUCCESSFUL:
      return {
        ...state,
        status: "SUCCESS"
      };
    default:
      return state;
  }
};
