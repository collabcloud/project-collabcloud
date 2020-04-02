import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavigationBar from "../../components/specialized/Nav/NavigationBar";

// Redux Imports
import { connect } from "react-redux";
import { get_user_by_name } from "../../actions/userActions";
import { ChatList } from "../../components/specialized/Chat/ChatList";
import { MessageList } from "../../components/specialized/Chat/MessageList";
import "../../css/Chat.css";

import {
  addUser,
  initializeList,
  changeRecipient,
  updateChat
} from "../../actions/chatActions";
var messageSample = [
  {
    type: "user",
    name: "Sample1",
    msg: "This is a sample messagesssssssssssssssssssssssssssssssssssssssssss"
  },
  {
    type: "other",
    name: "Sample2",
    msg: "Any messages sent here are for sampling ONLY"
  }
];
let io;
const Chat = props => {
  let [messageList, setMessageList] = useState({
    messages: messageSample,
    recipient: ""
  });
  const [addUserState, setAddUser] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  function performWindowAction(windowNum) {
    //DO NOT SET TO ===
    if (windowNum == props.chatList.length - 1) {
      setAddUser(true);
    } else {
      props.changeRecipient(
        props.profile.username,
        props.chatList[windowNum].name,
        setMessageList
      );
    }
  }

  function performSendAction(message) {
    var from = props.profile.username;
    var to = messageList.recipient;
    var msg = {
      from: from,
      to: to,
      message: message.msg,
      time: message.time
    };
    io.emit("messagesend", JSON.stringify(msg));
    if (message.msg === "") return;
    setMessageList({
      messages: [...messageList.messages, message],
      recipient: to
    });
  }

  function resetAddUserState() {
    setAddUser(false);
    setErrMsg("");
  }

  function addUser(user) {
    props.addUser(props.profile.username, user, setErrMsg, setAddUser);
  }

  useEffect(function() {
    props.initializeList(props.profile.username);
    if (io) {
      io.disconnect();
    }
    io = props.io.connect("http://localhost:5000");
    io.on("message", function(data) {
      io.emit("reply", props.profile.username);
    });
  }, []);

  useEffect(
    function() {
      setErrMsg("");
      if (props.profile.username === undefined) return;
    },
    [props.chatList, props.messageList]
  );

  if (io) {
    io.on("messagesend", function(data) {
      var data = JSON.parse(data);
      if (messageList.recipient !== data.name) {
        props.updateChat({ name: data.name, seen: false });
        return;
      }
      props.updateChat({ name: data.name, seen: true });
      var pair = {
        from: props.profile.username,
        to: messageList.recipient
      };
      io.emit("messagereply", JSON.stringify(pair));
      setMessageList({
        ...messageList,
        messages: [...messageList.messages, data]
      });
    });
  }

  return (
    <div className="msgApp">
      <div className="navbardiv">
        <NavigationBar />
      </div>
      <Container
        className="msgcontainer"
        fluid
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        <Row className=" chatrow fill-height ml-0 mr-0">
          <Col
            className="msg fill-height"
            xs={3}
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <ChatList
              changeWindow={performWindowAction}
              chatList={props.chatList}
              addUserState={addUserState}
              resetAddUserState={resetAddUserState}
              addUser={addUser}
              errMsg={errMsg}
            />
          </Col>
          <Col
            className="msg fill-height"
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <MessageList
              user={props.profile.username}
              messages={messageList.messages}
              sendMessage={performSendAction}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    chatList: state.chat.chatList,
    messageList: state.chat.messageList,
    uid: state.user.uid,
    profile: state.login.profile,
    req_user: state.user.other_profile
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initializeList: myuser => {
      dispatch(initializeList(myuser));
    },
    addUser: (myuser, username, setErrMsg, setAddUser) => {
      dispatch(addUser(myuser, username, setErrMsg, setAddUser));
    },
    changeRecipient: (from, to, setMessageList) => {
      dispatch(changeRecipient(from, to, setMessageList));
    },
    updateChat: username => {
      dispatch(updateChat(username));
    },
    get_user_by_name: username => {
      dispatch(get_user_by_name(username));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
