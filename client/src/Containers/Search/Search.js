import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import NavigationBar from "../../components/specialized/Nav/NavigationBar";
import { ProjectResultList } from "../../components/base/ProjectResultList";
import { UserResultList } from "../../components/base/UserResultList";

// Redux Imports
import { connect } from "react-redux";
import { search } from "../../actions/searchActions";

import "../../css/Search.css";

const Search = props => {
  //const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (props.location.query != "") {
      props.search(props.location.state.query);
    }
  }, [props.location]);
  return (
    <div>
      <NavigationBar />
      <Container>
        <h2>Relevant Projects to your Search</h2>
        <ProjectResultList projects={props.searchedProjects} />
      </Container>
      <Container>
        <h2>Relevant Users to your Search</h2>
        <UserResultList users={props.searchedUsers} />
      </Container>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    searchedProjects: state.search.searchedProjects,
    searchedUsers: state.search.searchedUsers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    search: searchTerm => {
      dispatch(search(searchTerm));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
