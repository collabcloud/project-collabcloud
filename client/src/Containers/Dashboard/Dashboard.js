import React from "react";
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

// Style Import
import "../../css/Dashboard.css";

const Dashboard = () => (
    <div>
        <NavigationBar />
            <div style={{margin: "50px"}}>
                <h1>&#10024;Welcome to your dashboard temporaryuser&#10024;</h1>
            </div>
        <Row style={{ margin: "25px"}}>
            
            {/* Col 1 */}
            <Col md={3} sm={3} lg={3} xl={3}>
                <Container>
                    <div>
                    <h4>Nearby Hackathons</h4>
                        <Card>
                            <Card.Body>
                                {/* Card Index 0 */}
                                <Card.Title>&#9989; <a href="/">TheRBajaj</a> joined your <a href="/">Optimize.me</a> project!</Card.Title>
                                <Card.Text>
                                    &#128172; <a href="/">TheRBajaj</a> wrote: I think this project will go well!
                                </Card.Text>
                                <Button variant="success">Check out Project</Button>
                            </Card.Body>

                            <Card.Body>
                                {/* Card Index 0 */}
                                <Card.Title>&#10067; <a href="/">matthuyhn</a> is requesting to join your <a href="/">Stock Trading</a> project!</Card.Title>
                                <Card.Text>
                                    &#128172; <a href="/">matthuyhn</a> wrote: I love finance and would like to join this project with you!
                                </Card.Text>
                                <Button variant="success">View Project</Button>
                            </Card.Body>

                        </Card>
                    </div>
                </Container>
            </Col>

            {/* Col 2 */}
            <Col >
                <Container>
                    <div>
                        <Alert variant={'primary'}>
                            here are your notification based on your follow preferences
                        </Alert>

                        <h4>Recent Activities</h4>
                        <Card>
                            <Card.Body>
                                {/* Card Index 0 */}
                                <Card.Title>&#9989; <a href="/">TheRBajaj</a> joined your <a href="/">Optimize.me</a> project!</Card.Title>
                                <Card.Text>
                                    &#128172; <a href="/">TheRBajaj</a> wrote: I think this project will go well!
                                </Card.Text>
                                <Button variant="success">Check out Project</Button>
                            </Card.Body>

                            <Card.Body>
                                {/* Card Index 0 */}
                                <Card.Title>&#10067; <a href="/">matthuyhn</a> is requesting to join your <a href="/">Stock Trading</a> project!</Card.Title>
                                <Card.Text>
                                    &#128172; <a href="/">matthuyhn</a> wrote: I love finance and would like to join this project with you!
                                </Card.Text>
                                <Button variant="success">View Project</Button>
                            </Card.Body>

                            <Card.Body>
                                {/* Card Index 0 */}
                                <Card.Title>&#11088; <a href="/">Furqan17</a> starred your <a href="/">207 Paint</a> project!</Card.Title>
                                <Card.Text>
                                    &#128172; <a href="/">Furqan17</a> wrote: hey this looks familiar...
                                </Card.Text>
                                <Button variant="success">View Project Stars</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </Container>
            </Col>

            {/* Col 4 */}
            <Col md={3} sm={3} lg={3} xl={3}>
                <Container>
                    <div>
                        <h4>Nearby Hackathons</h4>
                        <Card>
                            <Card.Body>
                                {/* Card Index 0 */}
                                <Card.Title>&#9989; <a href="/">TheRBajaj</a> joined your <a href="/">Optimize.me</a> project!</Card.Title>
                                <Card.Text>
                                    &#128172; <a href="/">TheRBajaj</a> wrote: I think this project will go well!
                                </Card.Text>
                                <Button variant="success">Check out Project</Button>
                            </Card.Body>

                            <Card.Body>
                                {/* Card Index 0 */}
                                <Card.Title>&#10067; <a href="/">matthuyhn</a> is requesting to join your <a href="/">Stock Trading</a> project!</Card.Title>
                                <Card.Text>
                                    &#128172; <a href="/">matthuyhn</a> wrote: I love finance and would like to join this project with you!
                                </Card.Text>
                                <Button variant="success">View Project</Button>
                            </Card.Body>

                        </Card>
                    </div>
                </Container>
            </Col>
        </Row>
    </div>
);

export default Dashboard;