import React, { Component } from "react";
import { NavigationBar } from "../../../components/base/NavigationBar";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./createproject.css";

export default class CreateProjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project_name: "",
      technologies: [],
      description: "",
      visibility: false,
      links: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.onTechChange = this.onTechChange.bind(this);
    this.onLinksChange = this.onLinksChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value
    });
  }

  onTechChange = tech => {
    if (!this.state.technologies.includes(tech)) {
      this.state.technologies.push(tech);
    }
  };

  onLinksChange = link => {
    if (!this.state.links.includes(link)) {
      this.state.links.push(link);
    }
  };

  onSubmit(e) {
    e.preventDefault();

    const project = {
      project_name: this.state.project_name,
      description: this.state.description,
      technologies: this.state.technologies,
      visibility: this.state.visibility,
      links: this.state.links
    };

    console.log(project);
  }

  render() {
    return (
      <div>
        <NavigationBar />
        <Container fluid className="page-content">
          <Form onSubmit={this.onSubmit}>
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
              <Col />
              <Col lg="8" className="col">
                <p>Project Name</p>
                <Form.Control
                  type="text"
                  size="sm"
                  className="item"
                  value={this.state.project_name}
                  name="project_name"
                  onChange={this.handleChange}
                />
              </Col>
              <Col />
            </Row>
            <Row>
              <Col />
              <Col lg="8" className="col">
                <p>It's built with</p>
                <Form.Control
                  type="text"
                  size="sm"
                  className="item"
                  onChange={this.onTechChange}
                />
              </Col>
              <Col />
            </Row>
            <Row>
              <Col />
              <Col lg="8" className="col">
                <p>Description</p>
                <Form.Control
                  as="textarea"
                  rows="3"
                  className="item"
                  value={this.state.description}
                  name="description"
                  onChange={this.handleChange}
                />
              </Col>
              <Col />
            </Row>
            <Row>
              <Col />
              <Col lg="8" className="col">
                <p>Visibility</p>
                <Form.Group className="item">
                  <Form.Check
                    name="visibility"
                    type="radio"
                    value={true}
                    label="Public"
                    onChange={this.handleChange}
                  />
                  <Form.Check
                    name="visibility"
                    type="radio"
                    value={false}
                    label="Private"
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Col>
              <Col />
            </Row>
            <Row>
              <Col />
              <Col lg="8" className="col">
                <p>Links</p>
                <Form.Control
                  type="text"
                  size="sm"
                  className="item"
                  onChange={this.onLinksChange}
                />
              </Col>
              <Col />
            </Row>
            <Row>
              <Col />
              <Col lg="8" className="col">
                <Button
                  className="button"
                  variant="success"
                  type="submit"
                  onClick={console.log("hi")}
                >
                  Submit
                </Button>
              </Col>
              <Col />
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}
