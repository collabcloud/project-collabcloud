import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
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

  const [projects, setProjects] = useState([

    {name: 'Optimize.me',
    description: 'U of T Timetable Optimizer',
    visibility: false,
    tech: [{id: 1, name: 'MongoDB'}, {id: 2, name: 'Express'}, {id: 3, name: 'React'}, 
    {id: 4, name: 'Node.js'}],

    links: [{name: 'Github', icon: github, value: 'https://github.com/jcserv/optimize-me'},
    {name: 'Website', icon: website, value: 'https://optimize.me'},
    {name: 'DevPost', icon: dev, value: ''},
    {name: 'LinkedIn', icon: linkedin, value: ''}]
    },

    {name: 'CollabCloud',
    description: 'A social network platform for collaborating on software projects',
    visibility: true,
    tech: [{id: 1, name: 'PostgreSQL'}, {id: 2, name: 'Express'}, {id: 3, name: 'React'}, 
    {id: 4, name: 'Node.js'}],
    links: [{name: 'Github', icon: github, value: 'https://github.com/UTMCSC301/project-collabcloud'},
    {name: 'Website', icon: website, value: 'https://collabcloud.io'},
    {name: 'DevPost', icon: dev, value: ''},
    {name: 'LinkedIn', icon: linkedin, value: ''}]
    },

    {name: 'Harmoney',
    description: 'Streamlined group payments solution',
    visibility: true,
    tech: [{id: 1, name: 'MongoDB'}, {id: 2, name: 'Express'}, {id: 3, name: 'React'}, 
    {id: 4, name: 'Node.js'}],
    links: [{name: 'Github', icon: github, value: 'https://github.com/huynhmat/harmoney'},
    {name: 'Website', icon: website, value: ''},
    {name: 'DevPost', icon: dev, value: 'https://devpost.com/software/harmoney-ci42yp'},
    {name: 'LinkedIn', icon: linkedin, value: ''}]},

    {name: 'VapeSafe',
    description: 'Automatic vape limiter',
    visibility: true,
    tech: [{id: 1, name: 'Android'}, {id: 2, name: 'Arduino'}],
    links: [{name: 'Github', icon: github, value: 'https://github.com/leviaviv28/VapeSafe-EngHack2019'},
    {name: 'Website', icon: website, value: 'http://vapesafer.net/'},
    {name: 'DevPost', icon: dev, value: 'https://devpost.com/software/vapesafe/'},
    {name: 'LinkedIn', icon: linkedin, value: ''}]},

  ]);

  const [name, setName] = useState("");
  const [tech, setTech] = useState([]);
  const [desc, setDesc] = useState("");
  const [visibility, setVisibility] = useState(false);

  const [links, setLinks] = useState( [
    {name: 'Github', icon: github, value: ''},
    {name: 'Website', icon: website, value: ''},
    {name: 'DevPost', icon: dev, value: ''},
    {name: 'LinkedIn', icon: linkedin, value: ''}
  ]);

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
  
  function updateFields(index) {
    const project = projects[index];
    setName(project.name);
    setDesc(project.description);
    setVisibility(project.visibility);
    setLinks(project.links);
    setTech(project.tech);
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
  }

  return (
    <div>
      <NavigationBar />
      <Container fluid className="col-md-8 align-items-start" style={{paddingTop: "50px"}}>
        <Form onSubmit={onSubmit}> 
          <div className="d-flex align-items-start flex-column">
              <h4>Create a new project</h4>
  
              <p>Select an Existing Repo (optional)</p>
              <ProjectView projects={projects} updateFields={updateFields}/>
              <p>Project Name</p>
              <Form.Control
                type="text"
                size="sm"
                className="item"
                value={name}
                name="project_name"
                onChange={e => setName(e.target.value)}
              />
              <p>It's built with</p>
              <ReactTags
                className="item"
                tags={tech}
                suggestions={tech_suggestions}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
              />
          
          
              <p>Description</p>
              <Form.Control
                as="textarea"
                rows="3"
                className="item"
                value={desc}
                name="description"
                onChange={e => setDesc(e.target.value)}
              />
              <p>Visibility</p>
              <Form.Group className="item">
                <Form.Check
                  name="visibility"
                  type="radio"
                  checked={visibility}
                  value={true}
                  label="Public"
                  onChange={e => setVisibility(e.target.value)}
                />
                <Form.Check
                  name="visibility"
                  checked={!visibility}
                  type="radio"
                  value={false}
                  label="Private"
                  onChange={e => setVisibility(e.target.value)}
                />
              </Form.Group>
              <p>Links</p>
              <ItemsList className="item" items={links} updateLink={updateLink}/>
              <Button
                className="button"
                variant="success"
                type="submit"

              >
                Submit
              </Button>
              </div>
        </Form>
      </Container>
    </div>
  );
}
