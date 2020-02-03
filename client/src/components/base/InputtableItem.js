import React, { useState } from 'react';
import { Form, ListGroup } from 'react-bootstrap';

export function InputtableItem(props) {

  var [value] = useState(props.value);

  function setValue(val) {
    value = val;
  }

  return (
    <ListGroup.Item>
      <Form onSubmit={props.setItem(value)}>
        <Form.Control value={value} type="text" name="link" onChange={setValue(value)}/>
      </Form>        
    </ListGroup.Item>);
}