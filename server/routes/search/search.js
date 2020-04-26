const express = require("express");
const router = express.Router();
const { check, validationResult, body } = require("express-validator");
const db = require("../../database.js");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    // Use express-validator to validate request
    let term = "%" + req.query.term + "%";
    const projects = await db.models.project.findAll({
      where: {
        isPrivate: false,
        [Op.or]: [
          {
            projectName: {
              [Op.iLike]: term,
            },
          },
          {
            projectDescription: {
              [Op.iLike]: term,
            },
          },
        ],
      },
    });
    const users = await db.models.user.findAll({
      where: {
        [Op.or]: [
          {
            username: {
              [Op.iLike]: term,
            },
          },
        ],
      },
    });
    res.status(200).json({
      result: "Success",
      projects: projects,
      users: users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
});

module.exports = router;
