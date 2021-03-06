import React, { useState } from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Avatar from "../../base/Avatar";
import "../../../css/NavigationBar.css";

const NavigationBar = withRouter(({ history, loggedInUid, user, avatar }) => {
  const [search, setSearch] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    if (search === "") return;
    history.push({
      pathname: "/search",
      state: { query: search }
    });
  }

  function onChange(e) {
    setSearch(e.target.value);
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark" className="d-flex">
        <Navbar.Brand href="/dashboard" className="p-2">
          <img
            alt=""
            src={require("../../../logo.png")}
            width="60"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          CollabCloud
        </Navbar.Brand>
        <Form inline className="p-2" onSubmit={onSubmit}>
          <FormControl
            type="text"
            placeholder="Search CollabCloud"
            className="mr-sm-3"
            style={{ height: 30, marginTop: "10px" }}
            value={search}
            onChange={onChange}
          />
          <Button
            type="submit"
            className="search-bt"
            style={{ marginTop: "10px" }}
          >
            Search
          </Button>
        </Form>
        <Nav className="ml-auto p-2">
          <Link to="/projects/create" className="p-2 link">
            {" "}
            Create a Project{" "}
          </Link>
          <Link to="/trending" className="p-2 link">
            {" "}
            Trending{" "}
          </Link>
          <Link to="/explore" className="p-2 link">
            {" "}
            Explore{" "}
          </Link>
          <Link to="/message" className="p-2 link">
            {" "}
            Chat{" "}
          </Link>
          <Link to="/forum" className="p-2 link">
            {" "}
            Forum{" "}
          </Link>
          <Link to="/logout" className="p-2 link">
            {" "}
            Logout{" "}
          </Link>
          <a href={"/user/" + loggedInUid}>
            <Avatar src={avatar} width={20} height={20} />{" "}
          </a>
        </Nav>
      </Navbar>
    </div>
  );
});

function mapStateToProps(state) {
  return {
    loggedInUid: state.user.uid,
    avatar: state.login.profile.avatar
  };
}

export default connect(mapStateToProps, {})(NavigationBar);
