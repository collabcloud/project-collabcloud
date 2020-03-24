/*
	These are the packages that I am using
*/
require('dotenv').config({path: '../config/.env'});
const express = require("express");
const axios = require("axios");
const router = express.Router();
const { check, validationResult, body} = require("express-validator");
const db = require("../../database.js");


// @route   POST api/follow/user
// @desc    Follow a user
// @access  Public
router.post(
	"/",
	/*
		The following list below contains all the validations for register input
	*/
	[
		check("followee", "Followee UID is required").not().isEmpty(),
		check("follower", "Follower UID is required").not().isEmpty()
	],
	/*
		The following async function below handles the full request.
	*/
	async (req, res) => {
		try {
			// Use express validator to validate request
			
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				console.log(errors);
				return res.status(422).json({ errors: errors.array()});
			}

			//to do: check if both users exist in users

			const followee_uid = req.body.followee;
			const follower_uid = req.body.follower;
			/*
			const checkUser1 = await db.models.user.findAll({
				where: {
					uid: followee_uid
				}
			});
			*/
			
			const FollowObject = await db.models.user_followers.create({
				followeeUid: req.body.followee,
				followerUid: req.body.follower
			});
			
			res.status(200).json({ result: "Success" });
			
			return;
		} catch (err) {
			console.log(err);
			res.status(500).json({ errorMessage: "Internal server error" });
		}
	}
);

module.exports = router;

