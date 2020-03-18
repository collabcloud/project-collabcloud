/*
	These are the packages that I am using
*/
require("dotenv").config({ path: "../config/.env" });
const express = require("express");
const axios = require("axios");
const uuidv5 = require("uuid/v5");

const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../../database.js");

const FORUM_IDS_NAMESPACE = process.env.FORUM_IDS_NAMESPACE;

// @route   GET api/forum/thread
// @desc    Retrieve all threads in a subforum specified by sid
// @access  Public
router.get(
  "/",
  [
    check("sid", "Subforum ID is required")
      .not()
      .isEmpty()
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
        return res.status(422).json({ errors: errors.array() });
      }

      const threads = await db.models.thread.findAll({
        where: {
          subforumSid: req.query.sid
        }
      });
      res.status(200).json(threads);

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
    check("submitter", "Submitter is required")
      .not()
      .isEmpty(),
    check("subforum", "Subforum name is required")
    .not()
    .isEmpty(),
    check("sid", "sid is required")
      .not()
      .isEmpty(),
    check("topic", "Topic is required")
      .not()
      .isEmpty(),
    check("content", "Content is required")
      .not()
      .isEmpty()
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
        return res.status(422).json({ errors: errors.array() });
      }

      const submitter = req.body.submitter;

      let user = await db.models.user.findOne({
        where: {
          uid: submitter
        }
      });

      if (user === null) {
        return res.status(404).json({status: 404});
      }

      const submitterName = user.username;
      const sid = req.body.sid;
      const subforum = req.body.subforum;
      const topic = req.body.topic;
      const content = req.body.content;
      let currentTime = new Date().getTime();
      let threadId = uuidv5(
        submitter + sid + topic + content + currentTime,
        FORUM_IDS_NAMESPACE
      );

      let threadObject = await db.models.thread.findOrCreate({
        where: {
          subforumSid: sid,
          submitterUid: submitter,
          username: submitterName,
          forum_title: subforum,
          topic: topic,
          content: content
        },
        defaults: {
          tid: threadId,
          subforumSid: sid,
          submitterUid: submitter,
          username: submitterName,
          forum_title: subforum,
          topic: topic,
          content: content
        }
      });

      let pid = uuidv5(
        threadId + sid + submitter + content + currentTime,
        FORUM_IDS_NAMESPACE
      );

      let postObject = await db.models.post.build({
        pid: pid,
        threadTid: threadId,
        subforumSid: sid,
        username: submitterName,
        submitterUid: submitter,
        content: content
      });

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
