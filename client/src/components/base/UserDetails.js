import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, ListGroup, ListGroupItem } from "shards-react";
import { connect } from "react-redux";

//this should be the state passed into it

const UserDetails = ({ userDetails, username, firstname, lastname, city, province,description}) => {


  // const [name, setName] = useState(firstname);
  // const [last_name, setlastName] = useState(lastname);
  // const [email, setEmail] = useState("w/e@gmail.com");
  // const [cityfield, setCity] = useState(city);
function renderName() {
  if(firstname == null || lastname == null) {
    return username;
  }
  else{
    return firstname + " " + lastname;
  }
}


function renderLocation() {
  if(province == null && city == null) {
    return "Not stated";
  }
  else if(province == null){
    return city;
  }
  else if(city == null) {
    return province;
  }
  return city + ", " + province;
}

function renderDescription() {
  if(description == null) {
    return "No Bio added";
  }
  else {
    return description;
  }
}

return (
  <Card small className="mb-4 pt-3">
    <CardHeader className="border-bottom text-center">
      <div className="mb-3 mx-auto">
        <img
          className="rounded-circle"
          src={userDetails.avatar}
          alt="hello"
          width="110"
        />
      </div>
<h4 className="mb-0">{renderName()}</h4>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-4">
        <strong className="text-muted d-block mb-2">
          Location
        </strong>
        <span>{renderLocation()}</span>
      </ListGroupItem>
      <ListGroupItem className="p-4">
      <strong className="text-muted d-block mb-2">
          {userDetails.metaTitle}
        </strong>
        <span>{renderDescription()}</span>
      </ListGroupItem>
    </ListGroup>
  </Card>
);}

UserDetails.propTypes = {
  /**
   * The user details object.
   */
  userDetails: PropTypes.object
};

UserDetails.defaultProps = {
  userDetails: {
    name: "Jarrod Servilla",
    avatar: require("../../avatar.png"),
    jobTitle: "Project Manager",
    metaTitle: "Description",
    metaValue: "gamers rise up",
    metalinkTitle: "Links",
    metalinkValue: "github links here"
  }
};

const mapStateToProps = state => {
  return {
    uid: state.userinfo.profile.uid,
    username: state.userinfo.profile.username,
    firstname: state.userinfo.profile.firstname,
    lastname: state.userinfo.profile.lastname,
    city: state.userinfo.profile.city,
    province: state.userinfo.profile.province,
    description: state.userinfo.profile.description
  };
};
export default connect(mapStateToProps, {})(UserDetails);
