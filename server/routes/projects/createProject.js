const express = require("express");
const axios = require("axios");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const uuidv5 = require('uuid/v5');
const uuid = require("uuid");
const db = require("../../database.js");
require('dotenv').config({ path: './config/.env' });

// @route   POST api/projects/create
// @desc    Allows a user to create a new project
// @access  Public
router.post(
	"/",
	[
		check("projectName", "Project name is required").not().isEmpty(),
		//check("projectName", "Project name must be 20 or less characters").isLength({ max: 20 }),
		check("description", "Project description is required").not().isEmpty(),
		check("isProjectPublic", "Project visibility must be required").isIn(["false", "true"])
		// check("ownerUserID", "The owner of the project is required").not().isEmpty(),
		// check("gitRepoID", "Must provide the ID of the Git repository that this project is associated with").not().isEmpty()
	],
	async (req, res) => {
		try {
			// Use express-validator to validate request
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}

			// TODO: Check if a project using that gitRepoId already exists (Do we want to do this?)

			// Ensures all pid are unique from userid
			const PROJECT_IDS_NAMESPACE = process.env.PROJECT_IDS_NAMESPACE;

			//technologies dict (you can add more technologies here)
			const techDict = {
				"MongoDB": 1,
				"Express": 2,
				"React": 3,
				"Node.js": 4,
				"Python": 5,
				"JavaScript": 6,
				"Java": 7,
				"C++": 8,
				"C#": 9,
				"HTML/CSS": 10,
				"Swift": 11,
				"SQL": 12,
				"MongoDB": 13,
				"Express": 14,
				"React": 15,
				"Angular": 16,
				"VueJS": 17,
				"Flutter": 18,
				"Kubernetes": 19,
				"Jupyter": 20,
				"Pytorch": 21,
				"Numpy": 22,
				"Passport": 23,
				"Kotlin": 24
			}

			// Given the technologies used, construct an encoding string that can be inserted into PSQL
			const technologiesArray = req.body.technologiesUsed
			let techName = technologiesArray.map(tech => tech.name);
			let techArray = [];
			//if you add more technologies into the techDict dictionary, then change the total value of the array
			for (i = 0; i < 24; i++) {
				techArray[i] = 0;
			}

			//encodes the array
			if (techName.length > 0) {
				let techIndex;
				for (techIndex of techName) {
					techArray[techDict[techIndex] - 1] = 1;
				}
			}

			const encodedTech = techArray.join('');

			//links
			let linkArray = req.body.techLinks.map(link => link.value);

			let currentTime = (new Date()).getTime();

			// Generate a unique project ID, using the project name and current time as a hash
			let projectID = uuidv5(req.body.projectName + currentTime, PROJECT_IDS_NAMESPACE);


			// Insert the project into the database
			let projectObject = db.models.project.build({
				pid: projectID,
				// uid: req.body.ownerUserID,
				// gitRepoID: req.body.gitRepoID,
				projectName: req.body.projectName,
				projectDescription: req.body.description,
				isPrivate: (req.body.visibility == "false" ? true : false),
				technologiesUsed: encodedTech,
				githubLink: (linkArray[0] ? linkArray[0] : ""),
				websiteLink: (linkArray[1] ? linkArray[1] : ""),
				devpostLink: (linkArray[2] ? linkArray[2] : ""),
				linkedinLink: (linkArray[3] ? linkArray[3] : "")
			});
			projectObject.toJSON();
			// console.log(projectObject);
			await projectObject.save();
			console.log("The project was saved into the database");

			res.status(200).json({
				result: "Success",
			});
		} catch (err) {
			console.error(err);
			res.status(500).json({ errorMessage: "Internal server error" });
		}
	}
);

module.exports = router;