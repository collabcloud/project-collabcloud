import React from "react";
import { NavigationBar } from "../../components/base/NavigationBar";
import { Container, Row, Col, Jumbotron } from "react-bootstrap";

// Style Import
import "../../css/Dashboard.css";

const Dashboard = () => (
    <div>
        {/* <NavigationBar /> */}
        <Row>
            {/* Col 1 */}
            <Col md={2} sm={2} lg={2} xl={2}>
                <Container>
                    <div>
                        1 of 3
                    </div>
                </Container>
            </Col>

            {/* Col 2 */}
            <Col >
                <Container>
                    <div>
                        <Jumbotron>
                            <h3>Welcome to your dashboard $insertnamehere</h3>
                        </Jumbotron>
                        2 of 3
                    </div>
                </Container>
            </Col>

            {/* Col 4 */}
            <Col md={2} sm={2} lg={2} xl={2}>
                <Container>
                    <div>3 of 3</div>
                </Container>
            </Col>
        </Row>
    </div>
);

export default Dashboard;