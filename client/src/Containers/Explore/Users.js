import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { NavigationBar } from "../../components/base/NavigationBar";
//import UsersList component
import { UsersList } from "../../components/base/UsersList";

//import redux stuff
import { connect } from "react-redux";
import { getUsers } from "../../actions/userAction";
import PropTypes from "prop-types";

//import css stuff
import "../../css/Users.css";

const Users = ({ getUsers, users }) => {
    //have a use effect function
    useEffect(() => {
        getUsers();
    });

    return (
        <div>
            <NavigationBar />
            <Container>
                <h1>Explore Users in CollabCloud</h1>
                <h5>View fellow Collaborators on CollabCloud</h5>
                <UsersList users={users} />
            </Container>
        </div>
    );
}

function mapStateToProps(state) {
    return { users: state.user.users };
}


function mapDispatchToProps(dispatch) {
    return {
        getUsers: () => {
            dispatch(getUsers());
        }
    };
}

Users.propTypes = {
    getUsers: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);