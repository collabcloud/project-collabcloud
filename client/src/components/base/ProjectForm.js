import React, { useState, useEffect } from "react";
import {
	Jumbotron,
	Button,
	Container,
	Row,
	Col,
	Image,
  ListGroup,
  Form
} from "react-bootstrap";
import { ItemsList } from "./ItemsList";
import { Item } from "./Item";
import ReactTags from "react-tag-autocomplete";
import logo from "../../harmoney.png";

import "../../css/Project.css"; 
import { getProjectInformation } from "../../actions/projectActions";

// This component shows an individual project's view
export function ProjectForm(props) {
  const project = props.projectInformation.project;

  // Initialize state hooks
	const [name, setName] = useState("");
	const [tech, setTech] = useState([]);
	const [desc, setDesc] = useState("");
  const [isProjectPublic, setVisibilityPublic] = useState(true);
  

  const tech_suggestions = [
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
		{ id: 24, name: "Kotlin" },
	];

  // TODO: useHistory()?


  // When the user clicks on "Submit", sends this project over to the back-end
	function onSubmit(e) {
		e.preventDefault();
		
    
        console.log("Clicked on Submit");
	}

  return (
		<div>
      <Container
				fluid
				className="col-md-8 align-items-start"
				style={{ paddingTop: "50px" }}
			>
        <h4 className="createtitle">Your project</h4>

				<Form onSubmit={onSubmit}>
					<div className="d-flex align-items-start flex-column">

						<p className="createfont">Project Name</p>

						<Form.Control
							type="text"
							size="sm"
							className="item"
							value={project.projectName}
              name="project_name"
              disabled
							// onChange={e => setName(e.target.value)}
						/>

            <p className="createfont">Description</p>
            <Form.Control
              as="textarea"
              rows="3"
              className="item"
              value={project.projectDescription}
              name="description"
              // onChange={e => setDesc(e.target.value)}
            />

            <p className="createfont">Project Visibility</p>
						<Form.Group className="item">
							<Form.Check
								name="publicVisibility"
								type="radio"
								checked={!project.isPrivate}
								// value="public"
								label="Public"
								// onChange={e => setVisibilityPublic(true)}
							/>
							<Form.Check
								name="privateVisibility"
								checked={project.isPrivate}
								type="radio"
								// value="private"
								label="Private"
								// onChange={e => setVisibilityPublic(false)}
							/>
						</Form.Group>

						<p className="createfont">It's built with</p>
						<ReactTags
							className="item"
							// tags={tech}
							// suggestions={tech_suggestions}
							// handleDelete={handleDelete}
							// handleAddition={handleAddition}
						/>

						<p className="createfont">Links</p>
						{/* <ItemsList
							className="item"
							items={links}
							updateLink={updateLink}
						/> */}

						<Button
							className="submit-reg-bt"
							variant="success"
							type="submit"
						>
							Update
						</Button>
						<br />
					</div>
				</Form>
			</Container>
		</div>
	);
}
