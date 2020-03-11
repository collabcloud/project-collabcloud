import React, {useState} from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress
} from "shards-react";
import {connect} from "react-redux";


//this should be the state passed into it
const UserDetails = ({ userDetails, firstname, lastname}) => {

const name = "username";
  // const [name, setName] = useState(firstname);
  // const [last_name, setlastName] = useState(lastname);
  // const [email, setEmail] = useState("w/e@gmail.com");
  // const [cityfield, setCity] = useState(city);


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
<h4 className="mb-0">{name}</h4>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-4">
        <strong className="text-muted d-block mb-2">
          {userDetails.metaTitle}
        </strong>
        <span>{userDetails.metaValue}</span>
      </ListGroupItem>
      <ListGroupItem className="p-4">
      <strong className="text-muted d-block mb-2">
          {userDetails.metalinkTitle}
        </strong>
        <span>{userDetails.metalinkValue}</span>
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
    metaValue:
      "gamers rise up",
    metalinkTitle: "Links",
    metalinkValue: "github links here"
  }
};


const mapStateToProps = (state) => {
	return {
    uid: state.userinfo.profile.uid,
    firstname: state.userinfo.profile.firstname,
    lastname: state.userinfo.profile.lastname,
    city: state.userinfo.profile.city,
    province: state.userinfo.profile.province,
    description: state.userinfo.profile.description,
	};
};
export default UserDetails;
