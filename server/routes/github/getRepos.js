const express = require("express");
const axios = require("axios");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../../database.js");

// @route   GET /api/github/repos
// @desc    Allows a user to create a new project
// @access  Public
router.get(
	"/",
	[	
		check("userid", "User ID is required").not().isEmpty()
	],
	async (req, res) => {
		try {
			// Use express-validator to validate request
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}

			// TODO: Get the GitHub OAuth token associated with this userID
			let token = "token 5951a38d4b5528f2b74a412a4653575fa55375b6";

            // TODO: Get the repos associated with this user
            let response = await axios.get("https://api.github.com/user/repos", {
				headers:
					{
						"Accept": "application/vnd.github.v3+json",
						"Authorization": token
					},
				params:
					{
						"visibility": "public",
						"affiliation": "owner"
					}
			
			});
			console.log(response);


			res.status(200).json({ 
				result: "Success",
			});
		} catch (err) {
            console.error(err);
            res.status(500).json({ errorMessage: "Internal server error" });
        }
	}
);

module.exports = router;