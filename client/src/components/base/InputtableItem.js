import React from 'react';
import { Form, ListGroup } from 'react-bootstrap';

export function InputtableItem(props) {

  return (
    <ListGroup.Item>
      {props.item.icon}
      {props.item.text}
        <Form.Control 
        value={props.item.value}
        name={"link" + props.index} type="text"
        onChange={e => props.updateLink(props.index, e.target.value)}/> 
    </ListGroup.Item>);
}