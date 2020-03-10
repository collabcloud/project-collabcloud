import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Container, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { GoBook, GoPerson } from 'react-icons/go';
import { FaHeart } from 'react-icons/fa';
import { Item } from './Item';
import "../../css/ProjectBox.css";

export default function ProjectBox(props) {

  const name = props.name;
  const desc = props.desc;
  const tech = props.tech;
  const followers = props.followers;
  const likes = props.likes;

  return (
  <Card fluid hoverable="true" bg="dark" text="white" className="margin-bottom">
    <Card.Body>
      <Container>
        <Row>
          <Col className="d-flex align-items-start flex-column">
            <h3><GoBook/> {name}</h3>
            <h6>{desc}</h6>
          </Col>
          <Col className="d-flex align-items-end flex-column">
            <Button variant="primary" className="margin-bottom"><GoPerson/> Follow {followers}</Button>
            <Button variant="danger"><FaHeart/> Like {likes}</Button> 
 
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-start flex-column">
            
          <ListGroup horizontal>
            {tech.map((tag, index) =>
                <Item value={tag.name} 
                key={tag.index}/> )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </Card.Body>
  </Card>);
}