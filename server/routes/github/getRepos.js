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

			// Get the GitHub auth token for the given username (IMPORTANT that the username in the db matches that of GitHub username)
			const user = await db.models.user.findOne({
				where: {
					// IMPORTANT: When you register, you MUST use the same GitHub username
					username: req.query.username,
				}
			});
			if (user === null) {
				return res.status(404).json({ errorMessage: "That username was not found in the database" });
			} 
			let authtoken = "token " + user.authtoken;

            // Get the repos associated with this user
            let githubResponse = await axios.get("https://api.github.com/user/repos", {
				headers:
					{
						"Accept": "application/vnd.github.v3+json",
						"Authorization": authtoken
					},
				params:
					{
						"visibility": req.query.visibility,
						"affiliation": "owner",
						"sort": "created",
						"direction": "desc"
					}
			});
			if (githubResponse.status == 200) {
				let repos = githubResponse.data;
				let repoData = [];
				for (let i = 0; i < repos.length; i++) {
					repoData[i] = {};
					repoData[i]["repo_name"] = repos[i].name;
					repoData[i]["github_url"] = repos[i].html_url;
					repoData[i]["repo_description"] = repos[i].description;
					repoData[i]["repo_creation_date"] = repos[i].created_at;
					repoData[i]["repo_main_technology"] = repos[i].language;
					repoData[i]["repo_visibility_is_private"] = repos[i].private;
					repoData[i]["github_stars"] = repos[i].stargazers_count;
				}
				return res.status(200).json(repoData);
			}
			res.status(500).json({ errorMessage: "Internal server error" });
		} catch (err) {
			if (err.response && err.response.status == 401) {
				return res.status(401).json({ errorMessage: "GitHub auth token associated with the username is invalid" });
			}
			console.log(err);
            return res.status(500).json({ errorMessage: "Internal server error" });
        }
	}
);

module.exports = router;