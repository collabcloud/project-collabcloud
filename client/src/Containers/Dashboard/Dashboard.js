import React, { useState } from "react";
import { NavigationBar } from "../../components/base/NavigationBar";
import { 
    Alert, 
    Card, 
    Button, 
    Container, 
    Row, 
    Col, 
    Jumbotron 
} from "react-bootstrap";
import NotificationAlert from "../../components/base/Alert";

// Style Import
import "../../css/Dashboard.css";

const Dashboard = () => {
    const [show, setShow] = useState(true);

    return (
    <div>
        <NotificationAlert />
        <NavigationBar />
            <div style={{margin: "50px"}}>
                <h2>Welcome to your dashboard, Jarrod</h2>
            </div>
        <Row style={{ margin: "25px"}}>
            
            {/* Col 1 */}
            <Col md={3} lg={3} xl={3}>
                <Container>
                    <div>
                        <Alert variant={'warning'} onClose={() => setShow(false)} dismissible>
                            here are your personal projects
                        </Alert>
                        {/* User Display */}
                        <div>
                        <img
                          alt=""
                          src={require('../../avatar.png')}
                          width="60"
                          height="60"
                          style={{marginTop: 10}}
                          className="d-inline-block align-top"
                        /><h3><a href="/">Jarrod Servilla</a></h3>
                        </div>
                        {/* User Options */}
                        <Card>
                            <Card.Body>
                                {/* Card Index 0 */}
                                <h4>Your Projects</h4>
                                <Card.Title><a href="/">jcserv/harmoney</a></Card.Title>
                                <Card.Title><a href="/">jcserv/grade.io</a></Card.Title>
                                <Card.Title><a href="/">jcserv/Stock-Trading</a></Card.Title>
                                <Card.Title><a href="/">jcserv/Optimize.me</a></Card.Title>
                            </Card.Body>
                            <Card.Body>
                                {/* Card Index 0 */}
                                <Card.Title>Project Requests</Card.Title>
                                <Card.Title><a href="/">jcserv/Optimize.me (1)</a></Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                </Container>
            </Col>

            {/* Col 2 */}
            <Col >
                <Container>
                    <div>
                        <Alert variant={'success'} onClose={() => setShow(false)} dismissible>
                            here are your notifications based on your follow preferences
                        </Alert>

                        <h4>Recent Activity</h4>
                        <Card>
                            <Card.Body>
                                {/* Card Index 0 */}
                                <Card.Title><a href="/">TheRBajaj</a> joined your <a href="/">Optimize.me</a> project!</Card.Title>
                                <Card.Text>
                                    <a href="/">TheRBajaj</a> wrote: I think this project will go well!
                                </Card.Text>
                                <Button variant="success">View Project</Button>
                            </Card.Body>

                            <Card.Body>
                                {/* Card Index 1 */}
                                <Card.Title><a href="/">matthuynh</a> is requesting to join your <a href="/">Stock Trading</a> project!</Card.Title>
                                <Card.Text>
                                    <a href="/">matthuynh</a> wrote: I love finance and would like to join this project with you!
                                </Card.Text>
                                <Button variant="success">View Project</Button>
                            </Card.Body>

                            <Card.Body>
                                {/* Card Index 2 */}
                                <Card.Title><a href="/">Furqan17</a> starred your <a href="/">207 Paint</a> project!</Card.Title>
                                <Button variant="success">View Project</Button>
                            </Card.Body>

                            <Card.Body>
                                {/* Card Index 0 */}
                                <Card.Title><a href="/">TheRBajaj</a> joined your <a href="/">Optimize.me</a> project!</Card.Title>
                                <Card.Text>
                                    <a href="/">TheRBajaj</a> wrote: I think this project will go well!
                                </Card.Text>
                                <Button variant="success">View Project</Button>
                            </Card.Body>

                            <Card.Body>
                                {/* Card Index 1 */}
                                <Card.Title><a href="/">matthuynh</a> is requesting to join your <a href="/">Stock Trading</a> project!</Card.Title>
                                <Card.Text>
                                    <a href="/">matthuynh</a> wrote: I love finance and would like to join this project with you!
                                </Card.Text>
                                <Button variant="success">View Project</Button>
                            </Card.Body>

                            <Card.Body>
                                {/* Card Index 2 */}
                                <Card.Title><a href="/">Furqan17</a> starred your <a href="/">207 Paint</a> project!</Card.Title>
                                <Button variant="success">View Project</Button>
                            </Card.Body>

                        </Card>
                    </div>
                </Container>
            </Col>

            {/* Col 4 */}
            <Col md={3} lg={3} xl={3}>
                <Container>
                    <Alert variant={'primary'} onClose={() => setShow(false)} dismissible>
                            here are some project based on your preferences
                        </Alert>
                    {/* Projects interest */}
                    <div>
                        <h4>Projects that you maybe interested in</h4>
                        <Card>
                            <Card.Body>
                                {/* Card Index 0 */}
                                <Card.Title><a href="/">Gradeulator</a></Card.Title>
                                <Card.Text> a grade calculator <br></br> by: <a href="/">Furqan17</a></Card.Text>
                                <Button variant="primary">Check out Project</Button>
                            </Card.Body>

                            <Card.Body>
                                {/* Card Index 0 */}
                                <Card.Title><a href="/">CodePrep</a></Card.Title>
                                <Card.Text> an open source coding platform <br></br> by: <a href="/">Furqan17</a></Card.Text>
                                <Button variant="primary">Check out Project</Button>
                            </Card.Body>

                        </Card>
                    </div>

                    <br></br>
                    {/* Hackathon Panel */}
                    <div>
                        <h4>Nearby Hackathons</h4>
                        <Card>
                            <Card.Body>
                                {/* Card Index 0 */}
                                <Card.Title> <a href="/">UofT Hacks</a></Card.Title>
                                <Card.Text><b>Jan 17-20 <br></br> Toronto, Ont</b></Card.Text>
                                <Button variant="info">Check out Hackathon</Button>
                            </Card.Body>

                            <Card.Body>
                                {/* Card Index 0 */}
                                <Card.Title> <a href="/">Hack the North</a></Card.Title>
                                <Card.Text><b>Sept 23-26 <br></br> Waterloo, Ont</b></Card.Text>
                                <Button variant="info">Check out Hackathon</Button>
                            </Card.Body>

                        </Card>
                    </div>
                </Container>
            </Col>
        </Row>
    </div>
    )
};

export default Dashboard;