import React, { useState, useEffect } from "react";
import { Container, Row, Col, Toast } from "react-bootstrap";
import UserOverview from "../../components/specialized/User/UserOverview";
import UserAccountDetails from "../../components/specialized/User/UserAccountDetails";
import NavigationBar from "../../components/specialized/Nav/NavigationBar";
import ProjectDisplay from "../../components/specialized/User/ProjectDisplay";
import { get_user_info } from "../../actions/userActions";
import { follow_user } from "../../actions/followActions";
import { unfollow_user } from "../../actions/unfollowActions";
import { withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";

const Profile = withRouter(
  ({
    get_user_info,
    follow_user,
    unfollow_user,
    profile,
    followed,
    loggedInUid,
    status,
    match
  }) => {
    const history = useHistory();

    const [show, setShow] = useState(false);
    const [img, setImg] = useState("");
    const [btnText, setBtnText] = useState("Follow");
    const [btnColour, setBtnColour] = useState("primary");
    const [message, setMessage] = useState("");
    const [followers, setFollowers] = useState(0);
    const [showform, setForm] = useState(false);

    const uid = match.params.uid;

    useEffect(() => {
      if (uid && uid !== undefined) {
        get_user_info(uid);
      }
    }, [get_user_info, uid]);

    useEffect(() => {
      setFollowers(profile.followers);
      setImg(profile.avatar);
    }, [profile, history]);

    useEffect(() => {
      if (status === 404) {
        history.push("/404");
      }
    }, [status, history]);

    const onClickprofile = () => setForm(showform => !showform);

    function followUser() {
      if (!followed && loggedInUid !== uid) {
        setFollowers(followers + 1);
        setMessage("Followed " + profile.username);
        setBtnText("Following");
        setBtnColour("danger");

        follow_user(uid, loggedInUid);
        setShow(true);
      } else if (loggedInUid !== uid) {
        if (followers - 1 < 0) {
          return;
        }
        setFollowers(followers - 1);
        setMessage("Unfollowed " + profile.username);
        setBtnText("Follow");
        setBtnColour("primary");

        unfollow_user(uid, loggedInUid);
        setShow(true);
        followed = !followed;
      }
    }

    function renderform() {
      if (showform === true && uid === loggedInUid) {
        return (
          <Col sm={4}>
            <UserAccountDetails />
          </Col>
        );
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
          <Row>
            <Col xs={true}>
              <UserOverview
                profile={profile}
                onClick={followUser}
                onClickprofile={onClickprofile}
                showform={showform}
                followers={followers}
                btnText={btnText}
                img={img}
                setImg={setImg}
                get_user_info={get_user_info}
                uid={uid}
                btnColour={btnColour}
              />
            </Col>
            {renderform()}
          </Row>
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            autohide
          >
            <Toast.Body>{message}</Toast.Body>
          </Toast>
          <h1>Projects</h1>
          <ProjectDisplay uid={uid} />
        </Container>
      </div>
    );
  }
);

function mapStateToProps(state) {
  return {
    followed: state.follow.followed,
    loggedInUid: state.user.uid,
    profile: state.user.other_profile,
    status: state.user.status
  };
}

function mapDispatchToProps(dispatch) {
  return {
    get_user_info: uid => {
      dispatch(get_user_info(uid));
    },
    follow_user: (followee, follower) => {
      dispatch(follow_user(followee, follower));
    },
    unfollow_user: (followee, follower) => {
      dispatch(unfollow_user(followee, follower));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
