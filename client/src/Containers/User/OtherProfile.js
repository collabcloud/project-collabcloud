import React from "react";
import { Container } from "react-bootstrap";
import { NavigationBar } from "../../components/base/NavigationBar";
import UserOverview from "../../components/base/UserOverview";
import ProjectDisplay from "../../components/base/ProjectDisplay";
import { follow_user } from '../../actions/followActions';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

const jarrod_uid = "d7ea7a25-11d0-450a-8690-81b7bd58676a";
const matt_uid = "d7ea7a25-11d0-450a-8690-81b7bd58676b";



const OtherProfile = withRouter(({follow_user, followed}) => {

  function followUser() {
     console.log("jarrod followed matt xd");
     follow_user(matt_uid, jarrod_uid);
  }


  return (
    <div>
    <NavigationBar />
    <Container
				fluid
				className="col-md-8 align-items-start"
				style={{ paddingTop: "50px" }}
			>
      <UserOverview onClick={followUser}/>
      <h1>Projects</h1>

      <ProjectDisplay/>

    </Container>
    </div>
  );
});

function mapStateToProps(state){
  return {followed: state.follow.followed};
}

function mapDispatchToProps(dispatch){
  return {
      follow_user: (followee, follower) => {
          dispatch(follow_user(followee, follower));
      }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfile);
