const express = require("express");
const axios = require("axios");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../../database.js");

// @route   GET /api/projects/{user}
// @desc    Returns all projects from the user
// @access  Public
router.get("/:uid", async (req, res) => {
  try {
    const uid = req.params.uid;
    if (uid === null || uid.length === 0) {
      return res.status(422).json({ errors: errors.array() });
    }

    const projects = await db.models.project.findAll({
      where: {
        ownerId: uid
      }
    });

    const projects_obj = {
      projects_lst: projects
    };

    res.status(200).json({
      result: "Success",
      projects_obj
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
});

module.exports = router;
