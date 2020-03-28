import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { NavigationBar } from "../../components/base/NavigationBar";
//import UsersList component
import { UsersList } from "../../components/base/UsersList";

//import redux stuff
import { connect } from "react-redux";
import { getUsers, request_user } from "../../actions/userRequestAction";
import PropTypes from "prop-types";

//import css stuff
import "../../css/Users.css";

//use JWT token to put this user in
const loggedInUser = "575e989c-49f0-4b60-8cf8-f033e4210c3c";

const Users = ({ getUsers, users, request_user }) => {
    //have a use effect function
    useEffect(() => {
        getUsers();
    });

    //make button press handler
    function requestButtonHandler(requester) {
        request_user(loggedInUser, requester);
    }

    return (
        <div>
            <Container>
                <h1>Explore Users in CollabCloud</h1>
                <h5>View fellow Collaborators on CollabCloud</h5>
                <UsersList users={users} buttonHandler={requestButtonHandler} />
            </Container>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        users: state.users.users
    };
}


function mapDispatchToProps(dispatch) {
    return {
        getUsers: () => {
            dispatch(getUsers());
        },
        request_user: (requestee, requester) => {
            dispatch(request_user(requestee, requester));
        }
    };
}

Users.propTypes = {
    getUsers: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);