/*
	These are the packages that I am using
*/
require('dotenv').config({path: '../config/.env'});
const express = require("express");
const axios = require("axios");
const router = express.Router();
const { check, validationResult, body} = require("express-validator");
const db = require("../../database.js");

const FORUM_IDS_NAMESPACE = process.env.FORUM_IDS_NAMESPACE;

// @route   GET api/forum/subforum
// @desc    Retrieve all subforums
// @access  Public
router.get(
	"/",
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

			const subforums = await db.models.Subforums.findAll();
			
			res.status(200).json({ subforums: subforums });
			
			return;
		} catch (err) {
			console.log(err);
			res.status(500).json({ errorMessage: "Internal server error" });
		}
	}
);

// @route   POST api/forum/thread
// @desc   	Create a thread
// @access  Public
router.post(
	"/",
	[
		check("name", "Name is required").not().isEmpty(),
		check("description", "Description is required").not().isEmpty(),
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

			const name = req.body.name;
			const description = req.body.description;
			let currentTime = (new Date()).getTime();
			let threadId = uuidv5(submitter + sid + topic + content + currentTime, FORUM_IDS_NAMESPACE);

			let threadObject = db.models.Threads.build({
				tid: threadId,
				sid: sid,
				submitter: submitter,
				topic: topic,
				content: content
			});

			let pid = uuidv5(threadId + sid + submitter + content + currentTime, FORUM_IDS_NAMESPACE);

			let postObject = db.models.Posts.build({
				pid: pid,
				tid: threadId,
				sid: sid,
				submitter: submitter,
				content: content
			});

			await threadObject.save();
			await postObject.save();

			res.status(200).json({ result: "Success" });
			
			return;
		} catch (err) {
			console.log(err);
			res.status(500).json({ errorMessage: "Internal server error" });
		}
	}
);

module.exports = router;

