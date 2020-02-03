import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ReactTags from "react-tag-autocomplete";

import { NavigationBar } from "../../../components/base/NavigationBar";
import { ItemsList }  from "../../../components/base/ItemsList";
import "./createproject.css";

export default class CreateProjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project_name: "",
      technologies: [],
      tech_suggestions: [
        { id: 1, name: "MongoDB" },
        { id: 2, name: "Express" },
        { id: 3, name: "React" },
        { id: 4, name: "Node.js" }
      ],
      description: "",
      visibility: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value
    });
  }

  handleDelete(i) {
    const technologies = this.state.technologies.slice(0);
    technologies.splice(i, 1);
    this.setState({ technologies });
  }

  handleAddition(tag) {
    const technologies = [].concat(this.state.technologies, tag);
    this.setState({ technologies });
  }

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
                <ReactTags
                  className="item"
                  allowNew
                  tags={this.state.technologies}
                  suggestions={this.state.tech_suggestions}
                  handleDelete={this.handleDelete}
                  handleAddition={this.handleAddition}
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
                <ItemsList className="item"/>
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
