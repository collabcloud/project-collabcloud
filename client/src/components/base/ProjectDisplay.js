import React from "react";
import ProjectBox from "./ProjectBox";

export default function ProjectDisplay() {

  const projects = [
    {
      name: "Example-Project",
      desc: "Hi! This is literally just an example description",
      tech: [
      { id: 1, name: "MongoDB" },
      { id: 2, name: "Express" },
      { id: 3, name: "React" },
      { id: 4, name: "Node.js" }
      ],
      followers: 40,
      likes: 20
    },
    {
      name: "Harmoney",
      desc: "Streamlined group payments solution",
      tech: [
      { id: 1, name: "MongoDB" },
      { id: 2, name: "Express" },
      { id: 3, name: "React" },
      { id: 4, name: "Node.js" }
      ],
      followers: 469,
      likes: 200
    }
  ];
  
  return (
    <div>
      {projects.map(function(project, index) {
        return (<ProjectBox key={index} name={project.name} desc={project.desc} tech={project.tech}
          followers={project.followers} likes={project.likes}/>)
      })}
    </div>
  );
}

