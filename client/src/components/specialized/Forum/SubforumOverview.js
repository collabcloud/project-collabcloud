import React from "react";
import { Card } from 'react-bootstrap';


const SubforumOverview = (props) => (
  <Card fluid hoverable="true" bg="dark" text="white">
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
        {props.description}
        </Card.Text>
      </Card.Body>
    </Card>
);

export default SubforumOverview;
