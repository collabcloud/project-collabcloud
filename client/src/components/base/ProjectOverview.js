import React from 'react';
import { Jumbotron, Button, Container, Row, Col, Image, ListGroup } from 'react-bootstrap';
import { Item } from "./Item";
import ReactTags  from "react-tag-autocomplete";
import logo from "../../harmoney.png";

import "../../css/Project.css";

export function ProjectOverview(props) {

  const tags = [
    { id: 1, name: "MongoDB" },
    { id: 2, name: "Express" },
    { id: 3, name: "React" },
    { id: 4, name: "Node.js" }
  ];

  return (
    <Jumbotron>
      <Container>
        <Row>
        <Col xs={4}>
          <Image src={logo}/>
        </Col>
        <Col className="d-flex align-items-start flex-column">  
          <h1>harmoney</h1>
          <div className="innerbox">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
             sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.</p>
          </div>
          
          <ListGroup horizontal>
          {tags.map((tag, index) =>
              <Item value={tag.name} 
              key={tag.index}/> )}
          </ListGroup>
         
          <p className="top5">
            <Button variant="primary">Learn more</Button>
          </p>

      </Col>
      
        </Row>
      </Container>
    </Jumbotron>);
}