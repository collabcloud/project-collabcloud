import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const SubforumOverview = props => (
  <div className="p-2">
    <Card hoverable="true">
      <Card.Body>
        <Card.Title className="text-left">
          {" "}
          <props.icon /> <Link to={props.path}>{props.title}</Link>
        </Card.Title>
        <Card.Text className="text-left">{props.description}</Card.Text>
      </Card.Body>
    </Card>
  </div>
);

export default SubforumOverview;
