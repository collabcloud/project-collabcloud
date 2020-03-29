require("dotenv").config({ path: "../config/.env" });
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../../database.js");

// @route   GET api/user/
// @desc    Retrieve the information of the specified user
// @access  Public
router.get(
  "/:uid",
  [
    check("uid", "User ID is required")
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

      const user = await db.models.user.findAll({
        where: {
          uid: req.params.uid
        }
      });

      const followers = await db.models.user_followers.count({
        where: {
          followeeUid: req.params.uid
        }
      });

      user[0].setDataValue("followers", followers);

      res.status(200).json(user);

      return;
    } catch (err) {
      console.log(err);
      res.status(500).json({ errorMessage: "Internal server error" });
    }
  }
);

module.exports = router;
