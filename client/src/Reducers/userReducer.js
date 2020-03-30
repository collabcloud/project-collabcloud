import { LOGIN, GET_SUCCESSFUL, RESOURCE_NOT_FOUND } from "../actions/types";

const initialState = {
  uid: localStorage.getItem("uid"),
  other_profile: {},
  status: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("uid", action.payload.uid);
      return {
        ...state,
        uid: action.payload.uid
      };
    case GET_SUCCESSFUL:
      return {
        ...state,
        other_profile: action.payload,
        status: 200
      };
    case RESOURCE_NOT_FOUND:
      return {
        ...state,
        status: 404
      };
    default:
      return state;
  }
};
