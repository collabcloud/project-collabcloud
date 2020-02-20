const express = require("express");
const axios = require("axios");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../../database.js");

// @route   GET /api/github/repos
// @desc    Return a list of GitHub repos that belongs to this user
// @access  Public
router.get(
	"/",
	[	
		check("username", "Username is required").not().isEmpty(),
		check("visibility", "Visiblity of repo is required and must be one of 'public', 'private', or 'all'").isIn(['public', 'private', 'all'])
	],
	async (req, res) => {
		try {
			// Use express-validator to validate request
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}

			// Get the GitHub auth token for the given username
			const user = await db.models.user.findOne({
				where: {
					username: req.body.username,
				}
			});
			if (user === null) {
				return res.status(404).json({ errorMessage: "That username was not found in the database" });
			} 
			let authToken = "token " + user.authToken;
			// let authToken = " token 1689077dba9bea9325fbccf719c65bb34c984b0e"; // NOTE: Use this for debugging

            // Get the repos associated with this user
            let githubResponse = await axios.get("https://api.github.com/user/repos", {
				headers:
					{
						"Accept": "application/vnd.github.v3+json",
						"Authorization": authToken
					},
				params:
					{
						"visibility": req.body.visibility,
						"affiliation": "owner",
						"sort": "created",
						"direction": "desc"
					}
			});
			if (githubResponse.status == 200) {
				// console.log(githubResponse);
				let repos = githubResponse.data;
				let repoData = {};
				for (let i = 0; i < repos.length; i++) {
					// TODO: Consult with the team to figure out what other fields we want to save
					repoData[repos[i].name] = {};
					repoData[repos[i].name]["url"] = repos[i].html_url;
					repoData[repos[i].name]["description"] = repos[i].description;
					repoData[repos[i].name]["creation_date"] = repos[i].created_at;
				}
				// console.log(repoData);
				return res.status(200).json(repoData);
			}
			res.status(500).json({ errorMessage: "Internal server error" });
		} catch (err) {
			if (err.response && err.response.status == 401) {
				return res.status(401).json({ errorMessage: "GitHub auth token associated with the username is invalid" });
			}
            return res.status(500).json({ errorMessage: "Internal server error" });
        }
	}
);

module.exports = router;