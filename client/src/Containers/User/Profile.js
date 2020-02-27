import React from "react";
import { Container, Row, Col, Nav,Navbar } from "react-bootstrap";

import PageTitle from "../../components/base/PageTitle";
import UserDetails from "../../components/base/UserDetails";
import UserAccountDetails from "../../components/base/UserAccountDetails";
import { NavigationBar } from "../../components/base/NavigationBar";

const Profile = () => (
    <div>
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
);

export default Profile;
