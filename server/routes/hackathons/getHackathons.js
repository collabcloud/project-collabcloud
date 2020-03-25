const express = require("express");
const axios = require("axios");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../../database.js");

// @route   GET /api/hackathons
// @desc    Returns all hackathons
// @access  Public
router.get(
	"/",
	async (req, res) => {
		try {
			// Use express-validator to validate request
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}

			const hackathons = await db.models.hackathons.findAll();

			const hackathons_obj = {
				hackathons_lst: hackathons
			}

			res.status(200).json({
				result: "Success",
				hackathons_obj
			});


		} catch (err) {
            console.error(err);
            res.status(500).json({ errorMessage: "Internal server error" });
        }
	}
);

module.exports = router;