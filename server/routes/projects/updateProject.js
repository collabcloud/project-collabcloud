const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../../database.js");
require('dotenv').config({ path: './config/.env' });

// @route   POST api/projects/update
// @desc    Allows a user to update a project
// @access  Public
router.post(
	"/",
	[
        // check("pid", "Project ID is required").not().isEmpty(),
		// check("projectName", "Project name is required").not().isEmpty(),
		// check("projectDescription", "Project description is required").not().isEmpty(),
		// check("isProjectPublic", "Project visibility must be required").isIn(["false", "true"])
	],
	async (req, res) => {
		try {
            // console.log("Hit updateProject in back-end");
            // console.log(req.body);

			// Use express-validator to validate request
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}

            // TODO: Require this dict from an external JS file instead
			// Technologies dict
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
			let techArray = [];
			// If you add more technologies into the techDict dictionary, then change the total value of the array
			for (i = 0; i < 24; i++) {
				techArray[i] = 0;
			}

			// Given the technologies used, construct an encoding string that can be inserted into PSQL
			const technologiesArray = req.body.technologiesUsed;
			let techName = technologiesArray.map(tech => tech.name);

			// Encodes the array
			if (techName.length > 0) {
				let techIndex;
				for (techIndex of techName) {
					techArray[techDict[techIndex] - 1] = 1;
				}
			}
			const encodedTech = techArray.join('');
		
			let linkArray = req.body.techLinks.map(link => link.value);
            
            // Build up the list of attributes that need to be updated
            let updates = {
                projectName: req.body.projectName,
                projectDescription: req.body.description,
                isPrivate: !req.body.isProjectPublic,
                technologiesUsed: encodedTech,
                githubLink: (linkArray[0] ? linkArray[0] : ""),
				websiteLink: (linkArray[1] ? linkArray[1] : ""),
				devpostLink: (linkArray[2] ? linkArray[2] : ""),
				linkedinLink: (linkArray[3] ? linkArray[3] : "")
            };
            
            // Get the project in the database, then update it
            let filter = {
                where: {
                    pid: req.body.pid
                }
            };
            let projectToUpdate = await db.models.project.findOne(filter);

            // Update the project from the database
            if (projectToUpdate) {
                let success = projectToUpdate.update(updates);
                if (success) {
                    // console.log("The project was updated in the database!");
                    return res.status(200).json({
                        result: "Success",
                    });
                } else {
                    // console.log("Could not update project");
                    return res.status(500).json({
                        result: "Internal server errors",
                    });
                }
            } else {
                // console.log("Could not update project");
                return res.status(404).json({
                    result: "Could not find that Project",
                });
            }
		} catch (err) {
			console.error(err);
			return res.status(500).json({ errorMessage: "Internal server error" });
		}
	}
);

module.exports = router;