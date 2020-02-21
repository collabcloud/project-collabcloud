import { combineReducers } from "redux";
import registerReducer from "./registerReducer";
import projectReducer from "./projectReducer";
import githubReducer from "./githubReducer";

export default combineReducers({
    project: projectReducer,
    register: registerReducer,
    github: githubReducer
});
