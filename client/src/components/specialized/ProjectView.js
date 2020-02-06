import React from 'react';
import { Container } from 'react-bootstrap';
import { ProjectCard } from '../base/ProjectCard';

import '../../css/ProjectView.css';

export function ProjectView(props) {

  const projects = [
    {name: 'Optimize.me',
    description: 'U of T Timetable Optimizer'},
    {name: 'CollabCloud',
    description: 'A social network platform for collaborating on software projects'},
    {name: 'Harmoney',
    description: 'Streamlined group payments solution'},
    {name: 'VapeSafe',
    description: 'Automatic vape limiter'},
    {name: 'Tinder4PxRN',
    description: 'uwu'},
    {name: 'rip kobe',
    description: 'Helicopter missile strike system'}
  ];

  return (
    <Container className="project-view">
      {projects.map(function(project) {
        return (<ProjectCard name={project.name} description={project.description}/>)
      })}
    </Container>);
}