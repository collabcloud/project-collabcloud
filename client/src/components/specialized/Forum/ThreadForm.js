import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ThreadForm = () => {
  return (
    <div>
      <h3 className="text-left">Submit a new Thread</h3>
      <Form>
        <Form.Group controlId="formBasicTopic">
          <Form.Label className="float-left">Topic</Form.Label>
          <Form.Control
            required
            name="topic"
            type="text"
            placeholder="Enter a topic"
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
        <Button variant="outline-danger" type="click" size="lg">
          Cancel
        </Button>
      </Form>
    </div>
  );
};
export default ThreadForm;
