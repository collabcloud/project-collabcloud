import { combineReducers } from "redux";
import projectReducer from "./projectReducer";

export default combineReducers({
    project: projectReducer
});
