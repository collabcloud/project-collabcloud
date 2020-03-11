import React, {useEffect} from "react";
import { Container, Row, Col, Nav,Navbar } from "react-bootstrap";
import PageTitle from "../../components/base/PageTitle";
import UserDetails from "../../components/base/UserDetails";
import UserAccountDetails from "../../components/base/UserAccountDetails";
import { NavigationBar } from "../../components/base/NavigationBar";
import { connect } from "react-redux";

import {get_user_info} from "../../actions/userActions";


import PropTypes from "prop-types";

const Profile = ({uid, get_user_info}) => {


  //onload, call the action to retrieve all the data get_user_info
  useEffect(() => {
    const myfunc = async () => {
      await get_user_info(uid);
    }

    // Populate the Redux store with this user's info by calling the action and have the action do a get request
    console.log("send to get_user_info: " + uid);
    myfunc();
  }, []); 
    
  
  return (<div>
    <NavigationBar />
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="User Profile" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>
    <Row>
      <Col lg="1.25">
        <Navbar bg="light" variant="light" style={{fontSize: '20px'}}>
            <Nav className="flex-column" >
            <Nav.Link href="/user/profile">Profile</Nav.Link>
            <Nav.Link href="/explore">Projects</Nav.Link>
            {/* <Nav.Link eventKey="link-2">Other</Nav.Link> */}
        </Nav>
        </Navbar>
      </Col>
      <Col lg="4">
        <UserDetails />
      </Col>
      <Col lg="6">
        <UserAccountDetails />
      </Col>
    </Row>
  </Container>
    </div>
)};

Profile.propTypes = {
	get_user_info: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  console.log(state);
  console.log(state.user.uid);
	return {
		uid: state.user.uid
	};
};

export default connect(mapStateToProps, {get_user_info})(Profile);