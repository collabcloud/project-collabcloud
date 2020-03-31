import React, { useState, useEffect } from "react";
import { Image, Button, ButtonGroup, Form } from "react-bootstrap";
import { Scrollbar } from "react-scrollbars-custom";
import { IoMdAddCircleOutline } from "react-icons/io";

import "../../../css/Chat.css";

const default_avatar =
  "https://avatars2.githubusercontent.com/u/45340119?s=400&v=4";

export const ChatList = props => {
  const [username, setFormData] = useState("");
  useEffect(() => {
    setFormData("");
  }, [props.chatList]);

  const onChange = e => {
    setFormData(e.target.value);
  };
  function onClick(event) {
    event.preventDefault();
    props.changeWindow(event.target.id.slice(1));
  }
  function onSubmit(event) {
    event.preventDefault();
    props.addUser(username);
  }
  function onCancel(event) {
    event.preventDefault();
    setFormData("");
    props.resetAddUserState();
  }
  var chatList = props.chatList;
  if (!chatList) {
    chatList = [];
  }
  var renderType = (
    <ButtonGroup
      className="msggroup d-flex"
      justified="true"
      name="chat"
      vertical
    >
      {chatList.map((value, index) => {
        var val = "";
        if (!value.seen) {
          val = "1";
        }
        var icon = (
          <Image
            className="msgImage float-left img-responsive"
            src={value.avatar === undefined ? default_avatar : value.avatar}
            style={{ width: 60, height: 60 }}
            fluid
            roundedCircle
          />
        );
        if (value.name === "Message a new user") {
          icon = <IoMdAddCircleOutline size={32} />;
        }
        return (
          <Button
            key={index}
            className="msgs"
            size="lg"
            variant="light"
            type="button"
            id={"b" + index}
            onClick={onClick}
          >
            <div className="msgImage">
              {icon}
              <div className="msgImage label label-default">
                {value.name}
                <span className="badge notify">{val}</span>
              </div>
            </div>
          </Button>
        );
      })}
    </ButtonGroup>
  );
  if (props.addUserState) {
    renderType = (
      <Form className="login-form" onSubmit={onSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label className="float-left">
            Who do you want to message?
          </Form.Label>
          <Form.Control
            required
            name="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={onChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your username
          </Form.Control.Feedback>
        </Form.Group>
        <div className="text-danger"> {props.errMsg}</div>
        <Button variant="outline-primary" type="submit" block>
          Submit
        </Button>
        <Button
          variant="outline-primary"
          onClick={onCancel}
          type="button"
          block
        >
          Cancel
        </Button>
      </Form>
    );
  }
  return (
    <Scrollbar
      className="scroller"
      permanentTrackY={true}
      renderer={props => {
        const { elementRef, ...restProps } = props;
        return <div {...restProps} ref={elementRef} className="Scrollbar" />;
      }}
      wrapperProps={{
        renderer: props => {
          const { elementRef, style, ...restProps } = props;
          style.marginRight = 10;
          return (
            <div
              {...restProps}
              style={style}
              ref={elementRef}
              className="ScrollbarWrapper"
            />
          );
        }
      }}
      trackYProps={{
        renderer: props => {
          const { elementRef, style, ...restProps } = props;
          return (
            <div {...restProps} ref={elementRef} className="Scrollbar trackY" />
          );
        }
      }}
      thumbYProps={{
        renderer: props => {
          const { elementRef, style, ...restProps } = props;
          return (
            <div {...restProps} ref={elementRef} className="Scrollbar thumbY" />
          );
        }
      }}
    >
      {renderType}
    </Scrollbar>
  );
};
