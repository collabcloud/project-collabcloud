import React, { useState } from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import { InputtableItem } from './InputtableItem';

import '../../css/ItemsList.css';

export function ItemsList(props) {

    return (
        <div>
          <ListGroup className="item-list">
            <Form>
            {props.items.map((item, index) =>
              <InputtableItem text={item.name} icon={item.icon} 
              index={index} updateLink={props.updateLink}/> )}
            </Form>
          </ListGroup>
        </div>
    );
}