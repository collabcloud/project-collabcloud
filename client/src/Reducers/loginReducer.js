import {
    LOGIN
} from "../actions/types";

const initialState = {
    loggedIn: false,
    token: localStorage.getItem("token")
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            console.log(action.payload);
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                ...action.payload.token,
                loggedIn: true
            };
        default:
            return state;
    }
};