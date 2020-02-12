import React from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import { InputtableItem } from './InputtableItem';

import '../../css/ItemsList.css';

export function ItemsList(props) {

    return (
        <div>
          <ListGroup className="item-list">
            {props.items.map((item, index) =>
              <InputtableItem item={item} 
              key={index} index={index} updateLink={props.updateLink}/> )}
          </ListGroup>
        </div>
    );
}