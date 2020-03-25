import React, { useState, useEffect } from "react";
import { NavigationBar } from "../../components/base/NavigationBar";
import { HackathonCard } from "../../components/base/HackathonCard";
import { Alert, Card, Button, Container, Row, Col, Jumbotron  } from "react-bootstrap";
import { NotificationList } from "./NotificationList";
import NotificationAlert from "../../components/base/Alert";

// redux imports
import { connect } from "react-redux";
import { getHackathons, addHackathons } from "../../actions/hackathonActions";
import { getProjectNotifications } from "../../actions/notificationActions";
import PropTypes from "prop-types";

// Style Import
import "../../css/Dashboard.css";

const Dashboard = ({ addHackathons, getHackathons, hackathons, isLoading, getProjectNotifications, loggedInUid, projectNotifications }) => {
	const [show, setShow] = useState(true);

    useEffect(()=>{
        // addHackathons();  
    },[]);  
    useEffect(()=>{
        getHackathons();
    },[isLoading]); 


	// Loads project notifications
	useEffect(() => {
		getProjectNotifications( loggedInUid , 10);
	}, [getProjectNotifications, loggedInUid]);

	return (
		<div>
			<NotificationAlert />
			<NavigationBar />
			<div style={{ margin: "50px" }}>
				<h2>
					<span role="img" aria-label="stars">
						&#10024;
					</span>
					Welcome to your dashboard, Jarrod{" "}
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
									src={require("../../avatar.png")}
									width="60"
									height="60"
									style={{ marginTop: 10 }}
									className="d-inline-block align-top"
								/>
								<h3>
									<a href="/">Jarrod Servilla</a>
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
									<Card.Title>
										<a href="/">jcserv/harmoney</a>
									</Card.Title>
									<Card.Title>
										<a href="/">jcserv/grade.io</a>
									</Card.Title>
									<Card.Title>
										<a href="/">jcserv/Stock-Trading</a>
									</Card.Title>
									<Card.Title>
										<a href="/">jcserv/Optimize.me</a>
									</Card.Title>
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
								here are your notifications based on your follow
								preferences
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
										&#9989; <a href="/">TheRBajaj</a> joined
										your <a href="/">Optimize.me</a>{" "}
										project!
									</Card.Title>
									<Card.Text>
										&#128172; <a href="/">TheRBajaj</a>{" "}
										wrote: I think this project will go
										well!
									</Card.Text>
									<Button variant="success">
										View Project
									</Button>
								</Card.Body>

								<Card.Body>
									{/* Card Index 1 */}
									<Card.Title>
										&#10067; <a href="/">matthuynh</a> is
										requesting to join your{" "}
										<a href="/">Stock Trading</a> project!
									</Card.Title>
									<Card.Text>
										&#128172; <a href="/">matthuynh</a>{" "}
										wrote: I love finance and would like to
										join this project with you!
									</Card.Text>
									<Button variant="success">
										View Project
									</Button>
								</Card.Body>

								<Card.Body>
									{/* Card Index 2 */}
									<Card.Title>
										&#11088; <a href="/">Furqan17</a>{" "}
										starred your <a href="/">207 Paint</a>{" "}
										project!
									</Card.Title>
									<Button variant="success">
										View Project
									</Button>
								</Card.Body>

								<Card.Body>
									{/* Card Index 0 */}
									<Card.Title>
										&#9989; <a href="/">TheRBajaj</a> joined
										your <a href="/">Optimize.me</a>{" "}
										project!
									</Card.Title>
									<Card.Text>
										&#128172; <a href="/">TheRBajaj</a>{" "}
										wrote: I think this project will go
										well!
									</Card.Text>
									<Button variant="success">
										View Project
									</Button>
								</Card.Body>

								<Card.Body>
									{/* Card Index 1 */}
									<Card.Title>
										&#10067; <a href="/">matthuynh</a> is
										requesting to join your{" "}
										<a href="/">Stock Trading</a> project!
									</Card.Title>
									<Card.Text>
										&#128172; <a href="/">matthuynh</a>{" "}
										wrote: I love finance and would like to
										join this project with you!
									</Card.Text>
									<Button variant="success">
										View Project
									</Button>
								</Card.Body>

								<Card.Body>
									{/* Card Index 2 */}
									<Card.Title>
										&#11088; <a href="/">Furqan17</a>{" "}
										starred your <a href="/">207 Paint</a>{" "}
										project!
									</Card.Title>
									<Button variant="success">
										View Project
									</Button>
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
							<h4>
								&#127942; Projects that you maybe interested in
							</h4>
							<Card>
								<Card.Body>
									{/* Card Index 0 */}
									<Card.Title>
										<a href="/">Gradeulator</a>
									</Card.Title>
									<Card.Text>
										{" "}
										a grade calculator <br></br> by:{" "}
										<a href="/">Furqan17</a>
									</Card.Text>
									<Button variant="primary">
										Check out Project
									</Button>
								</Card.Body>

								<Card.Body>
									{/* Card Index 0 */}
									<Card.Title>
										<a href="/">CodePrep</a>
									</Card.Title>
									<Card.Text>
										{" "}
										an open source coding platform <br></br>{" "}
										by: <a href="/">Furqan17</a>
									</Card.Text>
									<Button variant="primary">
										Check out Project
									</Button>
								</Card.Body>
							</Card>
						</div>

						<br></br>
						{/* Hackathon Panel */}
						  <div>
                <h4>&#127751; Upcoming Hackathons</h4>
                <HackathonCard hackathons={hackathons}  />
              </div>
					</Container>
				</Col>
			</Row>
		</div>
	);
};


function mapStateToProps(state){
    return { 
        hackathons: state.hackathons.hackathons,
        isLoading: state.hackathons.loading,
        projectNotifications: state.notifications.projectNotifications,
		    loggedInUid: state.user.uid

     };
  }
  
  function mapDispatchToProps(dispatch){
    return {
        getHackathons: () => {
            dispatch(getHackathons());
        },
        addHackathons: () => {
            dispatch(addHackathons());
        },
      getProjectNotifications: (uid, notificationsToGet) => {
			  dispatch(getProjectNotifications(uid, notificationsToGet));
		  }
    };
  }
  
  
  Dashboard.propTypes = {
    getHackathons: PropTypes.func.isRequired,
    addHackathons: PropTypes.func.isRequired,
    getProjectNotifications: PropTypes.func.isRequired
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

