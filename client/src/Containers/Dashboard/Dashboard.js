import React, { useState, useEffect } from "react";
import { Recommendations } from "../../components/base/Recommend";
import { HackathonCard } from "../../components/base/HackathonCard";
import { Alert, Card, Button, Container, Row, Col } from "react-bootstrap";
import { NotificationList } from "./NotificationList";
import NotificationAlert from "../../components/base/Alert";
import Avatar from "../../components/base/Avatar";
import NavigationBar from "../../components/specialized/Nav/NavigationBar";
import "../../css/Dashboard.css";
// redux imports
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getHackathons, addHackathons } from "../../actions/hackathonActions";
import { getProjectNotifications } from "../../actions/notificationActions";

import { get_user_projects } from "../../actions/projectActions";
import { recommendProjects } from "../../actions/recommendAction";
import PropTypes from "prop-types";

const default_avatar =
  "https://avatars2.githubusercontent.com/u/45340119?s=400&v=4";

const Dashboard = ({
  addHackathons,
  getHackathons,
  hackathons,
  isLoading,
  getProjectNotifications,
  loggedInUid,
  projectNotifications,
  user,
  get_user_projects,
  recommendations,
  projects
}) => {
  const [show, setShow] = useState(true);
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState(default_avatar);
  const history = useHistory();

  useEffect(() => {
    //addHackathons();
  }, []);
  useEffect(() => {
    getHackathons();
  }, [isLoading, getHackathons]);

  // Loads project notifications
  useEffect(() => {
    get_user_projects(loggedInUid);
    getProjectNotifications(loggedInUid, 10);
  }, [getProjectNotifications, loggedInUid, get_user_projects]);

  useEffect(() => {
    recommendProjects();
  }, []);

  useEffect(() => {
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
    if (projects === null || projects === undefined || projects === []) {
      return <Card.Title>No projects to display</Card.Title>;
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
              <Alert
                variant={"warning"}
                onClose={() => setShow(false)}
                dismissible
              >
                here are your personal projects
              </Alert>
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
                  <Card.Title>
                    <a href="/">jcserv/Optimize.me (1)</a>
                  </Card.Title>
                </Card.Body>
              </Card>
            </div>
          </Container>
        </Col>

        {/* Col 2 */}
        <Col>
          <Container>
            <div>
              <Alert
                variant={"success"}
                onClose={() => setShow(false)}
                dismissible
              >
                here are your notifications based on your follow preferences
              </Alert>

              {/* Project Notifications */}
              <h4>
                <span role="img" aria-label="stopwatch">
                  &#9201;
                </span>
                Project Notifications
              </h4>
              <Card>
                <NotificationList
                  projectNotifications={projectNotifications.notifications}
                />
              </Card>

              <br />

              <h4>
                <span role="img" aria-label="lightbulb">
                  &#9201;
                </span>
                Recent Activity
              </h4>
              <Card>
                <Card.Body>
                  {/* Card Index 0 */}
                  <Card.Title>
                    <span role="img" aria-label="checkmark">
                      &#9989;
                    </span>{" "}
                    <a href="/">TheRBajaj</a> joined your{" "}
                    <a href="/">Optimize.me</a> project!
                  </Card.Title>
                  <Card.Text>
                    <span role="img" aria-label="speech">
                      &#128172;
                    </span>{" "}
                    <a href="/">TheRBajaj</a> wrote: I think this project will
                    go well!
                  </Card.Text>
                  <Button variant="success">View Project</Button>
                </Card.Body>

                <Card.Body>
                  {/* Card Index 1 */}
                  <Card.Title>
                    <span role="img" aria-label="question_mark">
                      &#10067;
                    </span>{" "}
                    <a href="/">matthuynh</a> is requesting to join your{" "}
                    <a href="/">Stock Trading</a> project!
                  </Card.Title>
                  <Card.Text>
                    <span role="img" aria-label="speech">
                      &#128172;
                    </span>{" "}
                    <a href="/">matthuynh</a> wrote: I love finance and would
                    like to join this project with you!
                  </Card.Text>
                  <Button variant="success">View Project</Button>
                </Card.Body>

                <Card.Body>
                  {/* Card Index 2 */}
                  <Card.Title>
                    <span role="img" aria-label="star">
                      &#11088;
                    </span>{" "}
                    <a href="/">Furqan17</a> starred your{" "}
                    <a href="/">207 Paint</a> project!
                  </Card.Title>
                  <Button variant="success">View Project</Button>
                </Card.Body>
              </Card>
            </div>
          </Container>
        </Col>

        {/* Col 4 */}
        <Col md={3} lg={3} xl={3}>
          <Container>
            {/* <Alert
							variant={"primary"}
							onClose={() => setShow(false)}
							dismissible
						>
							here are some project based on your preferences
						</Alert> */}

            {/* Projects interest */}
            <div>
              <h4>&#127942; Projects that you maybe interested in</h4>
              <Recommendations projects={recommendations} />
            </div>
            <br></br>
            {/* Hackathon Panel */}
            <div>
              <h4>&#127751; Upcoming Hackathons</h4>
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
    projectNotifications: state.notifications.projectNotifications,
    loggedInUid: state.user.uid,
    user: state.login.profile,
    recommendations: state.project.recommendedprojects,
    projects: state.project.projects
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
    getProjectNotifications: (uid, notificationsToGet) => {
      dispatch(getProjectNotifications(uid, notificationsToGet));
    },
    get_user_projects: uid => {
      dispatch(get_user_projects(uid));
    },
    recommendProjects: () => {
      dispatch(recommendProjects());
    }
  };
}
Dashboard.propTypes = {
  getHackathons: PropTypes.func.isRequired,
  addHackathons: PropTypes.func.isRequired,
  recommendProjects,
  getProjectNotifications: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
