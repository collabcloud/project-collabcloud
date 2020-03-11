import { combineReducers } from "redux";
import registerReducer from "./registerReducer";
import projectReducer from "./projectReducer";
import githubReducer from "./githubReducer";
import loginReducer from "./loginReducer";
import followReducer from "./followReducer";
import unfollowReducer from "./unfollowReducer";
import alertReducer from "./alertReducer";



export default combineReducers({
    project: projectReducer,
    register: registerReducer,
    github: githubReducer,
    login: loginReducer,
    follow: followReducer,
    unfollow: unfollowReducer,
    alerts: alertReducer
});
