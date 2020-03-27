import React, {UseEffect} from "react";
import { Card, Button, Container, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { GoOrganization } from 'react-icons/go';
import { MdLocationOn, MdChatBubble } from 'react-icons/md';
import { Item } from '../base/Item';
import {connect} from 'react-redux';
import pic from '../../Containers/User/img/matthuynh.png';


const UserDetails = (props) => {

const tags = [
  { id: 1, name: "MongoDB" },
  { id: 2, name: "Express" },
  { id: 3, name: "React" },
  { id: 4, name: "Node.js" }
];



  function renderName() {
    if(props.firstname == null || props.lastname == null) {
      return "";
    }
    else{
      return props.firstname + " " + props.lastname;
    }
  }
  

  function renderLocation() {
    if(props.province == null || props.city == null) {
      return "Not stated";
    }
    return props.city + ", " + props.province;
  }
  

function renderDescription() {
  if(props.description == null || props.description == "") {
    return "No Bio added";
  }
  else {
    return props.description;
  }
}



  return (
  <Card style={{height: '30rem'}} hoverable="true" bg="dark" text="white">
      <Card.Body>
        <Container >
          <Row>
            <Col xs={'auto'}>
              <Image src={pic}></Image>
                <p><MdLocationOn/>{renderLocation()}</p>
            </Col>
            <Col xs={'auto'} className="d-flex align-items-start flex-column">
              <h3>{props.username}</h3>
              <h6>{renderName()}</h6>
              <ListGroup horizontal>
            {tags.map((tag, index) =>
                <Item value={tag.name} 
                key={tag.index}/> )}
            </ListGroup>
            </Col>
            <Col xs={'auto'}>
             <p><GoOrganization/> {props.followers} Followers</p>
            </Col>
            <Col xs={'auto'}>
              <Button variant={props.btnColour} onClick={props.onClickprofile}>Update Profile</Button>
            </Col>
          </Row>
          <Row>
            <Col xs={'auto'}>
              <Button variant={props.btnColour} onClick={props.onClick}>{props.btnText}</Button> 
            </Col>
            <Col xs={5}>
                <p align="left"><MdChatBubble /> {renderDescription()}</p>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
);
            };
function mapStateToProps(state) {
  return {
    username: state.login.profile.username,
    firstname: state.login.profile.firstname,
    lastname: state.login.profile.lastname,
    description: state.login.profile.description,
    city: state.login.profile.city,
    province: state.login.profile.province
  };
}

export default connect(mapStateToProps, {})(UserDetails);
