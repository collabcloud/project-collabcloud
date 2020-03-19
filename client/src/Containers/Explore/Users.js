import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { NavigationBar } from "../../components/base/NavigationBar";
//import UsersList component
import { UsersList } from "../../components/base/UsersList";

//import redux stuff
import { connect } from "react-redux";
import { getUsers, getUids, request_user } from "../../actions/userAction";
import PropTypes from "prop-types";

//import css stuff
import "../../css/Users.css";
import requestReducer from "../../Reducers/requestReducer";

//use JWT token to put this user in
const loggedInUser = "575e989c-49f0-4b60-8cf8-f033e4210c3c";

const Users = ({ getUsers, users, uids, request_user }) => {
    //have a use effect function
    useEffect(() => {
        getUsers();
        getUids();
    });

    //maps all uid to reuest method for each user
    function mapRequest() {
        let followRequests = [];
        for (var i = 0; i < uids.length; i++) {
            followRequests.push(request_user(loggedInUser, uids[i]));
        }
        return followRequests;
    }

    return (
        <div>
            <NavigationBar />
            <Container>
                <h1>Explore Users in CollabCloud</h1>
                <h5>View fellow Collaborators on CollabCloud</h5>
                <UsersList users={users} requests={mapRequest} />
            </Container>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        users: state.user.users,
        uids: state.user.uids
    };
}


function mapDispatchToProps(dispatch) {
    return {
        getUsers: () => {
            dispatch(getUsers());
        },
        getUids: () => {
            dispatch(getUids());
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