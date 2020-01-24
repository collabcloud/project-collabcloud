import React from 'react';
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import "../../App.css";

export class NavigationBar extends React.Component {
    render() {
      return (
        <Navbar bg="dark" variant="dark" className="d-flex">
          <Navbar.Brand href="#home" className="p-2">
            <img
              alt=""
              src={require('../../logo.png')}
              width="60"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            CollabCloud
          </Navbar.Brand>
          <Form inline className="p-2">
            <FormControl type="text" placeholder="Search CollabCloud" className="mr-sm-3" style={{height: 25}}/>
            <Button>Search</Button>
          </Form>
          <Nav className="ml-auto p-2">
            <Nav.Link href="#home">Create a Project</Nav.Link>
            <Nav.Link href="#explore">Explore</Nav.Link>
            <Nav.Link href="#trending">Trending</Nav.Link>
            <img
              alt=""
              src={require('../../avatar.png')}
              width="20"
              height="20"
              style={{marginTop: 10}}
              className="d-inline-block align-top"
            />{' '}
          </Nav>
        </Navbar>
      );
    }
  }