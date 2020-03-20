require('dotenv').config({path: '../config/.env'});
const express = require("express");
const axios = require("axios");
const router = express.Router();
const { check, validationResult, body} = require("express-validator");
const db = require("../../database.js");


// @route   POST api/projects/join
// @desc    A user joins a project
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

			// Check if this record already exists (check if the user already joined the project)
			let record = await db.models.user_follows_project.findOne({
				where: {
					userUid: req.body.uid,
					projectPid: req.body.pid
				}
			});
			if (record) {
				return res.status(409).json({ result: "Unsuccessful. User is already a part of that project"});
			}

			// Check if the project already has an owner
			record = await db.models.user_follows_project.findOne({
				where: {
					projectPid: req.body.pid,
					isOwner: true
				}
			});
			// The project already has an owner
			if (req.body.memberStatus === "owner" && record) {
				return res.status(409).json({ result: "Unsuccessful. That project already has an owner" });
			}

			// The user hasn't joined the project yet; add them
			const success = await db.models.user_follows_project.create({
				userUid: req.body.uid,
				projectPid: req.body.pid,
				isOwner: (req.body.memberStatus === "owner") ? true : false
			});
			if (success) {
				return res.status(200).json({ result: "Success" });
			} else {
				// Some error with Sequelize
				console.log(err);
				return res.status(500).json({ errorMessage: "Internal server error" });
			}
		} catch (err) {
			// This error could be thrown if the user tried to insert a relation for
			// a UID or PID that isn't in the users or projects table
			console.log("Check server/routes/projects/joinProject.js");
			console.log(err);
			res.status(500).json({ errorMessage: "Internal server error" });
		}
	}
);

module.exports = router;