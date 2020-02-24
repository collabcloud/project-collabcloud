const express = require("express");
const axios = require("axios");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../../database.js");

// @route   GET /api/projects
// @desc    Returns all public projects
// @access  Public
router.get(
	"/",
	async (req, res) => {
		try {
			// Use express-validator to validate request
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}

			const projects = await db.models.project.findAll({
				where: {
					isPrivate: false
				}
			});

			//console.log("All projects:", JSON.stringify(projects, null, 2));
			const projects_obj = {
				projects_lst: projects
			}

			res.status(200).json({
				result: "Success",
				projects_obj
			});


		} catch (err) {
            console.error(err);
            res.status(500).json({ errorMessage: "Internal server error" });
        }
	}
);

module.exports = router;