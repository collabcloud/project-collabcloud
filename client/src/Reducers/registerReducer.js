import {
    GET_TOKEN
} from "../actions/types";

// Add Single Project
const initialState = {
    authed: false,

};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_TOKEN:
            return {
                ...state,
                authed: true
            };
        default:
            return state;
    }
};