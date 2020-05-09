import {
  GET_TOKEN,
  GITHUB_EXISTS,
  ATTEMPT,
  GITHUB_USERNAME_NOMATCH
} from "../actions/types";

// Add Single Project
const initialState = {
  loggedIn: false,
  attempted: false,
  registered: false,
  githubExists: false,
  wrongUser: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ATTEMPT:
      return {
        ...state,
        attempted: true,
        registered: false,
        githubExists: false
      };

    case GET_TOKEN:
      return {
        ...state,
        attempted: true,
        registered: true,
        githubExists: false
      };

    // This case is when the user already has an account with the same username registered and saved in the CollabCloud database
    case GITHUB_EXISTS:
      return {
        ...state,
        attempted: true,
        registered: false,
        githubExists: true
      };

    case GITHUB_USERNAME_NOMATCH:
      return {
        ...state,
        attemped: true,
        registered: false,
        wrongUser: true
      };
    default:
      return state;
  }
};
