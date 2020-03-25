import React, { useState, useEffect } from "react";
import { Container, Toast, Row, Col} from "react-bootstrap";
import {NavigationBar } from "../../components/base/NavigationBar";
import UserOverview from "../../components/base/UserOverview";
import ProjectDisplay from "../../components/base/ProjectDisplay";
import { follow_user } from '../../actions/followActions';
import { unfollow_user } from '../../actions/unfollowActions';
import UserAccountDetails from '../../components/base/UserAccountDetails';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';


// TODO: Pull from Redux
const jarrod_uid = "00744dfb-f53c-4298-ada4-b3867e2f1fe6";
const matt_uid = "8a71a5b4-3889-4711-9525-8fa74fe8933d";



const OtherProfile = withRouter(({follow_user, unfollow_user, followed}) => {

  const [show, setShow] = useState(false);
  const [btnText, setBtnText] = useState("Follow");
  const [btnColour, setBtnColour] = useState("primary");
  const [message, setMessage] = useState("");
  const [followers, setFollowers] = useState(769);

  const[showform, setForm] = useState(false);
  
  const onClickprofile = () => setForm(showform => !showform);



  function followUser() {

    if (!followed) {
      setFollowers(followers + 1);
      setMessage("Followed matthuynh");
      setBtnText("Following");
      setBtnColour("danger");

      follow_user(matt_uid, jarrod_uid);
      setShow(true);
    } else {
      setFollowers(followers - 1);
      setMessage("Unfollowed matthuynh");
      setBtnText("Follow");
      setBtnColour("primary");

      unfollow_user(matt_uid, jarrod_uid);
      setShow(true);
      followed = !followed;
    }
     
  }

  function renderform() {
    if(showform == true) {
      return <Col sm={4}><UserAccountDetails /></Col>
    }
  };




  return (
    <div>
    <NavigationBar />
    <Container
				fluid
				className="col-md-8 align-items-start"
				style={{ paddingTop: "50px" }}
			>
      <Row>
        <Col xs={true}>
        <UserOverview onClick={followUser} onClickprofile={onClickprofile} followers={followers} btnText={btnText} btnColour={btnColour}/>
        </Col>
        {renderform()}
      </Row>
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
      <h1>Projects</h1>
      <ProjectDisplay/>
    </Container>
    </div>
  );
});

function mapStateToProps(state) {
  return {
    followed: state.follow.followed,
  };
}

function mapDispatchToProps(dispatch){
  return {
      follow_user: (followee, follower) => {
          dispatch(follow_user(followee, follower));
      },
      unfollow_user: (followee, follower) => {
          dispatch(unfollow_user(followee, follower));
      },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfile);
