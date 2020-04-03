const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../../database.js");

// @route   PUT /api/projects/img
// @desc    Update the project's img after uploading
// @access  Public
router.put(
  "/",
  [
    check("pid", "Project ID is required")
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
        img: req.body.image
      };
      await db.models.project.update(values, {
        where: {
          pid: req.body.pid
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
