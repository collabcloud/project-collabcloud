import React, { useState, useEffect } from "react";
import { Scrollbar } from "react-scrollbars-custom";
import { Card, Form, Button, Container, Row } from "react-bootstrap";

import "../../../css/Chat.css";

export const MessageList = (props) => {
  let scrollbar = React.createRef();
  const [message, setMessage] = useState("");

  useEffect(() => {
    scrollbar.current.scrollToBottom();
  }, [scrollbar]);

  useEffect(() => {
    scrollbar.current.scrollToBottom();
  }, [scrollbar, props.messages]);
  function onSubmit(event) {
    event.preventDefault();
    let message = event.target[0].value;
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;
    date = message = {
      type: "user",
      name: props.user,
      msg: message,
      time: dateTime,
    };
    props.sendMessage(message);
    setMessage("");
  }
  function onChange(event) {
    event.preventDefault();
    setMessage(event.target.value);
  }

  function createMessage(msg, index) {
    let time = "";

    if (msg.time) {
      let today = new Date(msg.time);
      let date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      let curtime =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      let dateTime = date + " " + curtime;
      time = "Sent at " + dateTime;
    }
    return (
      <div key={index} className={msg.type}>
        <Card className="msgCard">
          <Card.Body className="title"> {msg.name}</Card.Body>
          <Card.Body className="msgCardBody">{msg.msg}</Card.Body>
          <Card.Body className="date">
            {" "}
            <h6 className="small">{time} </h6>{" "}
          </Card.Body>
        </Card>
      </div>
    );
  }
  let page = (
    <Scrollbar
      ref={scrollbar}
      contentProps={{
        renderer: (props) => {
          const { elementRef, style, ...restProps } = props;
          return (
            <div
              {...restProps}
              style={{}}
              ref={elementRef}
              className="Content"
              id="msgContent"
            />
          );
        },
      }}
    >
      {props.messages.map((value, index) => {
        return createMessage(value, index);
      })}
    </Scrollbar>
  );
  return (
    <Container
      className="h-100"
      fluid
      style={{ paddingLeft: 0, paddingRight: 0 }}
    >
      <Row className="h-75 w-100 ml-0 mr-0" style={{ paddingTop: 0 }}>
        {page}
      </Row>
      <Row
        className="w-100 ml-0 mr-0"
        style={{
          height: 100,
          paddingTop: 0,
          position: "relative",
          borderTop: "solid 1px black",
        }}
      >
        <Form className="w-100" onSubmit={onSubmit}>
          <div
            className="h-100"
            style={{
              paddingTop: 0,
              top: 30,
              bottom: 30,
              position: "absolute",
              width: "90%",
              left: 0,
              right: 0,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Form.Group className="h-40">
              <Form.Control
                name="message"
                type="text"
                placeholder="Send message here"
                value={message}
                onChange={onChange}
                className="h-100"
              />
            </Form.Group>
            <div className="text-danger"> {props.errMsg}</div>
            <Button
              className="h-50"
              style={{ paddingTop: 0, paddingBottom: 0 }}
              variant="primary"
              type="submit"
              block
            >
              Send
            </Button>
          </div>
        </Form>
      </Row>
    </Container>
  );
};
