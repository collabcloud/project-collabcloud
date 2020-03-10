import React from 'react';
import { ListGroup } from 'react-bootstrap';

export function Item(props) {

  return (
    <ListGroup.Item> 
      {props.value}
    </ListGroup.Item>);
}