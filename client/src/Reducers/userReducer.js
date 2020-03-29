import { LOGIN, GET_SUCCESSFUL } from "../actions/types";

const initialState = {
  uid: localStorage.getItem("uid"),
  other_profile: {}
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
        other_profile: action.payload[0]
      };
    default:
      return state;
  }
};
