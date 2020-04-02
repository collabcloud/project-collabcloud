import React from "react";
import { Card, Button, Container, Row, Col, ListGroup } from "react-bootstrap";
import { GoBook, GoPerson } from "react-icons/go";
import { FaHeart, FaBuffer } from "react-icons/fa";
import { Item } from "../../base/Item";
import tech_suggestions_array from "../../../utils/techSuggestions";

import "../../../css/ProjectBox.css";

const technologiesList = tech_suggestions_array;

export default function ProjectBox(props) {
  const name = props.name;
  const desc = props.desc;
  const tech = props.tech;
  const followers = props.followers;
  const likes = props.likes;

  function renderTech() {
    if (tech) {
      const technologies = technologiesList.map(
        (technology, index) =>
          // Only render this technology if it is included in technologiesUsed
          tech[technology.id - 1] === "1" && (
            <Item value={technology.name} key={technology.name + index} />
          )
      );
      return technologies;
    }
  }

  return (
    <Card hoverable="true" bg="dark" text="white" className="margin-bottom">
      <Card.Body>
        <Container>
          <Row>
            <Col className="d-flex align-items-start flex-column">
              <h3>
                <GoBook /> {name}
              </h3>
              <h6>{desc}</h6>
            </Col>
            <Col className="d-flex align-items-end flex-column">
              <Button variant="primary" className="margin-bottom">
                <GoPerson /> Follow {followers}
              </Button>
              <Button variant="danger">
                <FaHeart /> Like {likes}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex align-items-start flex-column">
              <h6 style={{ fontSize: "1.1em" }}>
                <FaBuffer />
                Tech Stack
              </h6>
              <ListGroup horizontal>{renderTech()}</ListGroup>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
}
