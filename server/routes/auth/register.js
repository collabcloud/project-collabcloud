require('dotenv').config({path: './config/.env'});
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
			// Use express validator to validate request
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}

			// This is the GitHub auth code
			const code = req.body.code;
			const clientID = process.env.CLIENT_ID;
			const clientSecret = process.env.CLIENT_SECRET;

			// Get access token from GitHub
			let response = await axios({
				method: 'post',
				url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`,
				headers: {
					accept: 'application/json'
				}
			});
			// TODO: Check if this access token still exists. It may not exist of the user has authenticated with GitHub but did not register for an account (after ~10 min ?)
			let accessToken = response.data.access_token;
			console.log(accessToken)
			console.log(req.body.username)
			console.log(req.body.password)

			// Insert a user into database
			const UserObject = db.models.user.build({
				username: req.body.username,
				password: req.body.password,
				authToken: accessToken
			});
			await UserObject.save();
			
			res.status(200).json({ result: "Success" });
		} catch (err) {
			console.log(err)
			res.status(500).json({ errorMessage: "Internal server error" });
		}
	}
);

module.exports = router;