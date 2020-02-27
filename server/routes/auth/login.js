const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../../database.js");

// @route   POST api/users/login
// @desc    Login a User
// @access  Public
router.post(
	"/",
	[
		// Checks if username is not empty
		check("username", "Please enter your username").not().isEmpty(),
		check("password", "Please a valid password").isLength({ min: 8 })
	],
	async (req, res) => {
		try {
			// Use express-validator to validate request
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}

			// Query to check if username and password exist in database
			const validUser = await db.models.user.findAll({
				where: {
					username: req.body.username,
					password: req.body.password
				}
			});
	
			// 200 success response if username equal to password
			if ((validUser.length > 0) && (req.body.username == validUser[0].dataValues.username) && (req.body.password == validUser[0].dataValues.password)) {
				res.status(200).json({ result: "Success" });
				return;
			}

			// 400 status if username is wrong or not found in db
			res.status(400).json({ result: "Not Found" });
			return;
		} catch (err) {
			console.error(err);
			res.status(500).json({ errorMessage: "Internal server error" });
			return;
		}
	}
);

module.exports = router;
