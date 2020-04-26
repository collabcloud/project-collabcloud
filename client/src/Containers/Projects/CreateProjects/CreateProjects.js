import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import ReactTags from "react-tag-autocomplete";
import NavigationBar from "../../../components/specialized/Nav/NavigationBar";
import { ProjectView } from "../../../components/specialized/Project/Create/ProjectView";
import { ItemsList } from "../../../components/base/ItemsList";

import { FaGithub, FaLinkedin, FaDev } from "react-icons/fa";
import { MdWeb } from "react-icons/md";

// Redux Imports
import { connect } from "react-redux"; // connects the CreateProjects component to the Redux store
import { addProject } from "../../../actions/projectActions";
import { setAlert } from "../../../actions/alert";
import { getGithubRepos } from "../../../actions/githubActions";
import PropTypes from "prop-types";

import "../../../css/CreateProjects.css";
import techSuggestionsArray from "../../../utils/techSuggestions";

const github = <FaGithub />;
const website = <MdWeb />;
const linkedin = <FaLinkedin />;
const dev = <FaDev />;

const CreateProjects = (props) => {
  const {
    addProject,
    setAlert,
    getGithubRepos,
    isLoading,
    githubRepos,
    ownerId,
    username,
  } = props;

  let githubUsername = username;
  const techSuggestions = techSuggestionsArray;

  // Initialize state hooks
  const [name, setName] = useState("");
  const [tech, setTech] = useState([]);
  const [desc, setDesc] = useState("");
  const [isProjectPublic, setVisibilityPublic] = useState(true);
  const [githubStars, setStars] = useState("");
  const [links, setLinks] = useState([
    {
      name: "Github",
      icon: github,
      placeholder: "Enter your project's GitHub URL here",
      value: "",
    },
    {
      name: "Website",
      icon: website,
      placeholder: "Enter your project's website URL here",
      value: "",
    },
    {
      name: "DevPost",
      icon: dev,
      placeholder: "Enter your project's DevPost URL here",
      value: "",
    },
    {
      name: "LinkedIn",
      icon: linkedin,
      placeholder: "Enter your project's LinkedIn URL here",
      value: "",
    },
  ]);

  const [projects, setProjects] = useState([
    {
      name: "Example-Project",
      description: "Hi! This is literally just an example description",
      isProjectPublic: true,
      githubStars: 0,
      links: [
        {
          name: "Github",
          icon: github,
          placeholder: "Enter your project's GitHub URL here",
          value: "",
        },
        { name: "Website", icon: website, value: "https://www.example.org/" },
        {
          name: "DevPost",
          icon: dev,
          placeholder: "Enter your project's DevPost URL here",
          value: "",
        },
        {
          name: "LinkedIn",
          icon: linkedin,
          placeholder: "Enter your project's LinkedIn URL here",
          value: "",
        },
      ],
      tech: [{ id: 3, name: "React" }],
    },
  ]);
  const history = useHistory();

  // Load this user's GitHub repos
  useEffect(() => {
    // Populate the Redux store with this user's GitHub repos
    getGithubRepos({ githubUsername, repoVisibility: "all" });
  }, [githubUsername]);

  // Runs whenever any of the specified props (isLoading, githubRepos) are updated
  useEffect(() => {
    // Use githubRepos (state from store) to get projects that we can use with setProjects
    if (isLoading === false) {
      let projectsToDisplay = [...projects]; // preserve the pre-existing projects
      for (let i = 0; i < githubRepos.length; i++) {
        let project = {
          name: githubRepos[i].repo_name,
          description: githubRepos[i].repo_description,
          isProjectPublic: !githubRepos[i].repo_visibility_is_private,
          githubStars: githubRepos[i].github_stars,
          tech: [{ id: 1, name: githubRepos[i].repo_main_technology }],
          links: [
            {
              name: "Github",
              icon: github,
              value: githubRepos[i].github_url,
            },
            {
              name: "Website",
              icon: website,
              placeholder: "Enter your project's website URL here",
              value: "",
            },
            {
              name: "DevPost",
              icon: dev,
              placeholder: "Enter your project's DevPost URL here",
              value: "",
            },
            {
              name: "LinkedIn",
              icon: linkedin,
              placeholder: "Enter your project's LinkedIn URL here",
              value: "",
            },
          ],
        };
        projectsToDisplay.push(project);
      }

      // Update projects state by calling setProjects
      setProjects(projectsToDisplay);
    }
  }, [githubRepos, isLoading]); // this effect runs again whenever the elements in this dependency array change
  // WARNING: Even though the React compiler warns about this above line, DO NOT add the 'projects' dependency

  function handleAddition(tag) {
    if (tech.some((tech_tag) => tech_tag.id !== tag.id) || tech.length === 0) {
      const technologies = [].concat(tech, tag);
      setTech(technologies);
    }
  }

  function handleDelete(i) {
    const technologies = tech.slice(0);
    technologies.splice(i, 1);
    setTech(technologies);
  }

  function updateLink(index, value) {
    const new_links = [...links];
    let item = new_links[index];
    item.value = value;
    setLinks(new_links);
  }

  // When you click on the card in the slider, populates all the text fields
  function updateFields(index) {
    const project = projects[index];
    setName(project.name);
    setDesc(project.description);
    setVisibilityPublic(project.isProjectPublic);
    setLinks(project.links);
    setTech(project.tech);
    setStars(project.githubStars);
  }

  // When the user clicks on "Submit", sends this project over to the back-end
  function onSubmit(e) {
    e.preventDefault();
    // TODO: look into why setAlert is not working
    if (name.length === 0 || desc.length === 0 || desc.length > 1000) {
      setAlert(
        "Please ensure that the inputs are filled out correctly",
        "danger"
      );
      return;
    }
    addProject({
      name,
      desc,
      isProjectPublic,
      ownerId,
      tech,
      githubStars,
      links,
    });
    // Redirect to the explore page
    history.push("/explore");
  }

  return (
    <div>
      <NavigationBar />
      <Container
        fluid
        className="col-md-8 align-items-start"
        style={{ paddingTop: "50px" }}
      >
        <Form onSubmit={onSubmit}>
          <div className="d-flex align-items-start flex-column">
            <h4 className="createtitle">Create a new project</h4>

            <p>
              Select one of your existing repositories from GitHub (optional)
            </p>
            <ProjectView projects={projects} updateFields={updateFields} />

            <p className="createfont">Project Name</p>
            <Form.Control
              type="text"
              size="sm"
              className="item"
              value={name}
              name="project_name"
              onChange={(e) => setName(e.target.value)}
            />

            <p className="createfont">It's built with</p>
            <ReactTags
              className="item"
              tags={tech}
              suggestions={techSuggestions}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
            />

            <p className="createfont">Description</p>
            <Form.Control
              as="textarea"
              rows="3"
              className="item"
              value={desc ? desc : ""}
              name="description"
              onChange={(e) => setDesc(e.target.value)}
            />
            <p className="createfont">Project Visibility</p>
            <Form.Group className="item">
              <Form.Check
                name="publicVisibility"
                type="radio"
                checked={isProjectPublic}
                // value="public"
                label="Public"
                onChange={(e) => setVisibilityPublic(true)}
              />
              <Form.Check
                name="privateVisibility"
                checked={!isProjectPublic}
                type="radio"
                // value="private"
                label="Private"
                onChange={(e) => setVisibilityPublic(false)}
              />
            </Form.Group>
            <p className="createfont">Links</p>
            <ItemsList className="item" items={links} updateLink={updateLink} />
            <Button className="submit-reg-bt" variant="success" type="submit">
              Submit
            </Button>
            <br />
          </div>
        </Form>
      </Container>
    </div>
  );
};

// Gives our Project component access to the redux dispatch functions
function mapDispatchToProps(dispatch) {
  return {
    addProject: (
      name,
      desc,
      isProjectPublic,
      ownerId,
      tech,
      githubStars,
      links
    ) => {
      dispatch(
        addProject(
          name,
          desc,
          isProjectPublic,
          ownerId,
          tech,
          githubStars,
          links
        )
      );
    },
    getGithubRepos: ({ githubUsername, repoVisibility }) => {
      dispatch(getGithubRepos({ githubUsername, repoVisibility }));
    },
    setAlert: (message, alertType) => {
      dispatch(setAlert(message, alertType));
    },
  };
}

// List of dispatch functions that will be available to the component
CreateProjects.propTypes = {
  addProject: PropTypes.func.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

// Transforms Redux store state into the props for this CreateProjects component
// This function is called whenever the store state changes
const mapStateToProps = (state) => {
  return {
    githubRepos: state.github.githubReposFromState,
    isLoading: state.github.loading,
    ownerId: state.login.profile.uid,
    username: state.login.profile.username,
  };
};

// Provides this React component with the given dispatch functions, and maps Redux store state to component props
export default connect(mapStateToProps, mapDispatchToProps)(CreateProjects);
