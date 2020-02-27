const express = require("express");
const axios = require("axios");
const router = express.Router();
const { check, validationResult } = require("express-validator");
require("../../backend.js")()

// @route   POST api/users/register
// @desc    Register User
// @access  Public
router.post(
	"/",
	[
		check("code").not().isEmpty()
	],
	async (req, res) => {
		try {
			//console.log(req.body);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
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
			//console.log(accessToken);
			const url = 'https://api.github.com/user'
			const config = {
				headers: {
					Authorization: `token ${ accessToken }`
				}
			};
			//console.log(config)
			let test_api = await axios.get(url, config);

			//console.log(test_api);
			res.status(200).json({ result: "Success" });
		} catch (err) {
			//console.log(err)
			res.status(500).json({ errorMessage: "Internal server error" });
		}
	}
);

module.exports = router;