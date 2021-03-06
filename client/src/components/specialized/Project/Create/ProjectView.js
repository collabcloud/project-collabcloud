import React from "react";
import { Container } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";

import "../../../../css/ProjectView.css";

export function ProjectView(props) {
  const projects = props.projects;

  return (
    <Container className="project-view">
      {projects.map(function(project, index) {
        return (
          <ProjectCard
            key={index}
            index={index}
            name={project.name}
            description={project.description}
            updateFields={props.updateFields}
          />
        );
      })}
    </Container>
  );
}
