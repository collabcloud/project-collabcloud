const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../../database.js");
require('dotenv').config({ path: './config/.env' });

// @route   POST api/hackathons/add
// @desc    Add a hackathon to the db
// @access  Public
router.post(
	"/",
	[
		check("name", "Hackathon name is required").not().isEmpty(),
		check("date", "Hackathon date is required").not().isEmpty(),
        check("location", "Hackathon location is required").not().isEmpty(),
        check("link", "Hackathon website is required").not().isEmpty()

	],
	async (req, res) => {
        try {
			// Use express-validator to validate request
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}

			// Insert the hackathon into the database
			let hackathonObject = db.models.hackathons.build({
				name: req.body.name,
                date: req.body.date,
                location: req.body.location,
                link: req.body.link
			});
			hackathonObject.toJSON();
			//console.log(hackathonObject);
			await hackathonObject.save();
			console.log("The hackathon was saved into the database");

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