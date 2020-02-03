import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { InputtableItem } from '../base/InputtableItem';

export function ItemsList() {

  const [items] = useState(["Hi there", "My name is Jarrod", ""]);

  function setItem(index, value) {
    items[index] = value;
  }

    return (
        <div>
          <ListGroup>
          {items.map(function(item, index) {
            return (<InputtableItem value={item} index={index} setItem={setItem}/>)})}
          </ListGroup>
        </div>
    );
}