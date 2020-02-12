const express = require("express");
const axios = require("axios");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const uuidv5 = require('uuid/v5');
const uuid = require("uuid");
// const db = require('../../server.js'); // TODO: figure out how to import properly here
const db = require("../../database.js");

// @route   POST api/projects/createProject
// @desc    Allows a user to create a new project
// @access  Public
router.post(
	"/",
	[	
		check("projectName", "Project name is required").not().isEmpty()
		// check("projectName", "Project name must be 20 or less characters").isLength({ max: 20}),
		// check("description", "Project description is required").not().isEmpty(),
		// check("visibility", "Project visibility must be required").isIn(["private", "public"]),
		// check("ownerUserID", "The owner of the project is required").not().isEmpty(),
		// check("gitRepoID", "Must provide the ID of the Git repository that this project is associated with").not().isEmpty()
	],
	async (req, res) => {
		try {
			// Use express-validator to validate request
			// const errors = validationResult(req);
			// if (!errors.isEmpty()) {
			// 	return res.status(422).json({ errors: errors.array() });
			// }

			// TODO: Check if a project using that gitRepoId already exists (Do we want to do this?)

			// TODO: Move this to index.js or something
			const PROJECT_IDS_NAMESPACE = "1b671a64-40d5-491e-99b0-da01ff1f3341";

			// Given the technologies used, construct an array format that can be inserted into PSQL
			// let technologiesArray = (req.body.technologiesUsed).split(",");
			// console.log(technologiesArray);
			// let technologiesPSQLArrayString = "{";
			// technologiesArray.forEach(technology => technologiesPSQLArrayString = technologiesPSQLArrayString + technology + ",");
			// technologiesPSQLArrayString = technologiesPSQLArrayString.substr(0, technologiesPSQLArrayString.length - 1) + "}";
			// console.log(technologiesPSQLArrayString);

			let currentTime = (new Date()).getTime();

			// Generate a unique project ID, using the project name and current time as a hash
			// let projectID = uuidv5(req.body.projectName + currentTime, PROJECT_IDS_NAMESPACE);

			projectID = uuid();


			// Insert the project into the database
			// const user = db.models.user.create( { username: "haha1234", password: "password1234"});
			let projectObject = db.models.project.build({
				pid: projectID,
				// uid: req.body.ownerUserID,
				// gitRepoID: req.body.gitRepoID,
				projectName: req.body.projectName,
				// projectDescription: req.body.description,
				// isPrivate: (req.body.visibility == "private" ? true : false),
				// TODO: Figure out how to add arrays
				// technologiesUsed: (technologiesPSQLArrayString.length > 1 ? technologiesPSQLArrayString : {}),
				// githubLink: (req.body.githubLink ? req.body.githubLink : ""),
				// websiteLink: (req.body.websiteLink ? req.body.websiteLink : ""),
				// devpostLink: (req.body.devpostLink ? req.body.devpostLink : ""),
				// linkedinLink: (req.body.linkedinLink ? req.body.linkedinLink : "")
			});
			projectObject.toJSON();
			// console.log(projectObject);
			await projectObject.save();
			console.log("The project was saveed into the database");

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