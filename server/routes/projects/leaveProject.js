require('dotenv').config({path: '../config/.env'});
const express = require("express");
const axios = require("axios");
const router = express.Router();
const { check, validationResult, body} = require("express-validator");
const db = require("../../database.js");


// @route   POST api/projects/leave
// @desc    A user leaves a project
// @access  Public
router.post(
	"/",
	[
		check("uid", "UID is required").not().isEmpty(),
		check("pid", "PID is required").not().isEmpty()
	],
	async (req, res) => {
		try {
			// Use express validator to validate request
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				console.log(errors);
				return res.status(422).json({ errors: errors.array()});
			}

			return res.status(200).json({ result: "Success" });
		} catch (err) {
			console.log(err);
			res.status(500).json({ errorMessage: "Internal server error" });
		}
	}
);

module.exports = router;