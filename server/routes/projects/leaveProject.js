require('dotenv').config({path: '../config/.env'});
const express = require("express");
const axios = require("axios");
const router = express.Router();
const { check, validationResult, body} = require("express-validator");
const db = require("../../database.js");

// Helper functions
const databaseHelpers = require('../../utils/databaseHelpers');
const notificationHelpers = require('../../utils/notifications/projectNotifications');

// @route   POST api/projects/leave
// @desc    A user leaves a project
// @access  Public
router.post(
	"/",
	[
		check("uid", "UID is required").not().isEmpty(),
		check("pid", "PID is required").not().isEmpty(),
		check("memberStatus", "User must be either a collaborator or owner").isIn(["collaborator", "owner"])
	],
	async (req, res) => {
		try {
			// Use express validator to validate request
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				console.log(errors);
				return res.status(422).json({ errors: errors.array()});
			}


			// Check if the user has joined the project)
			const userIsInProject = await db.models.user_follows_project.findOne({
				where: {
					userUid: req.body.uid,
					projectPid: req.body.pid
				}
			});
			if (!userIsInProject) {
				return res.status(404).json({ result: "Unsuccessful. User not part of that project"});
			} 

			// The project owner cannot leave the project
			if (req.body.memberStatus == "owner" || userIsInProject.dataValues.isOwner) {
				return res.status(400).json({ errors: "The owner may not leave the project"});
			}
			
			// The user is in the project and is a collaborator. Remove them
			const record = await db.models.user_follows_project.findOne({
				where: {
					userUid: req.body.uid,
					projectPid: req.body.pid
				}
			});
			if (record) {
				let success = record.destroy();

				// Get username associated with userid
				const username = await databaseHelpers.getUsername(req.body.uid);
				if (!username) {
					return res.status(404).json({ errorMessage: "The provided uid does not exist" });
				}

				// Successfully deleted this record
				if (success) {
					// Get project name associated with projectid
					const projectName = await databaseHelpers.getProjectName(req.body.pid);

					// Add a notification for this project
					notificationHelpers.addNotification("project_update", req.body.pid, req.body.uid, `${username} left ${projectName} at ${moment(collaborator.createdAt).format("MMMM Do YYYY, h:mm:ss a")}`);
				
					return res.status(200).json({
						result: "Successfully removed user from project"
					});
				} 
				// Could not remove user from the project
				else {
					return res.status(500).json({
						error: "Internal server error"
					});
				}
			}
			
			// Could not remove user from the project
			else {
				return res.status(500).json({
					error: "Could not remove the user from the project"
				});
			}
		} catch (err) {
			console.log(err);
			res.status(500).json({ errorMessage: "Internal server error" });
		}
	}
);

module.exports = router;