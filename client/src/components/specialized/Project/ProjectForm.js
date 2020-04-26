import React, { useState } from "react";
import { Button, Container, Row, Form } from "react-bootstrap";
import { ItemsList } from "../../base/ItemsList";
import { FaGithub, FaLinkedin, FaDev } from "react-icons/fa";
import { MdWeb } from "react-icons/md";
import ReactTags from "react-tag-autocomplete";

import "../../../css/Project.css";
import tech_suggestions_array from "../../../utils/techSuggestions";

// Note: these variables NEED to be set and used, rather than use these icons directly
const github = <FaGithub />;
const website = <MdWeb />;
const linkedin = <FaLinkedin />;
const dev = <FaDev />;

// This component shows an individual project's view
export function ProjectForm(props) {
  const projectData = props.projectInformation.project;
  const techSuggestions = tech_suggestions_array;

  // Decodes the encoded technologiesUsed string into its corresponding list of technologies
  const decodeTechUsed = () => {
    let techUsed = [];
    let encodedArray = projectData.technologiesUsed.split("");
    for (let i = 0; i < encodedArray.length; i++) {
      if (encodedArray[i] !== "0") {
        techUsed.push({ id: i + 1, name: techSuggestions[i].name });
      }
    }
    return techUsed;
  };

  // Each field in the form needs their own state, which is updated as the field is mutated
  const [projectName, setProjectName] = useState(projectData.projectName);
  const [projectDescription, setProjectDescription] = useState(
    projectData.projectDescription
  );
  const [isProjectPublic, setVisibilityPublic] = useState(
    !projectData.isPrivate
  );
  const [tech, setTech] = useState(decodeTechUsed());
  const [links, setLinks] = useState([
    {
      name: "Github",
      icon: github,
      placeholder: "Enter your project's GitHub URL here",
      value: projectData.githubLink,
    },
    {
      name: "Website",
      icon: website,
      placeholder: "Enter your project's website URL here",
      value: projectData.websiteLink,
    },
    {
      name: "DevPost",
      icon: linkedin,
      placeholder: "Enter your project's DevPost URL here",
      value: projectData.devpostLink,
    },
    {
      name: "LinkedIn",
      icon: dev,
      placeholder: "Enter your project's LinkedIn URL here",
      value: projectData.linkedinLink,
    },
  ]);

  // When the user clicks on "Submit", updates this project from the back-end
  const onSubmit = (e) => {
    e.preventDefault();
    let pid = projectData.pid;

    // Calls the updateProject() function from our parent
    props.updateThisProject({
      pid,
      projectName,
      projectDescription,
      isProjectPublic,
      tech,
      links,
    });

    // Redirect user back to the user information page
    props.toggleSettings();
  };

  // When the user clicks on "Delete", delete this project from the back-end
  const deleteProject = () => {
    // Calls the deleteProject() function from our parent
    props.deleteThisProject(projectData.pid);

    // Redirect user back to the user information page
    props.toggleSettings();
  };

  // Used to update state of links list
  const updateLink = (index, value) => {
    const new_links = [...links];
    let item = new_links[index];
    item.value = value;
    setLinks(new_links);
  };

  // Used to handle the addition of a technology tag
  const handleAddition = (tag) => {
    const technologies = [].concat(tech, tag);
    setTech(technologies);
  };

  // Used to handle the deletion of a technology tag
  const handleDelete = (i) => {
    const technologies = tech.slice(0);
    technologies.splice(i, 1);
    setTech(technologies);
  };

  return (
    <div>
      <Container
        fluid
        className="col-md-8 align-items-start"
        style={{ paddingTop: "50px" }}
      >
        <h4 className="createtitle">Modifying Project</h4>

        <Form onSubmit={onSubmit}>
          <div className="d-flex align-items-start flex-column">
            <p className="createfont">Project Name</p>

            <Form.Control
              type="text"
              size="sm"
              className="item"
              value={projectName}
              name="project_name"
              disabled // we currently do not allow Project names to be changed
              onChange={(e) => setProjectName(e.target.value)}
            />

            <p className="createfont">Description</p>
            <Form.Control
              as="textarea"
              rows="3"
              className="item"
              value={projectDescription}
              name="description"
              onChange={(e) => setProjectDescription(e.target.value)}
            />

            <p className="createfont">Project Visibility</p>
            <Form.Group className="item">
              <Form.Check
                name="publicVisibility"
                type="radio"
                checked={isProjectPublic}
                value="public"
                label="Public"
                onChange={(e) => setVisibilityPublic(true)}
              />
              <Form.Check
                name="privateVisibility"
                checked={!isProjectPublic}
                type="radio"
                value="private"
                label="Private"
                onChange={(e) => setVisibilityPublic(false)}
              />
            </Form.Group>

            <p className="createfont">It's built with</p>
            <ReactTags
              className="item"
              tags={tech}
              suggestions={techSuggestions}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
            />

            <p className="createfont">Links</p>
            <ItemsList className="item" items={links} updateLink={updateLink} />
            <br />

            <Row>
              <p className="project-view-submit-buttons">
                <Button variant="primary" type="submit">
                  Update
                </Button>
              </p>
              <p className="project-view-submit-buttons">
                <Button variant="outline-dark" onClick={props.toggleSettings}>
                  Cancel
                </Button>
              </p>
              <p className="project-view-submit-buttons">
                <Button variant="outline-danger" onClick={deleteProject}>
                  Delete
                </Button>
              </p>
            </Row>
            <br />
          </div>
        </Form>
      </Container>
    </div>
  );
}
