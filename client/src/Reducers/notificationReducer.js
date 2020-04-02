import { GET_PROJECT_NOTIFICATIONS, GET_NOTIFICATIONS } from "../actions/types";

const initialState = {
  projectNotifications: [],
  notifications: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Get nofications related to projects
    case GET_PROJECT_NOTIFICATIONS:
      return {
        ...state,
        projectNotifications: action.payload
      };
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload
      };
    default:
      return state;
  }
};
