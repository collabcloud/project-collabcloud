import {
    ADD_TO_CHAT, INITIALIZE_CHAT, GET_MESSAGES, UPDATE_CHAT
} from "../actions/types";
const initialState = {
    chatList: JSON.parse(localStorage.getItem("chatList")),
    messageList: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CHAT:
            var newState = {
                ...state,
                chatList: [action.payload.username, ...state.chatList],
            }
            localStorage.setItem("chatList", JSON.stringify(newState.chatList));
            return newState;
        case INITIALIZE_CHAT:
            
            var newState = {
                ...state,
                chatList: action.payload,
            }
            localStorage.setItem("chatList", JSON.stringify(action.payload));
            return newState;
        case GET_MESSAGES:
            var map = state.chatList.map(e => e.name);
            var idx = map.indexOf(action.payload.name);
            var read= {
                ...state.chatList[idx],
                seen: true
            };
            return {
                ...state,
                messageList: action.payload.lst,
                chatList:[...state.chatList.slice(0, idx), read, ...state.chatList.slice(idx+1)]
            };
        case UPDATE_CHAT:
            var map = state.chatList.map(e => e.name);
            var idx = map.indexOf(action.payload.name);
            
            var newState = {
                ...state,
                chatList: [action.payload, ...state.chatList.slice(0,idx), ...state.chatList.slice(idx + 1)],
            }
            localStorage.setItem("chatList", JSON.stringify(newState.chatList));
            return newState;
        default:
            return state;
    }
};