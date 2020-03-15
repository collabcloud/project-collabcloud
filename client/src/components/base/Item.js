import React from 'react';
import { ListGroup } from 'react-bootstrap';

export function Item(props) {

  return (
    <ListGroup.Item variant="dark"> 
      {props.value}
    </ListGroup.Item>);
}