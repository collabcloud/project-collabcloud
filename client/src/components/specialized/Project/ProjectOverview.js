import React, { useState } from "react";
import {
  Jumbotron,
  Button,
  Container,
  Row,
  Col,
  Image,
  ListGroup
} from "react-bootstrap";
import { Item } from "../../base/Item";
import { ItemList } from "../../base/ItemList";
import { RequestCollaborators } from "../../specialized/Project/RequestCollaborators";
import logo from "../../../harmoney.png";
import "../../../css/Project.css";
import tech_suggestions_array from "../../../utils/techSuggestions";

// Icons for website buttons
import { FaGithub, FaLinkedin, FaDev } from "react-icons/fa";
import { MdWeb, MdSettings } from "react-icons/md";
const github = <FaGithub />;
const website = <MdWeb />;
const linkedin = <FaLinkedin />;
const dev = <FaDev />;
const moment = require("moment");

// This component shows an individual project's view
export function ProjectOverview(props) {
  const [showRequests, setShowRequests] = useState(false);
  const project = props.projectInformation.project;
  const userIsProjectOwner = props.loggedInUid === project.ownerId;

  const technologiesList = tech_suggestions_array;

  let links = [
    {
      name: "GitHub",
      icon: github,
      isProvided: project.githubLink ? true : false,
      value: project.githubLink
    },
    {
      name: "Website",
      icon: website,
      isProvided: project.websiteLink ? true : false,
      value: project.websiteLink
    },
    {
      name: "DevPost",
      icon: dev,
      isProvided: project.devpostLink ? true : false,
      value: project.devpostLink
    },
    {
      name: "LinkedIn",
      icon: linkedin,
      isProvided: project.linkedinLink ? true : false,
      value: project.linkedinLink
    }
  ];

  function renderProjectButtons() {
    if (!props.hasUserJoined) {
      if (props.requestedToJoin) {
        return (
          <Button variant="success" onClick={props.acceptRequest}>
            Join Project
          </Button>
        );
      } else if (!props.requestedToJoinProject) {
        return (
          <Button variant="success" onClick={props.requestToJoinProject}>
            Request To Join Project
          </Button>
        );
      } else {
        return (
          <Button variant="secondary" disabled>
            Requested
          </Button>
        );
      }
    }
    console.log(userIsProjectOwner);
    if (!userIsProjectOwner) {
      return (
        <Button
          variant="danger"
          onClick={props.requestToLeaveProject}
          disabled={userIsProjectOwner}
          style={{
            marginLeft: "10px",
            pointerEvents: !userIsProjectOwner ? "" : "none"
          }}
        >
          Leave Project
        </Button>
      );
    }
  }

  function toggleShowRequests() {
    setShowRequests(!showRequests);
  }

  return (
    <Jumbotron>
      <Container>
        <Row>
          <Col xs={4}>
            <Image src={logo} />
            {userIsProjectOwner && (
              <h4 style={{ marginTop: "155px" }}>Requests</h4>
            )}
            {userIsProjectOwner && (
              <ItemList
                items={props.requests}
                onClick={props.acceptUserRequest}
              />
            )}
          </Col>

          <Col className="d-flex align-items-start flex-column">
            {/* General Project Information */}
            <h1 className="projectName">{project.projectName}</h1>
            <div className="innerbox">
              <p>{project.projectDescription}</p>
              <p>
                {" "}
                CollabClouding since{" "}
                {moment(project.createdAt).format("MMMM Do YYYY")}
              </p>
            </div>
            <br />

            {/* List of technologies used for this project */}
            <h4> Technologies Used </h4>
            <ListGroup horizontal>
              {technologiesList.map(
                (technology, index) =>
                  // Only render this technology if it is included in technologiesUsed
                  project.technologiesUsed[technology.id - 1] === "1" && (
                    <Item
                      value={technology.name}
                      key={technology.name + index}
                    />
                  )
              )}
            </ListGroup>
            <br />

            {/* List of links to websites for this project */}
            <h4> Links </h4>
            <ListGroup horizontal>
              {links.map((button, index) => (
                // Note: Provided an arbitrary key prop here to both <p> and it's child <Button>
                // This is for React's internals: https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js
                <p className="project-view-links-buttons" key={button + index}>
                  <Button
                    variant={button.isProvided ? "info" : "outline-info"}
                    key={button}
                    type="button"
                    disabled={!button.isProvided}
                    href={button.value}
                    target="_blank"
                    style={{
                      pointerEvents: button.isProvided ? "" : "none"
                    }}
                  >
                    {button.icon}
                    {button.name}
                  </Button>
                </p>
              ))}
            </ListGroup>
            <br />

            <Row>
              <p className="project-view-submit-buttons">
                {props.hasUserJoined && (
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={props.toggleSettings}
                    disabled={!userIsProjectOwner}
                    style={{
                      pointerEvents: userIsProjectOwner ? "" : "none"
                    }}
                  >
                    <MdSettings />
                    Settings
                  </Button>
                )}
              </p>
              <p>{renderProjectButtons()}</p>
              <p className="project-view-submit-buttons">
                {props.hasUserJoined && (
                  <Button
                    variant="primary"
                    type="button"
                    onClick={toggleShowRequests}
                    disabled={!userIsProjectOwner}
                    style={{ pointerEvents: userIsProjectOwner ? "" : "none" }}
                  >
                    Request Collaborators
                  </Button>
                )}
              </p>
            </Row>
            {showRequests && (
              <RequestCollaborators
                requestUser={props.requestUser}
                requestStatus={props.requestStatus}
              />
            )}
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  );
}
