import React from "react";
import { NavigationBar } from "../../../components/base/NavigationBar";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./createproject.css";

const CreateProjects = () => (
    <div>
        <NavigationBar/>
        <Container fluid className="page-content">
            <Form>
                <Row>
                    <Col />
                    <Col lg="8" className="col">
                        <h4>Create a new project</h4>
                    </Col>
                    <Col />
                </Row>
                <Row>
                    <Col />
                    <Col lg="8" className="col">
                        <p>Select an Existing Repo (optional)</p>
                    </Col>
                    <Col />
                </Row>
                <Row>
                    <Col/>
                    <Col lg="8" className="col">
                        <p>Project Name</p>
                        <Form.Control type="text" size="sm" className="item"/>
                    </Col>
                    <Col/>
                </Row>
                <Row>
                    <Col/>
                    <Col lg="8" className="col">
                        <p>It's built with</p>
                        <Form.Control type="text" size="sm" className="item"/>
                    </Col>
                    <Col/>
                </Row>
                <Row>
                    <Col/>
                    <Col lg="8" className="col">
                        <p>Description</p>
                        <Form.Control as="textarea" rows="3" className="item"/>
                    </Col>
                    <Col/>
                </Row>
                <Row>
                    <Col/>
                    <Col lg="8" className="col">
                        <p>Visibility</p>
                        <Form.Group className="item">
                            <Form.Check name="visibility" type='radio' label='Public'/>
                            <Form.Check name="visibility" type='radio' label='Private'/>
                        </Form.Group>
                    </Col>
                    <Col/>
                </Row>
                <Row>
                    <Col/>
                    <Col lg="8" className="col">
                        <p>Links</p>
                        <Form.Control type="text" size="sm" className="item"/>
                    </Col>
                    <Col/>
                </Row>
                <Row>
                    <Col/>
                    <Col lg="8" className="col">
                       <Button className="button" variant="success" type="submit">Submit</Button>
                    </Col>
                    <Col/>
                </Row>
            </Form>
        </Container>
    </div>
);

export default CreateProjects;
