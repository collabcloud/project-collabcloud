import {
    LOGIN
} from "../actions/types";

const initialState = {
    uid: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state, 
                uid: action.payload};
        default:
            console.log(state);
            return state;
    }
};