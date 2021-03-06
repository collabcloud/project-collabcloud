import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";

import "../../../../css/ProjectView.css";

export function ProjectCard(props) {
  const index = props.index;
  const name = props.name;
  const description = props.description;

  return (
    <Button
      variant="light"
      className="btn-nostyle"
      onClick={() => {
        props.updateFields(index);
      }}
    >
      <Card
        hoverable="true"
        bg="dark"
        text="white"
        style={{ width: "18rem" }}
        className="project-card"
      >
        <Card.Header>
          <FaGithub />
        </Card.Header>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </Button>
  );
}
