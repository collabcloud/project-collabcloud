import { combineReducers } from "redux";
import registerReducer from "./registerReducer";
import projectReducer from "./projectReducer";
import loginReducer from "./loginReducer";

export default combineReducers({
    project: projectReducer,
    register: registerReducer,
    login: loginReducer

});
