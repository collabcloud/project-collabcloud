import {
    LOGIN
} from "../actions/types";

const initialState = {
    uid: localStorage.getItem("uid")
};

export default (state = initialState, action) => {
    console.log(state.uid);
    switch (action.type) {
        case LOGIN:
            localStorage.setItem("uid", action.payload.uid);
            return {
                ...state,
                uid: action.payload.uid
            };
        default:
            // console.log(state);
            return state;
    }
   
};