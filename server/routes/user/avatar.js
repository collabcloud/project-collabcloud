const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../../database.js");

// @route   PUT /api/user/avatar
// @desc    Update the user's avatar after uploading
// @access  Public
router.put(
  "/",
  [
    check("uid", "userID is required")
      .not()
      .isEmpty(),
    check("image", "Image is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      // Use express-validator to validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const values = {
        avatar: req.body.image
      };
      await db.models.user.update(values, {
        where: {
          uid: req.body.uid
        }
      });
      res.status(200).json({ result: "Success" });
    } catch (err) {
      if (err.response && err.response.status == 401) {
        return res.status(401).json({
          errorMessage: "Invalid request"
        });
      }
      console.log(err);
      return res.status(500).json({ errorMessage: "Internal server error" });
    }
  }
);

module.exports = router;
