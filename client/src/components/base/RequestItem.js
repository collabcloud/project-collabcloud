import React from "react";
import { ListGroup, Button } from "react-bootstrap";

export function RequestItem(props) {
  const requestedByOwner = props.item.requester_uid === props.ownerId;

  return (
    <ListGroup.Item variant="dark">
      {requestedByOwner ? props.item.requesteeName : props.item.requesterName}
      <Button
        variant={requestedByOwner ? "secondary" : "success"}
        style={{ marginLeft: "40px" }}
        disabled={requestedByOwner}
        onClick={() => {
          props.onClick(props.item.requester_uid);
        }}
      >
        {requestedByOwner ? "Pending" : "Accept"}
      </Button>
    </ListGroup.Item>
  );
}
