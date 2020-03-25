import {
    LOGIN
} from "../actions/types";

const initialState = {
    uid: localStorage.getItem("uid")
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem("uid", action.payload.uid);
            return {
                ...state,
                ...action.payload.uid
            };
        default:
            return state;
    }
};