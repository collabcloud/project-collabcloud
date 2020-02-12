const express = require("express");
const axios = require("axios");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../../database.js");

// @route   POST api/users/register
// @desc    Register User
// @access  Public
router.post(
	"/",
	[
		check("username", "Username is required").not().isEmpty(),
		check("password", "Password must contain minimum eight characters").isLength({ min: 8 }),
	],
	async (req, res) => {
		try {
			//express validator to validate request
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}
			console.log(exists(req.body.username, req.body.password));

			//put data into database
			const UserObject = db.models.user.build({
				username: req.body.username,
				password: req.body.password
			});

			await UserObject.save();
			res.status(200).json({ result: "Success" });
		} catch (err) {
			console.error(err);
			res.status(500).json({ errorMessage: "Internal server error" });
		}
	}
);

module.exports = router;