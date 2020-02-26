import React from 'react';
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../../css/NavigationBar.css";

export function NavigationBar() {
  return (
    <div>
    <Navbar bg="dark" variant="dark" className="d-flex">
      <Navbar.Brand href="/" className="p-2">
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
        <FormControl type="text" placeholder="Search CollabCloud" className="mr-sm-3" style={{height: 30, marginTop: "10px"}}/>
        <Button className="search-bt" style={{marginTop: "10px"}}>Search</Button>
      </Form>
      <Nav className="ml-auto p-2">
        <Link to="/projects/create" className="p-2 link">Create a Project</Link>
        <Link to="/explore" className="p-2 link">Explore</Link>
        <Link to="/" className="p-2 link">Trending</Link>
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
    </div>
  );
}