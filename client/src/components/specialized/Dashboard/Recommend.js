import React from "react";
import { ListGroup, Badge } from "react-bootstrap";

export const Recommendations = ({ projects }) => {
  function renderRecommendations() {
    if (projects && projects.length > 0) {
      const rec_list = projects.map((project, index) => (
        <ListGroup.Item
          variant="secondary"
          key={index}
          action
          href={"/project/" + project.pid}
        >
          {project.projectName}{" "}
          {project.relation.map((rel, index) => (
            <Badge key={index} variant="primary">
              {rel.name}
            </Badge>
          ))}
        </ListGroup.Item>
      ));
      return rec_list;
    }

    return <ListGroup.Item>No recommendations to display.</ListGroup.Item>;
  }

  return <ListGroup>{renderRecommendations()}</ListGroup>;
};
