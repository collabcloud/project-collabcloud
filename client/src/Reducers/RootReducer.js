import { combineReducers } from "redux";
import registerReducer from "./registerReducer";
import projectReducer from "./projectReducer";
import githubReducer from "./githubReducer";
import loginReducer from "./loginReducer";
import userReducer from "./userReducer";
import searchReducer from "./searchReducer";
import followReducer from "./followReducer";
import unfollowReducer from "./unfollowReducer";
import alertReducer from "./alertReducer";
import hackathonsReducer from "./hackathonsReducer";
import notificationReducer from "./notificationReducer";
import forumReducer from "./forumReducer";

export default combineReducers({
    project: projectReducer,
    register: registerReducer,
    github: githubReducer,
    login: loginReducer,
    user: userReducer,
    search: searchReducer,
    follow: followReducer,
    unfollow: unfollowReducer,
    alerts: alertReducer,
    hackathons: hackathonsReducer
    notifications: notificationReducer,
    forum: forumReducer
});
