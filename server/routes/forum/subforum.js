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
        return res.status(422).json({ errors: errors.array() });
      }

      const subforums = await db.models.subforum.findAll();

      res.status(200).json(subforums);

      return;
    } catch (err) {
      console.log(err);
      res.status(500).json({ errorMessage: "Internal server error" });
    }
  }
);

// @route   GET api/forum/subforum/:subforumName
// @desc    Retrieve all subforums
// @access  Public
router.get(
  "/:subforumName",
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

      var words = req.params.subforumName.split("-");
      const first_word = words[0][0].toUpperCase() + words[0].slice(1);
      var new_title = first_word;

      for (var i = 1; i < words.length; i++) {
        new_title += " " + words[i][0].toUpperCase() + words[i].slice(1);
      }

      const subforums = await db.models.subforum.findAll({
        where: { title: new_title }
      });

      res.status(200).json(subforums[0]);

      return;
    } catch (err) {
      console.log(err);
      res.status(500).json({ errorMessage: "Internal server error" });
    }
  }
);

// @route   POST api/forum/subforum
// @desc   	Create a subforum
// @access  Public
router.post(
  "/",
  [
    check("title", "Title is required")
      .not()
      .isEmpty(),
    check("description", "Description is required")
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

      const title = req.body.title;
      const description = req.body.description;
      let currentTime = new Date().getTime();
      let subforumId = uuidv5(
        title + description + currentTime,
        FORUM_IDS_NAMESPACE
      );

      let subForumObject = await db.models.subforum.findOrCreate({
        where: {
          title: title,
          description: description
        },
        defaults: {
          sid: subforumId,
          title: title,
          description: description
        }
      });

      //await subForumObject.save();

      res.status(200).json({ result: "Success" });

      return;
    } catch (err) {
      console.log(err);
      res.status(500).json({ errorMessage: "Internal server error" });
    }
  }
);

module.exports = router;
