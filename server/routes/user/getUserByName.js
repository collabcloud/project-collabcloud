require("dotenv").config({ path: "../config/.env" });
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../../database.js");

// @route   GET api/username/:username
// @desc    Retrieve the information of the specified user
// @access  Public
router.get(
  "/:username",
  [
    check("username", "Username is required")
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

      const user = await db.models.user.findOne({
        where: {
          username: req.params.username
        }
      });

      if (user === null) {
        res.status(404).json({ status: "NOT_FOUND" });
      } else {
        res.status(200).json(user);
      }
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json({ errorMessage: "Internal server error" });
    }
  }
);

module.exports = router;
