import { combineReducers } from "redux";
import projectReducer  from "./projectReducer"
import registerReducer from "./registerReducer"

export default combineReducers({
    projectReducer,
    registerReducer
});
