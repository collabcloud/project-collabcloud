import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import ReactTags from "react-tag-autocomplete";
import { NavigationBar } from "../../../components/base/NavigationBar";
import { ProjectView } from "../../../components/specialized/ProjectView";
import { ItemsList }  from "../../../components/base/ItemsList";

import { FaGithub, FaLinkedin, FaDev } from 'react-icons/fa';
import { MdWeb } from 'react-icons/md'; 

// Redux Imports
import { connect } from "react-redux"; // connects the CreateProjects component to the Redux store
import { addProject } from "../../../actions/projectActions";
import { getGithubRepos } from "../../../actions/githubActions";
import PropTypes from "prop-types";

import "../../../css/CreateProjects.css";

const github = <FaGithub/>;
const website = <MdWeb/>;
const linkedin = <FaLinkedin/>;
const dev = <FaDev />;

const CreateProjects = ({ addProject, getGithubRepos }, githubRepos) => {
  // When the component mounts (ie. when the page loads), populate the store with this user's GitHub repos
  useEffect(() => {
    const githubUsername = "matthuynh"; // todo: Get this value from state (GitHub username associated to whoever is currently logged in)
    const repoVisibility = "public"; // todo: Get this value from the form (?)

    getGithubRepos({ githubUsername, repoVisibility });
  });

  // TODO: Update the state here with the data that is in the store
  // https://reactjs.org/docs/hooks-state.html
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
  
  // When you click on the card in the carousel, populates all the text fields
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
      projectName: name,
      tech: tech,
      desc: desc,
      visibility: visibility,
      links: links
    };

    addProject({ name });
  }

  // console.log("githubRepos is");
  // console.log(githubRepos);

  return (
    <div>
      <NavigationBar />
      <Container fluid className="col-md-8 align-items-start" style={{paddingTop: "50px"}}>
        <Form onSubmit={onSubmit}> 
          <div className="d-flex align-items-start flex-column">
              <h4>Create a new project</h4>
  
              <p>Select an Existing Repo (optional)</p>
              {/* TODO: Pass in githubRepos */}
              <ProjectView projects={projects} updateFields={updateFields}/>

              {/* <p>
                ${githubRepos}
              </p> */}
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
                className="submit-reg-bt"
                variant="success"
                type="submit"

              >
                Submit
              </Button>
              <br/>
              </div>
        </Form>
      </Container>
    </div>
  );
}

CreateProjects.propTypes = {
  addProject: PropTypes.func.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
};

// Transforms Redux store state into the props for this CreateProjects component
// This function is called whenever the store state changes
const mapStateToProps = (state) => {
  // https://redux.js.org/basics/usage-with-react#implementing-container-components
  // console.log("in mapStateToProps");
  // console.log(state.github);
  // console.log(state.github.githubReposFromState);
  
  return {
    githubRepos: state.github.githubReposFromState
  };
}

// https://react-redux.js.org/api/connect#options-object
export default connect(mapStateToProps, { addProject, getGithubRepos })(CreateProjects);
