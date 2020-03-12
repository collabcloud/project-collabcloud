import React, { useState } from "react";
import {
	Button,
	Container,
	Row,
	Form
} from "react-bootstrap";
import { ItemsList } from "./ItemsList";
import { FaGithub, FaLinkedin, FaDev } from 'react-icons/fa';
import { MdWeb } from 'react-icons/md';
import ReactTags from "react-tag-autocomplete";

import "../../css/Project.css";

const github = <FaGithub />;
const website = <MdWeb />;
const linkedin = <FaLinkedin />;
const dev = <FaDev />;

// This component shows an individual project's view
export function ProjectForm(props) {
	const projectData = props.projectInformation.project;

	// TODO: Require this list from an external JS file
	// List of tech suggestion tags
	const techSuggestions = [
		{ id: 1, name: "MongoDB" },
		{ id: 2, name: "Express" },
		{ id: 3, name: "React" },
		{ id: 4, name: "Node.js" },
		{ id: 5, name: "Python" },
		{ id: 6, name: "JavaScript" },
		{ id: 7, name: "Java" },
		{ id: 8, name: "C++" },
		{ id: 9, name: "C#" },
		{ id: 10, name: "HTML/CSS" },
		{ id: 11, name: "Swift" },
		{ id: 12, name: "SQL" },
		{ id: 13, name: "MongoDB" },
		{ id: 14, name: "Express" },
		{ id: 15, name: "React" },
		{ id: 16, name: "Angular" },
		{ id: 17, name: "VueJS" },
		{ id: 18, name: "Flutter" },
		{ id: 19, name: "Kubernetes" },
		{ id: 20, name: "Jupyter" },
		{ id: 21, name: "Pytorch" },
		{ id: 22, name: "Numpy" },
		{ id: 23, name: "Passport" },
		{ id: 24, name: "Kotlin" }
	];

	// Decodes the encoded technologiesUsed string into its corresponding list of technologies
	const decodeTechUsed = () => {
		let techUsed = [];
		let encodedArray = projectData.technologiesUsed.split("");
		for (let i = 0; i < encodedArray.length; i++) {
			if (encodedArray[i] !== "0") {
				techUsed.push({ id: i+1, name: techSuggestions[i].name})
			}
		}
		return techUsed;
	}
	
	// Each field in the form needs their own state, which is updated as the field is mutated
	const [projectName, setProjectName] = useState(projectData.projectName);
	const [projectDescription, setProjectDescription] = useState(projectData.projectDescription);
	const [isProjectPublic, setVisibilityPublic] = useState(!projectData.isPrivate);
	const [tech, setTech] = useState(decodeTechUsed());
	const [links, setLinks] = useState([
		{ name: "Github", icon: github, value: projectData.githubLink },
		{ name: "Website", icon: website, value: projectData.websiteLink },
		{ name: "DevPost", icon: dev, value: projectData.devpostLink },
		{ name: "LinkedIn", icon: linkedin, value: projectData.linkedinLink }
	]);

	// When the user clicks on "Submit", updates this project from the back-end
	const onSubmit = (e) => {
		e.preventDefault();
		let pid = projectData.pid;

		// Calls the updateProject() function from our parent
		props.updateThisProject({
			pid,
			projectName,
			projectDescription,
			isProjectPublic,
			tech,
			links
		})

		// Redirect user back to the user information page
		props.toggleSettings();
	}

	// When the user clicks on "Delete", delete this project from the back-end
	const deleteProject = () => {
		// Calls the deleteProject() function from our parent
		props.deleteThisProject(projectData.pid);

		// Redirect user back to the user information page
		props.toggleSettings();
	}

	// Used to update state of links list
	const updateLink = (index, value) => {
		const new_links = [...links];
		var item = new_links[index];
		item.value = value;
		setLinks(new_links);
	}

	// Used to handle the addition of a technology tag
	const handleAddition = (tag) => {
		const technologies = [].concat(tech, tag);
		setTech(technologies);
	}

	// Used to handle the deletion of a technology tag
	const handleDelete = (i) => {
		const technologies = tech.slice(0);
		technologies.splice(i, 1);
		setTech(technologies);
	}

	return (
		<div>
			<Container
				fluid
				className="col-md-8 align-items-start"
				style={{ paddingTop: "50px" }}
			>
				<h4 className="createtitle">Modifying Project</h4>

				<Form onSubmit={onSubmit}>
					<div className="d-flex align-items-start flex-column">
						<p className="createfont">Project Name</p>

						<Form.Control
							type="text"
							size="sm"
							className="item"
							value={projectName}
							name="project_name"
							disabled // we currently do not allow Project names to be changed
							onChange={e => setProjectName(e.target.value)}
						/>

						<p className="createfont">Description</p>
						<Form.Control
							as="textarea"
							rows="3"
							className="item"
							value={projectDescription}
							name="description"
							onChange={e => setProjectDescription(e.target.value)}
						/>

						<p className="createfont">Project Visibility</p>
						<Form.Group className="item">
							<Form.Check
								name="publicVisibility"
								type="radio"
								checked={isProjectPublic}
								value="public"
								label="Public"
								onChange={e => setVisibilityPublic(true)}
							/>
							<Form.Check
								name="privateVisibility"
								checked={!isProjectPublic}
								type="radio"
								value="private"
								label="Private"
								onChange={e => setVisibilityPublic(false)}
							/>
						</Form.Group>

						<p className="createfont">It's built with</p>
						<ReactTags
							className="item"
							tags={tech}
							suggestions={techSuggestions}
							handleDelete={handleDelete}
							handleAddition={handleAddition}
						/>

						<p className="createfont">Links</p>
						<ItemsList
							className="item"
							items={links}
							updateLink={updateLink}
						/>

						<Row>
							<p className="project-view-submit-buttons">
								<Button
									variant="primary"
									type="submit"
								>
									Update
								</Button>
							</p>
							<p className="project-view-submit-buttons">
								<Button
									variant="outline-dark"
									onClick={props.toggleSettings}
								>
									Cancel
								</Button>
							</p>
							<p className="project-view-submit-buttons">
								<Button
									variant="outline-danger"
									onClick={deleteProject}
								>
									Delete
								</Button>
							</p>
						</Row>
						<br />
					</div>
				</Form>
			</Container>
		</div>
	);
}
