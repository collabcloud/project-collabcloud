//General Actions
export const RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND"; //404
export const GET_SUCCESSFUL = "GET_SUCCESSFUL"; //200 OK on GET
export const POST_SUCCESSFUL = "POST_SUCCESSFUL"; //200 OK on POST
export const PUT_SUCCESSFUL = "PUT_SUCCESSFUL"; //200 OK on PUT
export const INVALID = "INVALID"; //409
export const ATTEMPT = "ATTEMPT"; //500 Internal Server Error

// Project Actions
export const ADD_PROJECT = "ADD_PROJECT";
export const GET_PROJECT = "GET_PROJECT";
export const GET_PUBLIC_PROJECTS = "GET_PUBLIC_PROJECTS";
export const UPDATE_PROJECT = "UPDATE_PROJECT";
export const DELETE_PROJECT = "DELETE_PROJECT";
export const JOIN_PROJECT = "JOIN_PROJECT";
export const LEAVE_PROJECT = "LEAVE_PROJECT";
export const RESET_PROJECT_ACTION_STATUS = "RESET_PROJECT_ACTION_STATUS";
export const RECOMMEND = "RECOMMEND";

// Register Actions
export const GET_TOKEN = "GET_TOKEN";
export const GITHUB_EXISTS = "GITHUB_EXISTS";
export const GITHUB_USERNAME_NOMATCH = "GITHUB_USERNAME_NOMATCH";

// GitHub Repository Actions
export const GET_GIT_REPOS = "GET_REPOS";

// Login Actions
export const LOGIN = "LOGIN";

// User Action
export const GET_USERS = "GET_USERS";

//Request Action
export const USER_REQUESTED = "USER_REQUESTED";
export const USER_ALREADY_REQUESTED = "USER_ALREADY_REQUESTED";

//Search actions
export const SEARCH = "SEARCH";

//Follow Actions
export const USER = "USER";
export const USER_NOT_FOUND = "USER_NOT_FOUND";
export const ALREADY_FOLLOWED = "ALREADY_FOLLOWED";

//Unfollow Actions
export const ALREADY_UNFOLLOWED = "ALREADY_UNFOLLOWED";

//Image Actions
export const UPLOAD_SUCCESSFUL = "UPLOAD_SUCCESSFUL";

//Alert Actions
export const SET_ALERT = "SET_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";

//profile actions
export const GET_INFO = "GET_INFO";

//chat actions
export const ADD_TO_CHAT = "ADD_TO_CHAT";
export const INITIALIZE_CHAT = "INITIALIZE_CHAT";
export const GET_MESSAGES = "GET_MESSAGES";
export const UPDATE_CHAT = "UPDATE_CHAT";

//Hackathon actions
export const GET_HACKATHONS = "GET_HACKATHONS";
export const ADD_HACKATHONS = "ADD_HACKATHONS";

// Auth Actions
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGOUT = "LOGOUT";

//Forum Actions
export const GET_SUBFORUMS = "GET_SUBFORUMS";
export const GET_SUBFORUM = "GET_SUBFORUM";
export const GET_THREAD = "GET_THREAD";
export const GET_THREADS = "GET_THREADS";
export const GET_POSTS = "GET_POSTS";

// Notification Actions
export const GET_NOTIFICATIONS = "GET_NOTIFICATIONS";
export const GET_PROJECT_NOTIFICATIONS = "GET_PROJECT_NOTIFICATIONS";

//Request actions
export const GET_REQUESTS = "GET_REQUESTS";
