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

			//put data into database
			// const UserObject = db.models.user.build({
			// 	username: req.body.username,
			// 	password: req.body.password
			// });

			// await UserObject.save();

			// This is the github auth code
			const code = req.body.code;
			const clientID = "08f4f6db13802f8cd769";
			const clientSecret = "7c01fda97c9ee5d3bbab94dbf1b548bab8e6b6be";

			let response = await axios({
				method: 'post',
				url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`,
				headers: {
					accept: 'application/json'
				}
			});
			let accessToken = response.data.access_token;

			//put data into database
			const UserObject = db.models.user.build({
				username: req.body.username,
				password: req.body.password,
				authToken: accessToken
			});

			await UserObject.save();

			console.log(accessToken)
			console.log(req.body.username)
			console.log(req.body.password)
			res.status(200).json({ result: "Success" });
		} catch (err) {
			console.log(err)
			res.status(500).json({ errorMessage: "Internal server error" });
		}
	}
);

module.exports = router;