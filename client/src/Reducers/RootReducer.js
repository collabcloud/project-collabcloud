import { combineReducers } from "redux";
import registerReducer from "./registerReducer";
import projectReducer from "./projectReducer";
import githubReducer from "./githubReducer";
import loginReducer from "./loginReducer";
import userRequestReducer from "./userRequestReducer";
import userReducer from "./userReducer";
import searchReducer from "./searchReducer";
import followReducer from "./followReducer";
import unfollowReducer from "./unfollowReducer";
import alertReducer from "./alertReducer";
import chatReducer from "./chatReducer";
import hackathonsReducer from "./hackathonsReducer";
import notificationReducer from "./notificationReducer";
import forumReducer from "./forumReducer";
import imgReducer from "./imgReducer";

export default combineReducers({
  project: projectReducer,
  register: registerReducer,
  github: githubReducer,
  login: loginReducer,
  user: userReducer,
  users: userRequestReducer,
  search: searchReducer,
  follow: followReducer,
  unfollow: unfollowReducer,
  alerts: alertReducer,
  chat: chatReducer,
  hackathons: hackathonsReducer,
  notifications: notificationReducer,
  forum: forumReducer,
  img: imgReducer
});
