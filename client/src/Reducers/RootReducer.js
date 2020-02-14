import { combineReducers } from "redux";
import registerReducer from "./registerReducer";
import projectReducer from "./projectReducer";

export default combineReducers({
    project: projectReducer,
    register: registerReducer

});
