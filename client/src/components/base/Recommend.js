import React from "react";
import { ListGroup, Badge } from "react-bootstrap";

export const Recommendations = ({ projects }) => {
  function renderRecommendations() {
    if (projects && projects.length > 0) {
      const rec_list = projects.map((object, index) => (
        <ListGroup.Item
          variant="secondary"
          key={index}
          action
          href={"/project/" + object.pid}
        >
          {object.projectName}{" "}
          {object.relation.map((value, index) => (
            <Badge key={index} variant="primary">
              {value}
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
