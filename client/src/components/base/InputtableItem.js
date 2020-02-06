import React, { useState } from 'react';
import { Form, ListGroup } from 'react-bootstrap';

export function InputtableItem(props) {

  const [link, setLink] = useState("");

  return (
    <ListGroup.Item>
      {props.icon}
      {props.text}
        <Form.Control 
        name={"link" + props.index} type="text"
        //e => props.onPressEnter(props.index, e.target.value)
        onPressEnter={console.log('hi')}
        onChange={e => setLink(e.target.value)}/> 
    </ListGroup.Item>);
}