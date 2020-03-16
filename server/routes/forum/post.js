/*
	These are the packages that I am using
*/
require("dotenv").config({ path: "../config/.env" });
const express = require("express");
const axios = require("axios");
const uuidv5 = require("uuid/v5");
const router = express.Router();
const { check, validationResult, body } = require("express-validator");
const db = require("../../database.js");

const FORUM_IDS_NAMESPACE = process.env.FORUM_IDS_NAMESPACE;

// @route   GET api/forum/post
// @desc    Retrieve all posts in a thread specified by tid
// @access  Public
router.get(
  "/",
  [
    check("tid", "Thread ID is required")
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

      const posts = await db.models.post.findAll({
        where: {
          tid: req.query.tid
        }
      });

      res.status(200).json({ posts: posts });

      return;
    } catch (err) {
      console.log(err);
      res.status(500).json({ errorMessage: "Internal server error" });
    }
  }
);

// @route   POST api/forum/post
// @desc   	Create a thread
// @access  Public
router.post(
  "/",
  [
    check("tid", "Thread ID is required")
      .not()
      .isEmpty(),
    check("sid", "Subforum ID is required")
      .not()
      .isEmpty(),
    check("submitter", "Submitter is required")
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

      const tid = req.body.tid;
      const sid = req.body.sid;
      const submitter = req.body.submitter;
      const content = req.body.content;
      let currentTime = new Date().getTime();
      let threadId = uuidv5(
        submitter + sid + topic + content + currentTime,
        FORUM_IDS_NAMESPACE
      );

      let pid = uuidv5(
        tid + sid + submitter + content + currentTime,
        FORUM_IDS_NAMESPACE
      );

      let postObject = db.models.post.build({
        pid: pid,
        tid: threadId,
        sid: sid,
        submitter: submitter,
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