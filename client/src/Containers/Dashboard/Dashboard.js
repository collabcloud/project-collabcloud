import React, { useState, useEffect } from "react";
import { Alert, Card, Button, Container, Row, Col } from "react-bootstrap";
import { NotificationList } from "./NotificationList";
import NotificationAlert from "../../components/base/Alert";
import NavigationBar from "../../components/specialized/Nav/NavigationBar";

// Style Import
import "../../css/Dashboard.css";

// Redux Imports
import { connect } from "react-redux"; // connects the CreateProjects component to the Redux store
import { getProjectNotifications } from "../../actions/notificationActions";
import { get_user_info } from "../../actions/userActions";
import { get_user_projects } from "../../actions/projectActions";
import { generateURL } from "../../utils/helpers";
import PropTypes from "prop-types";

const Dashboard = ({
  getProjectNotifications,
  get_user_info,
  loggedInUid,
  projectNotifications,
  user,
  get_user_projects,
  projects
}) => {
  const [show, setShow] = useState(true);

  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState("");

  // Loads project notifications
  useEffect(() => {
    get_user_info(loggedInUid);
    get_user_projects(loggedInUid);
    getProjectNotifications(loggedInUid, 10);
  }, [getProjectNotifications, loggedInUid, get_user_info, get_user_projects]);

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
          <a href="/">
            {name}/{project.projectName}
          </a>
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
                <img
                  alt=""
                  src={avatar}
                  width="60"
                  height="60"
                  style={{ marginTop: 10 }}
                  className="d-inline-block align-top"
                />
                <h3>
                  <a href="/">{fullName !== "" ? fullName : name}</a>
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
                    &#9989; <a href="/">TheRBajaj</a> joined your{" "}
                    <a href="/">Optimize.me</a> project!
                  </Card.Title>
                  <Card.Text>
                    &#128172; <a href="/">TheRBajaj</a> wrote: I think this
                    project will go well!
                  </Card.Text>
                  <Button variant="success">View Project</Button>
                </Card.Body>

                <Card.Body>
                  {/* Card Index 1 */}
                  <Card.Title>
                    &#10067; <a href="/">matthuynh</a> is requesting to join
                    your <a href="/">Stock Trading</a> project!
                  </Card.Title>
                  <Card.Text>
                    &#128172; <a href="/">matthuynh</a> wrote: I love finance
                    and would like to join this project with you!
                  </Card.Text>
                  <Button variant="success">View Project</Button>
                </Card.Body>

                <Card.Body>
                  {/* Card Index 2 */}
                  <Card.Title>
                    &#11088; <a href="/">Furqan17</a> starred your{" "}
                    <a href="/">207 Paint</a> project!
                  </Card.Title>
                  <Button variant="success">View Project</Button>
                </Card.Body>

                <Card.Body>
                  {/* Card Index 0 */}
                  <Card.Title>
                    &#9989; <a href="/">TheRBajaj</a> joined your{" "}
                    <a href="/">Optimize.me</a> project!
                  </Card.Title>
                  <Card.Text>
                    &#128172; <a href="/">TheRBajaj</a> wrote: I think this
                    project will go well!
                  </Card.Text>
                  <Button variant="success">View Project</Button>
                </Card.Body>

                <Card.Body>
                  {/* Card Index 1 */}
                  <Card.Title>
                    &#10067; <a href="/">matthuynh</a> is requesting to join
                    your <a href="/">Stock Trading</a> project!
                  </Card.Title>
                  <Card.Text>
                    &#128172; <a href="/">matthuynh</a> wrote: I love finance
                    and would like to join this project with you!
                  </Card.Text>
                  <Button variant="success">View Project</Button>
                </Card.Body>

                <Card.Body>
                  {/* Card Index 2 */}
                  <Card.Title>
                    &#11088; <a href="/">Furqan17</a> starred your{" "}
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
            <Alert
              variant={"primary"}
              onClose={() => setShow(false)}
              dismissible
            >
              here are some project based on your preferences
            </Alert>
            {/* Projects interest */}
            <div>
              <h4>&#127942; Projects that you maybe interested in</h4>
              <Card>
                <Card.Body>
                  {/* Card Index 0 */}
                  <Card.Title>
                    <a href="/">Gradeulator</a>
                  </Card.Title>
                  <Card.Text>
                    {" "}
                    a grade calculator <br></br> by: <a href="/">Furqan17</a>
                  </Card.Text>
                  <Button variant="primary">Check out Project</Button>
                </Card.Body>

                <Card.Body>
                  {/* Card Index 0 */}
                  <Card.Title>
                    <a href="/">CodePrep</a>
                  </Card.Title>
                  <Card.Text>
                    {" "}
                    an open source coding platform <br></br> by:{" "}
                    <a href="/">Furqan17</a>
                  </Card.Text>
                  <Button variant="primary">Check out Project</Button>
                </Card.Body>
              </Card>
            </div>

            <br></br>
            {/* Hackathon Panel */}
            <div>
              <h4>&#127751; Nearby Hackathons</h4>
              <Card>
                <Card.Body>
                  {/* Card Index 0 */}
                  <Card.Title>
                    {" "}
                    <a href="/">UofT Hacks</a>
                  </Card.Title>
                  <Card.Text>
                    <b>
                      Jan 17-20 <br></br> Toronto, Ont
                    </b>
                  </Card.Text>
                  <Button variant="info">Check out Hackathon</Button>
                </Card.Body>

                <Card.Body>
                  {/* Card Index 0 */}
                  <Card.Title>
                    {" "}
                    <a href="/">Hack the North</a>
                  </Card.Title>
                  <Card.Text>
                    <b>
                      Sept 23-26 <br></br> Waterloo, Ont
                    </b>
                  </Card.Text>
                  <Button variant="info">Check out Hackathon</Button>
                </Card.Body>
              </Card>
            </div>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    projectNotifications: state.notifications.projectNotifications,
    loggedInUid: state.user.uid,
    user: state.userinfo.profile,
    projects: state.project.projects
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProjectNotifications: (uid, notificationsToGet) => {
      dispatch(getProjectNotifications(uid, notificationsToGet));
    },
    get_user_info: uid => {
      dispatch(get_user_info(uid));
    },
    get_user_projects: uid => {
      dispatch(get_user_projects(uid));
    }
  };
}

Dashboard.propTypes = {
  getProjectNotifications: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
