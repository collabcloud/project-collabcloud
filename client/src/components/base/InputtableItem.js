import React, { useState } from 'react';
import { Form, ListGroup } from 'react-bootstrap';

export function InputtableItem(props) {

  return (
    <ListGroup.Item>
      {props.icon}
      {props.text}
        <Form.Control 
        name={"link" + props.index} type="text"
        onChange={e => props.updateLink(props.index, e.target.value)}/> 
    </ListGroup.Item>);
}