const express = require("express");
const axios = require("axios");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const uuidv5 = require('uuid/v5');

// @route   POST api/projects/createProject
// @desc    Allows a user to create a new project
// @access  Public
router.post(
	"/createProject",
	[	
		check("projectName", "Project name is required").not().isEmpty(),
		check("projectName", "Project name must be 20 or less characters").isLength({ max: 20}),
		check("description", "Project description is required").not().isEmpty(),
		check("visibility", "Project visibility must be required").isIn(["private", "public"]),
		check("ownerUserID", "The owner of the project is required").not().isEmpty(),
		check("gitRepoID", "Must provide the ID of the Git repository that this project is associated with").not().isEmpty()
	],
	async (req, res) => {
		try {
			// Use express-validator to validate request
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}

			// TODO: Check if a project using that gitRepoId already exists (Do we want to do this?)

			// TODO: Move this to index.js or something
			const PROJECT_IDS_NAMESPACE = "1b671a64-40d5-491e-99b0-da01ff1f3341";

			// Given the technologies used, construct an array format that can be inserted into PSQL
			let technologiesPSQLArrayString = "{";
			for (technology in req.body.technologiesUsed) {
				technologiesPSQLArray = technologiesPSQLArray + technology + ",";
			}
			technologiesPSQLArrayString[-1] = "}"

			let currentTime = (new Date()).getTime();

			// Generate a unique project ID, using the project name and current time as a hash
			let projectID = uuidv5(req.body.projectName + currentTime, PROJECT_IDS_NAMESPACE);

			// Insert the project into the database // TODO: Relies on Mike's database code
			const projectObject = db.build({
				pid: projectID,
				uid: req.body.ownerUserID,
				gitRepoID: req.body.gitRepoID,
				projectName: req.body.projectName,
				projectDescription: req.body.description,
				hasPrivateVisibilty: (req.body.visibility == "private" ? True : False),
				technologiesUsed: (technologiesPSQLArrayString.length > 1 ? technologiesPSQLArrayString : {}),
				githubLink: (req.body.githubLink ? req.body.githubLink : ""),
				websiteLink: (req.body.websiteLink ? req.body.websiteLink : ""),
				devpostLink: (req.body.devpostLink ? req.body.devpostLink : ""),
				linkedinLink: (req.body.linkedinLink ? req.body.linkedinLink : ""),
				dateCreated: currentTime
			});
			console.log(projectObject.toJSON()); // TODO: Use this for debug. REMOVE when finish.
			await projectObject.save();
			console.log("The project was saveed into the database");

			res.status(200).json({ result: "Success" });
		} catch (err) {
            console.error(err);
            res.status(500).json({ errorMessage: "Internal server error" });
        }
	}
);

module.exports = router;