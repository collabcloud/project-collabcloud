import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { post_thread } from "../../../actions/forumActions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const ThreadForm = withRouter(({ post_thread, status, ...props }) => {
  const [sid, setSid] = useState("");
  const [uid, setUid] = useState("");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (props !== undefined || props !== null) {
      setSid(props.sid);
      setUid(props.uid);
    }
  }, []);

  function renderMessage() {
    if (status === "Success") {
      return <p>Successfully created a thread.</p>;
    }
  }

  function onSubmit(e) {
    e.preventDefault();

    post_thread(sid, uid, topic, content);
    props.rerender();

    // Save the project to database

    // Redirect to the new thread
    //history.push("/explore");
  }

  return (
    <div>
      <h3 className="text-left">Submit a new Thread</h3>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formBasicTopic">
          <Form.Label className="float-left">Topic</Form.Label>
          <Form.Control
            required
            name="topic"
            type="text"
            placeholder="Enter a topic"
            onChange={e => setTopic(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicContent">
          <Form.Label className="float-left">Content</Form.Label>
          <Form.Control
            required
            name="content"
            as="textarea"
            rows="5"
            placeholder="Enter the post's content"
            onChange={e => setContent(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="outline-success"
          type="submit"
          size="lg"
          className="mr-3"
        >
          Submit
        </Button>
        <Button
          variant="outline-danger"
          type="click"
          size="lg"
          onClick={() => props.onCancel(false)}
        >
          Cancel
        </Button>
      </Form>
      {renderMessage()}
    </div>
  );
});

function mapStateToProps(state) {
  return { status: state.forum.status };
}

function mapDispatchToProps(dispatch) {
  return {
    post_thread: (sid, submitter, title, description) => {
      dispatch(post_thread(sid, submitter, title, description));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreadForm);