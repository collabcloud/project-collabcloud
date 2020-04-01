import React from "react";
import { ListGroup, Button } from "react-bootstrap";

export function RequestItem(props) {
  return (
    <ListGroup.Item variant="dark">
      {props.value}
      <Button
        variant="success"
        style={{ marginLeft: "40px" }}
        onClick={props.onClick(props.item.requester_uid)}
      >
        Accept
      </Button>
    </ListGroup.Item>
  );
}
