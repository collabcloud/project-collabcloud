import React from "react";
import { ListGroup } from "react-bootstrap";
import { RequestItem } from "./RequestItem";

import "../../css/ItemsList.css";

export function ItemList(props) {
  function renderItems() {
    if (props.items.length === 0) {
      return <p>No pending requests</p>;
    } else {
      const items_list = props.items.map((item, index) => (
        <RequestItem
          key={index}
          item={item}
          ownerId={props.ownerId}
          onClick={props.onClick}
        />
      ));
      return items_list;
    }
  }

  return (
    <div>
      <ListGroup>{renderItems()}</ListGroup>
    </div>
  );
}
