import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col, ListGroup } from "react-bootstrap";

import NotificationAlert from "../../components/base/Alert";
import Message from "../../components/base/Message";
import Avatar from "../../components/base/Avatar";

import { Recommendations } from "../../components/specialized/Dashboard/Recommend";
import { HackathonCard } from "../../components/specialized/Dashboard/HackathonCard";
import { NotificationList } from "../../components/specialized/Dashboard/NotificationList";
import { RecentActivity } from "../../components/specialized/Dashboard/RecentActivity";

import NavigationBar from "../../components/specialized/Nav/NavigationBar";

import { getHackathons, addHackathons } from "../../actions/hackathonActions";
import {
  getNotifications,
  getProjectNotifications
} from "../../actions/notificationActions";
import { get_user_projects } from "../../actions/projectActions";
import { recommendProjects } from "../../actions/recommendAction";
import { get_user_requests } from "../../actions/userRequestAction";

// redux imports
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "../../css/Dashboard.css";

const default_avatar =
  "https://avatars2.githubusercontent.com/u/45340119?s=400&v=4";

const Dashboard = ({
  addHackathons,
  getHackathons,
  hackathons,
  isLoading,
  getNotifications,
  getProjectNotifications,
  recommendProjects,
  loggedInUid,
  notifications,
  projectNotifications,
  user,
  get_user_requests,
  requests,
  get_user_projects,
  recommendationsLst,
  projects
}) => {
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState(default_avatar);
  const history = useHistory();

  useEffect(() => {
    addHackathons();
  }, [addHackathons]);

  useEffect(() => {
    getHackathons();
  }, [isLoading, getHackathons]);

  // Loads project notifications
  useEffect(() => {
    get_user_requests(loggedInUid);
    get_user_projects(loggedInUid);
    getNotifications(loggedInUid, 5);
    getProjectNotifications(loggedInUid, 5);
    recommendProjects();
  }, [getProjectNotifications, loggedInUid, get_user_projects]);

  useEffect(() => {
    if (user === undefined) {
      return;
    }
    setName(user.username);
    setAvatar(user.avatar);
    if (
      user.firstname !== undefined &&
      user.lastname !== undefined &&
      user.firstname !== null &&
      user.lastname !== null
    ) {
      setFirstName(user.firstname);
      setFullName(user.firstname + " " + user.lastname);
    }
  }, [user]);

  function renderProjects() {
    if (
      projects === null ||
      projects === undefined ||
      projects === [] ||
      projects.length === 0
    ) {
      return (
        <Card.Title style={{ fontSize: "medium" }}>
          No projects to display
        </Card.Title>
      );
    } else {
      const project_links = projects.map((project, index) => (
        <Card.Title key={index}>
          <Link to={"/project/" + project.pid}>
            {name}/{project.projectName}
          </Link>
        </Card.Title>
      ));
      return project_links;
    }
  }

  function renderRequests() {
    if (
      requests === null ||
      requests === undefined ||
      requests === [] ||
      requests.length === 0
    ) {
      return (
        <Card.Title style={{ fontSize: "medium" }}>
          No requests to display
        </Card.Title>
      );
    } else {
      const request_links = requests.map((request, index) => (
        <Card.Title key={index}>
          <Link to={"/project/" + request.projectPid}>
            {request.requesterName}/{request.projectName}
          </Link>
        </Card.Title>
      ));
      return request_links;
    }
  }

  return (
    <div>
      <NotificationAlert />
      <NavigationBar />
      <div style={{ margin: "50px" }}>
        <h2>
          <span role="img" aria-label="stars">
            &#10024;
          </span>
          Welcome to your dashboard {firstName}{" "}
          <span role="img" aria-label="stars">
            &#10024;
          </span>
        </h2>
      </div>
      <Row style={{ margin: "25px" }}>
        {/* Col 1 */}
        <Col md={3} lg={3} xl={3}>
          <Container>
            <div>
              <Message
                variant="warning"
                message="here are your personal projects"
              />
              {/* User Display */}
              <div>
                <Avatar src={avatar} width={60} height={60} />
                <h3
                  onClick={() => {
                    history.push("/user/" + loggedInUid);
                  }}
                >
                  <a href="">{fullName !== "" ? fullName : name}</a>
                </h3>
              </div>
              {/* User Options */}
              <Card>
                <Card.Body>
                  {/* Card Index 0 */}
                  <h4>
                    <span role="img" aria-label="lightbulb">
                      &#128161;
                    </span>{" "}
                    Your Projects
                  </h4>
                  {renderProjects()}
                </Card.Body>
                <Card.Body>
                  {/* Card Index 0 */}
                  <Card.Title>
                    <span role="img" aria-label="lightbulb">
                      &#128273;
                    </span>
                    Project Requests
                  </Card.Title>
                  {renderRequests()}
                </Card.Body>
              </Card>
            </div>
          </Container>
        </Col>

        {/* Col 2 */}
        <Col>
          <Container>
            <div>
              <Message
                variant="success"
                message="here are your notifications based on your follow preferences"
              />
              {/* Project Notifications */}
              <h4>
                <span role="img" aria-label="stopwatch">
                  &#9201;
                </span>
                Project Notifications
              </h4>
              <Card>
                <ListGroup variant="flush">
                  <NotificationList
                    projectNotifications={projectNotifications.notifications}
                  />
                </ListGroup>
              </Card>

              <br />

              <h4>
                <span role="img" aria-label="lightbulb">
                  &#9201;
                </span>
                Recent Activity
              </h4>
              <Card>
                <RecentActivity notifications={notifications.notifications} />
              </Card>
            </div>
          </Container>
        </Col>

        {/* Col 4 */}
        <Col md={3} lg={3} xl={3}>
          <Container>
            {/* Projects interest */}
            <div>
              <h4>
                <span role="img" aria-label="trophy">
                  &#127942;
                </span>{" "}
                Projects that you may be interested in
              </h4>
              <Recommendations projects={recommendationsLst} />
            </div>
            <br></br>
            {/* Hackathon Panel */}
            <div>
              <h4>
                <span role="img" aria-label="city">
                  &#127751;
                </span>{" "}
                Upcoming Hackathons
              </h4>
              <HackathonCard hackathons={hackathons} />
            </div>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    hackathons: state.hackathons.hackathons,
    isLoading: state.hackathons.loading,
    notifications: state.notifications.notifications,
    projectNotifications: state.notifications.projectNotifications,
    loggedInUid: state.user.uid,
    user: state.login.profile,
    recommendationsLst: state.project.recommendedprojects,
    projects: state.project.projects,
    requests: state.users.requests
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getHackathons: () => {
      dispatch(getHackathons());
    },
    addHackathons: () => {
      dispatch(addHackathons());
    },
    getNotifications: (uid, notificationsToGet) => {
      dispatch(getNotifications(uid, notificationsToGet));
    },
    getProjectNotifications: (uid, notificationsToGet) => {
      dispatch(getProjectNotifications(uid, notificationsToGet));
    },
    get_user_projects: uid => {
      dispatch(get_user_projects(uid));
    },
    get_user_requests: uid => {
      dispatch(get_user_requests(uid));
    },
    recommendProjects: () => {
      dispatch(recommendProjects());
    }
  };
}
Dashboard.propTypes = {
  getHackathons: PropTypes.func.isRequired,
  addHackathons: PropTypes.func.isRequired,
  getProjectNotifications: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
