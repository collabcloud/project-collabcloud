import React from "react";
import {
	Jumbotron,
	Button,
	Container,
	Row,
	Col,
	Image,
	ListGroup,
} from "react-bootstrap";
import { Item } from "./Item";
import logo from "../../harmoney.png";

import "../../css/Project.css";

// Icons for website buttons
import { FaGithub, FaLinkedin, FaDev } from "react-icons/fa";
import { MdWeb, MdSettings } from "react-icons/md";
const github = <FaGithub />;
const website = <MdWeb />;
const linkedin = <FaLinkedin />;
const dev = <FaDev />;

// This component shows an individual project's view
export function ProjectOverview(props) {
	const project = props.projectInformation.project;

	// console.log(props);
	// console.log(" ");
	// console.log(props.toggleSettings);

	const technologiesList = [
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

	let links = [
		{
			name: "GitHub",
			icon: github,
			isProvided: project.githubLink ? true : false,
			value: project.githubLink
		},
		{
			name: "Website",
			icon: website,
			isProvided: project.websiteLink ? true : false,
			value: project.websiteLink
		},
		{
			name: "DevPost",
			icon: dev,
			isProvided: project.devpostLink ? true : false,
			value: project.devpostLink
		},
		{
			name: "LinkedIn",
			icon: linkedin,
			isProvided: project.linkedinLink ? true : false,
			value: project.linkedinLink
		}
	];

	return (
		<Jumbotron>
			<Container>
				<Row>
					<Col xs={4}>
						<Image src={logo} />
					</Col>

					<Col className="d-flex align-items-start flex-column">
						{/* General Project Information */}
						<h1>{project.projectName}</h1>
						<div className="innerbox">
							<p>{project.projectDescription}</p>
						</div>

						{/* List of technologies used for this project */}
						<h4> Technologies Used </h4>
						<ListGroup horizontal>
							{technologiesList.map(
								(technology, index) =>
									// Only render this technology if it is included in technologiesUsed
									project.technologiesUsed[technology.id - 1] === "1" && 
									<Item 
										value={technology.name} 
										key={technology.name+index}
									/>
							)}
						</ListGroup>
						<br />

						{/* List of links to websites for this project */}
						<h4> Links </h4>
						<ListGroup horizontal>
							{links.map((button, index) => (
								// Note: Provided an arbitrary key prop here to both <p> and it's child <Button>
								// This is for React's internals: https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js
								<p className="project-view-links-buttons" key={button+index}>
									<Button
										variant={button.isProvided ? "info" : "outline-info"}
										key={button}
										type="button"
										disabled={!button.isProvided}
										href={button.value}
										target="_blank"
										style = {{ pointerEvents: (button.isProvided ? "" : "none")}}
									>
										{button.icon}
										{button.name}
									</Button>
								</p>
							))}
						</ListGroup>
						<br />
						
						<Row>
							<p className="project-view-submit-buttons">
								{
									props.hasUserJoined ? 
									<Button 
										variant="danger"
										onClick={props.leaveProject}
										disabled={props.userIsProjectOwner}
										style = {{ pointerEvents: (!props.userIsProjectOwner ? "" : "none")}}
									>
										Leave Project
									</Button>
									:
									<Button 
										variant="success"
										onClick={props.requestToJoinProject}
									>
										Request to Join
									</Button>
								}
							</p>

							<p className="project-view-submit-buttons">
								{
									props.hasUserJoined &&
									<Button
										variant="secondary"
										type="button"
										onClick={props.toggleSettings}
										disabled={!props.userIsProjectOwner}
										style = {{ pointerEvents: (props.userIsProjectOwner ? "" : "none")}}
									>
										<MdSettings />
										Settings
									</Button>
								}
							</p>
						</Row>
					</Col>
				</Row>
			</Container>
		</Jumbotron>
	);
}

