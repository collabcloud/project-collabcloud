/*
	These are the packages that I am using
*/
require("dotenv").config({ path: "../config/.env" });
const express = require("express");

const router = express.Router();
const { validationResult } = require("express-validator");
const db = require("../../database.js");

// @route   GET api/forum/getAllThreads
// @desc    Retrieve all threads
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

      const threads = await db.models.thread.findAll();

      res.status(200).json(threads);

      return;
    } catch (err) {
      console.log(err);
      res.status(500).json({ errorMessage: "Internal server error" });
    }
  }
);


module.exports = router;
