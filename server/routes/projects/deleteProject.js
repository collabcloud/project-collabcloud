const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../../database.js");

// @route   DELETE /api/projects/delete
// @desc    Delete a project given its PID
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
				pid: req.query.pid
			}
		});

		// console.log(project);

        // Delete the project
        if (project) {
            let success = project.destroy();
            console.log(success);

            // Successfully deleted the project
            if (success) {
                return res.status(200).json({
                    result: "Successfully deleted project"
                });
            } else {
                return res.status(500).json({
                    errorMessage: "Internal server error"
                })
            }
        }
		// Could not find that project
		else {
			return res.status(404).json({
				errors: "Project not found"
			});
		}
	} catch (err) {
		console.error(err);
		return res.status(500).json({ errorMessage: "Internal server error" });
	}
});

module.exports = router;
