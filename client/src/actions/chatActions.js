import axios from "axios";
import {
  ADD_TO_CHAT,
  INITIALIZE_CHAT,
  GET_MESSAGES,
  UPDATE_CHAT
} from "./types";

export const updateChat = username => async dispatch => {
  dispatch({
    type: UPDATE_CHAT,
    payload: username
  });
};

export const changeRecipient = (from, to, setMessageList) => async dispatch => {
  const config = {
    params: {
      myuser: from,
      username: to
    }
  };
  const url = "/api/message/messages";
  var messageList;
  axios
    .get(url, config)
    .then(response => {
      messageList = response.data;
      dispatch({
        type: GET_MESSAGES,
        payload: { lst: messageList, name: to }
      });
      setMessageList({
        messages: messageList,
        recipient: to
      });
    })
    .catch(err => {});
};

export const addUser = (
  myuser,
  username,
  setErrMsg,
  setAddUser
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const url = "/api/message/add";
  const body = JSON.stringify({ myuser, username });

  axios
    .post(url, body, config)
    .then(function(response) {
      dispatch({
        type: ADD_TO_CHAT,
        payload: {
          name: username,
          seen: true,
          avatar: response.data.avatar
        }
      });
      setAddUser(false);
    })
    .catch(err => {
      if (err.response.status === 401) {
        setErrMsg(err.response.data.err);
      } else {
        setErrMsg("");
      }
      setAddUser(true);
    });
};

export const initializeList = myuser => async dispatch => {
  var chatList = localStorage.getItem("chatList");
  var last = { name: "Message a new user", seen: true };
  if (chatList == null) {
    // axios request
    chatList = [last];
  } else {
    chatList = JSON.parse(chatList);
  }
  dispatch({
    type: INITIALIZE_CHAT,
    payload: chatList
  });
  const config = {
    params: {
      username: myuser
    }
  };
  const url = "/api/message/chats";
  axios
    .get(url, config)
    .then(response => {
      chatList = response.data;
      dispatch({
        type: INITIALIZE_CHAT,
        payload: [...chatList, last]
      });
    })
    .catch(err => {});
};
