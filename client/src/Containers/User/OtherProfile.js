import React, { useState } from "react";
import { Container, Toast } from "react-bootstrap";
import UserOverview from "../../components/base/UserOverview";
import ProjectDisplay from "../../components/base/ProjectDisplay";
import { follow_user } from "../../actions/followActions";
import { unfollow_user } from "../../actions/unfollowActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import NavigationBar from "../../components/specialized/Nav/NavigationBar";

// TODO: Pull from Redux
const jarrod_uid = "aee9514a-b671-4c7b-a4c3-a0f4db81a66b";
const matt_uid = "458517d4-b115-451a-85b6-79406b2f964a";

const OtherProfile = withRouter(({ follow_user, unfollow_user, followed }) => {
  const [show, setShow] = useState(false);
  const [btnText, setBtnText] = useState("Follow");
  const [btnColour, setBtnColour] = useState("primary");
  const [message, setMessage] = useState("");
  const [followers, setFollowers] = useState(769);

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

  return (
    <div>
      <NavigationBar />
      <Container
        fluid
        className="col-md-8 align-items-start"
        style={{ paddingTop: "50px" }}
      >
        <UserOverview
          onClick={followUser}
          followers={followers}
          btnText={btnText}
          btnColour={btnColour}
        />
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
        <h1>Projects</h1>
        <ProjectDisplay />
      </Container>
    </div>
  );
});

function mapStateToProps(state) {
  return { followed: state.follow.followed };
}

function mapDispatchToProps(dispatch) {
  return {
    follow_user: (followee, follower) => {
      dispatch(follow_user(followee, follower));
    },
    unfollow_user: (followee, follower) => {
      dispatch(unfollow_user(followee, follower));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfile);
