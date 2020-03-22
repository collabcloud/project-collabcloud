const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../../database.js");

// Helper functions
const databaseHelpers = require('../../utils/databaseHelpers');

// @route   DELETE /api/projects/delete
// @desc    Delete a project given its PID
// @access  Public
router.post("/", async (req, res) => {
	try {
		// Use express-validator to validate request
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
        }
    
		// Get the project
		const project = await db.models.project.findOne({
			where: {
				pid: req.body.pid
			}
		});

        // Delete the project
        if (project) {
			let success = project.destroy();
			
			// Remove all users from that project
			databaseHelpers.removeAllUsersFromProject(req.body.pid);

			// Remove all notifications about this project
			databaseHelpers.removeAllProjectNotifications(req.body.pid);

            // Successfully deleted the project
            if (success) {
                return res.status(200).json({
                    result: "Successfully deleted project"
                });
            } else {
                return res.status(500).json({
                    errorMessage: "Internal server error"
                });
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
