import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import ReactTags from "react-tag-autocomplete";
import { NavigationBar } from "../../../components/base/NavigationBar";
import { ProjectView } from "../../../components/specialized/ProjectView";
import { ItemsList } from "../../../components/base/ItemsList";

import { FaGithub, FaLinkedin, FaDev } from "react-icons/fa";
import { MdWeb } from "react-icons/md";

// Redux Imports
import { connect } from "react-redux"; // connects the CreateProjects component to the Redux store
import { addProject } from "../../../actions/projectActions";
import { getGithubRepos } from "../../../actions/githubActions";
import PropTypes from "prop-types";

import "../../../css/CreateProjects.css";

const github = <FaGithub />;
const website = <MdWeb />;
const linkedin = <FaLinkedin />;
const dev = <FaDev />;

const CreateProjects = ({ addProject, getGithubRepos, isLoading, githubRepos}) => {
	// ONLY runs once, which is when the component mounts (ie. when the page first loads)
	useEffect(() => {
		const githubUsername = "matthuynh"; // todo: Get this value from state (GitHub username associated to whoever is currently logged in)
		const repoVisibility = "public"; // todo: Get this value from the form (?)

		// Populate the Redux store with this user's GitHub repos
		getGithubRepos({ githubUsername, repoVisibility });
		
  }, []);
  // FIXME: This empty [] ensures that useEffect() does not run forever
  // https://stackoverflow.com/questions/53976474/why-react-hook-useeffect-runs-endlessly
  // https://stackoverflow.com/questions/53243203/react-hook-useeffect-runs-continuously-forever-infinite-loop

  // Runs whenever any of the specified props (isLOading, githubRepos) are updated
  useEffect(() => {
    // Use githubRepos (state from store) to get projects that we can use with setProjects
    if (isLoading == false) {
      let projectsToDisplay = [...projects]; // preserve the pre-existing projects
      
      // TODO: Improve how the tech array works
      for (let i = 0; i < githubRepos.length; i++) {
        let project = {
          name: githubRepos[i].repo_name,
          description: githubRepos[i].repo_description,
          visibility: !githubRepos[i].repo_visibility_is_private,
          tech: [
            { id: 1, name: "JavaScript"}
          ],
          links: [
            {
              name: "Github",
              icon: github,
              value: githubRepos[i].github_url
            }
          ]
        };
        projectsToDisplay.push(project);
      }

      // Update projects state by calling setProjects
      setProjects(projectsToDisplay);
    }

  }, [githubRepos, isLoading]);
  // "The function given as first argument to useEffect will run every time any of the elements in the array given as second argument change, so you can put the props in this array to make it run again when any of the props change." https://stackoverflow.com/questions/55284905/is-it-possible-to-only-run-useeffect-on-props-change-but-not-state-change


	// https://reactjs.org/docs/hooks-state.html
	const [projects, setProjects] = useState([
		{
			name: "Harmoney",
			description: "Streamlined group payments solution",
			visibility: true,
			tech: [
				{ id: 1, name: "MongoDB" },
				{ id: 2, name: "Express" },
				{ id: 3, name: "React" },
				{ id: 4, name: "Node.js" }
			],
			links: [
				{
					name: "Github",
					icon: github,
					value: "https://github.com/huynhmat/harmoney"
				},
				{ name: "Website", icon: website, value: "" },
				{
					name: "DevPost",
					icon: dev,
					value: "https://devpost.com/software/harmoney-ci42yp"
				},
				{ name: "LinkedIn", icon: linkedin, value: "" }
			]
		},

		{
			name: "VapeSafe",
			description: "Automatic vape limiter",
			visibility: true,
			tech: [
				{ id: 1, name: "Android" },
				{ id: 2, name: "Arduino" }
			],
			links: [
				{
					name: "Github",
					icon: github,
					value: "https://github.com/leviaviv28/VapeSafe-EngHack2019"
				},
				{
					name: "Website",
					icon: website,
					value: "http://vapesafer.net/"
				},
				{
					name: "DevPost",
					icon: dev,
					value: "https://devpost.com/software/vapesafe/"
				},
				{ name: "LinkedIn", icon: linkedin, value: "" }
			]
		}
	]);

	const [name, setName] = useState("");
	const [tech, setTech] = useState([]);
	const [desc, setDesc] = useState("");
	const [visibility, setVisibility] = useState(false);

	const [links, setLinks] = useState([
		{ name: "Github", icon: github, value: "" },
		{ name: "Website", icon: website, value: "" },
		{ name: "DevPost", icon: dev, value: "" },
		{ name: "LinkedIn", icon: linkedin, value: "" }
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
						<h4>Create a new project</h4>

						<p>Select an Existing Repo (optional)</p>
						<ProjectView
							projects={projects}
							updateFields={updateFields}
						/>

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
						<ItemsList
							className="item"
							items={links}
							updateLink={updateLink}
						/>
						<Button
							className="submit-reg-bt"
							variant="success"
							type="submit"
						>
							Submit
						</Button>
						<br />
					</div>
				</Form>
			</Container>
		</div>
	);
};

CreateProjects.propTypes = {
	addProject: PropTypes.func.isRequired,
	getGithubRepos: PropTypes.func.isRequired
};

// Transforms Redux store state into the props for this CreateProjects component
// This function is called whenever the store state changes
const mapStateToProps = state => {
	// https://redux.js.org/basics/usage-with-react#implementing-container-components
	// console.log("in mapStateToProps");
	// console.log(state.github);
  console.log(state.github.githubReposFromState);
  console.log(state.github.githubReposFromState[0]);
  console.log(state.github.loading);

	return {
    githubRepos: state.github.githubReposFromState,
    isLoading: state.github.loading
	};
};

// https://react-redux.js.org/api/connect#options-object
export default connect(mapStateToProps, { addProject, getGithubRepos })(CreateProjects);
