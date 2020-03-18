const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../../database.js");

// @route   GET /api/projects/information
// @desc    Return the full information of a project given its PID
// @access  Public
router.get("/", async (req, res) => {
	try {
		// Use express-validator to validate request
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		// TODO: Get the collaborators for this project as well
		// Get the project
		const project = await db.models.project.findOne({
			where: {
				pid: req.query.pid
			}
		});

		// console.log(project);

		// Successfully retrieved project
		if (project && project.dataValues) {
			res.status(200).json({
				project: project.dataValues
			});
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
