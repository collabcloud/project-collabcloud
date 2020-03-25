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
		check("uid", "userID is required").not().isEmpty()
	],
	async (req, res) => {
		try {
			// Use express-validator to validate request
			// console.log("GET");
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
                console.log(req.body);
				return res.status(422).json({ errors: errors.array() });
			}
			// Get the GitHub auth token for the given username (IMPORTANT that the username in the db matches that of GitHub username)
			const user = await db.models.user.findOne({
				where: {
					// IMPORTANT: When you register, you MUST use the same GitHub username
					uid: req.query.uid,
				}
			});
			if (user === null) {
				return res.status(404).json({ errorMessage: "That uid was not found in the database" });
            }
            else {
                return res.status(200).json({user});
            } 

		} catch (err) {
			if (err.response && err.response.status == 401) {
				return res.status(401).json({ errorMessage: "GitHub auth token associated with the username is invalid" });
			}
			console.log(err);
            return res.status(500).json({ errorMessage: "Internal server error" });
        }
	}
);

router.put(
	"/",
	[
		check("uid", "userID is required").not().isEmpty()
	],
	async (req, res) => {
		try {
			// Use express-validator to validate request
			console.log("PUT");
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
                console.log(req.query.uid);
				return res.status(422).json({ errors: errors.array() });
			}
			console.log("uid is:" + req.body.uid);
			// Get the GitHub auth token for the given username (IMPORTANT that the username in the db matches that of GitHub username)
			const values = {
				firstname: req.body.name,
				lastname: req.body.last_name,
				city: req.body.city_field,
				province: req.body.province,
				description: req.body.description
			};
			await db.models.user.update(values, {
				where: {
					// IMPORTANT: When you register, you MUST use the same GitHub username
					uid: req.body.uid,
				}
			});
			res.status(200).json({ result: "Success" });
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