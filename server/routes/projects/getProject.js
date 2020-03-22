const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../../database.js");

// @route   GET /api/projects/information
// @desc    Return the full information of a project given its PID, and its list of collaborators
// @access  Public
router.get("/", async (req, res) => {
	try {
		// Use express-validator to validate request
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		// Get the project
		const project = await db.models.project.findOne({
			where: {
				pid: req.query.projectId
			}
		});

		// Successfully retrieved project
		if (project && project.dataValues) {

			// Get the collaborators for this project
			const collaborators = await db.models.user_follows_project.findAll({
				where: {
					projectPid: req.query.projectId
				}
			});

			// Successfully retrieved collaborators
			if (collaborators) {				
				let cleanedCollaborators = collaborators.map(collaborator => collaborator.dataValues)
				
				// console.log("List of all collaborators")
				// console.log(cleanedCollaborators);

				return res.status(200).json({
					project: project.dataValues,
					collaborators: cleanedCollaborators
				});
			}

			// Could not retrieve any collaborators
			else {
				res.status(404).json({
					errors: "Found that project but could not find its collaborators (it should have at least one, the owner)"
				});
			}
		}
		// Could not find that project
		else {
			res.status(404).json({
				errors: "Project not found"
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ errorMessage: "Internal server error" });
	}
});

module.exports = router;
