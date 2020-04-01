import React, { useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import Message from "../../base/Message";

export function RequestCollaborators(props) {
  const [collaborator, setCollaborator] = useState("");
  const [submitted, setSubmitted] = useState("");

  function renderError() {
    var variant;
    var msgText;
    if (props.requestStatus >= 400) {
      variant = "danger";
    }

    if (props.requestStatus === 200) {
      msgText = "Successfully requested " + submitted + " to join your project";
      variant = "success";
    } else if (props.requestStatus === 400) {
      msgText = "Error: User has already been requested to join";
    } else if (props.requestStatus === 404) {
      msgText = "Error: User could not be found";
    } else if (props.requestStatus === 409) {
      msgText = "Error: User has already been requested to join";
    }

    if (props.requestStatus !== 0) {
      return <Message variant={variant} message={msgText} />;
    }
  }

  function onChange(e) {
    e.preventDefault();
    setCollaborator(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log("submit");
    props.requestUser(collaborator);
    setSubmitted(collaborator);
  }

  return (
    <Row>
      {renderError()}
      <Form inline className="p-2" onSubmit={onSubmit}>
        <Form.Control
          type="text"
          placeholder="Request a collaborator"
          className="mr-sm-3"
          style={{ height: 30, marginTop: "10px", width: 325 }}
          value={collaborator}
          onChange={onChange}
        />
        <Button variant="info" type="submit" style={{ marginTop: "10px" }}>
          Submit
        </Button>
      </Form>
    </Row>
  );
}
