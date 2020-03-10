import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Container, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { GoStar, GoOrganization } from 'react-icons/go';
import { MdLocationOn, MdChatBubble } from 'react-icons/md';
import { Item } from '../base/Item';
import pic from '../../Containers/User/img/matthuynh.png';

const tags = [
  { id: 1, name: "MongoDB" },
  { id: 2, name: "Express" },
  { id: 3, name: "React" },
  { id: 4, name: "Node.js" }
];

const UserDetails = (props) => (
  <Card fluid hoverable="true" bg="dark" text="white">
      <Card.Body>
        <Container>
          <Row>
            <Col xs={4}>
              <Image src={pic}></Image>
              <p><MdLocationOn/> Toronto, Canada</p>
              
            </Col>
            <Col xs={4} className="d-flex align-items-start flex-column">
              <h3>Matthew Huynh</h3>
              <h6>@matthuynh</h6>
              <p><MdChatBubble/> I love coding!</p>
             
            </Col>
            <Col xs={4}>
             <p><GoOrganization/> 769 Followers</p>
             <p></p>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <Button variant="primary" onClick={props.onClick}>Follow</Button> 
            </Col>
            <Col>
            <ListGroup horizontal>
            {tags.map((tag, index) =>
                <Item value={tag.name} 
                key={tag.index}/> )}
            </ListGroup>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
);

export default UserDetails;
