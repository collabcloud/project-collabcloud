import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ReactTags from "react-tag-autocomplete";
import { NavigationBar } from "../../../components/base/NavigationBar";
import { ProjectView } from "../../../components/specialized/ProjectView";
import { ItemsList }  from "../../../components/base/ItemsList";

import { FaGithub, FaLinkedin, FaDev } from 'react-icons/fa';
import { MdWeb } from 'react-icons/md'; 

import "./createproject.css";

const github = <FaGithub/>;
const website = <MdWeb/>;
const linkedin = <FaLinkedin/>;
const dev = <FaDev />;

export default function CreateProjects() {

  const [name, setName] = useState("");
  const [tech, setTech] = useState([]);
  const [desc, setDesc] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [links, setLinks] = useState( [
    {name: 'Github', icon: github, value: ''},
    {name: 'Website', icon: website, value: ''},
    {name: 'DevPost', icon: dev, value: ''},
    {name: 'LinkedIn', icon: linkedin, value: ''}
  ])

  const tech_suggestions = [
    { id: 1, name: "MongoDB" },
    { id: 2, name: "Express" },
    { id: 3, name: "React" },
    { id: 4, name: "Node.js" }
  ];

  
  function handleAddition(tag) {
    const technologies = [].concat(tech, tag);
    setTech(technologies);
  }

  function handleDelete(i) {
    const technologies = tech.slice(0);
    technologies.splice(i, 1);
    setTech(technologies);
  }

  function updateLink(index, value) {
    const new_links = [...links];
    var item = new_links[index];
    item.value = value;
    setLinks(new_links);
  }

  function onSubmit(e) {
    e.preventDefault();

    const project = {
      name: name,
      tech: tech,
      desc: desc,
      visibility: visibility,
      links: links
    };

    console.log(project);
  }

  return (
    <div>
      <NavigationBar />
      <Container fluid className="page-content">
        <Form onSubmit={onSubmit}>
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
              <ProjectView/>
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
                value={name}
                name="project_name"
                onChange={e => setName(e.target.value)}
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
                tags={tech}
                suggestions={tech_suggestions}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
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
                value={desc}
                name="description"
                onChange={e => setDesc(e.target.value)}
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
                  onChange={e => setVisibility(e.target.value)}
                />
                <Form.Check
                  name="visibility"
                  type="radio"
                  value={false}
                  label="Private"
                  onChange={e => setVisibility(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col />
          </Row>
          <Row>
            <Col />
            <Col lg="8" className="col">
              <p>Links</p>
              <ItemsList className="item" items={links} updateLink={updateLink}/>
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
                onClick={console.log("submit button pressed")}
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
