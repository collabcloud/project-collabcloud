require("dotenv").config({ path: "../config/.env" });
const express = require("express");
const axios = require("axios");
const router = express.Router();
const { check, validationResult, body } = require("express-validator");
const db = require("../../database.js");
const moment = require("moment");

// Helper functions
const databaseHelpers = require("../../utils/databaseHelpers");
const notificationHelpers = require("../../utils/notifications/projectNotifications");

// @route   POST api/projects/accept
// @desc    Accept a user's request to join your project
// @access  Public
router.post(
  "/",
  [
    check("uid", "UID is required")
      .not()
      .isEmpty(),
    check("pid", "PID is required")
      .not()
      .isEmpty(),
    check("memberStatus", "User must be either a collaborator or owner").isIn([
      "collaborator",
      "owner"
    ])
  ],
  async (req, res) => {
    try {
      // Use express validator to validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(422).json({ errors: errors.array() });
      }

      // Check if this record already exists (check if the user already joined the project)
      let record = await db.models.user_follows_project.findOne({
        where: {
          userUid: req.body.uid,
          projectPid: req.body.pid
        }
      });
      if (record) {
        return res.status(409).json({
          result: "Unsuccessful. User is already a part of that project"
        });
      }

      // Check if the project already has an owner
      record = await db.models.user_follows_project.findOne({
        where: {
          projectPid: req.body.pid,
          isOwner: true
        }
      });
      // The project already has an owner
      if (req.body.memberStatus === "owner" && record) {
        return res
          .status(409)
          .json({ result: "Unsuccessful. That project already has an owner" });
      }

      // Get username associated with userid
      const username = await databaseHelpers.getUsername(req.body.uid);
      if (!username) {
        return res
          .status(404)
          .json({ errorMessage: "The provided uid does not exist" });
      }

      await db.models.user_requests.destroy({
        where: {
          projectPid: req.body.pid,
          requester_uid: req.body.uid
        }
      });

      // The user hasn't joined the project yet; add them
      const success = await databaseHelpers.addUserToProject(
        req.body.uid,
        username,
        req.body.pid,
        req.body.memberStatus
      );
      if (success) {
        // Get project name associated with projectid
        //const projectName = await databaseHelpers.getProjectName(req.body.pid);

        //temporary
        const project = await db.models.project.findOne({
          where: {
            pid: req.body.pid
          }
        });

        // Add a notification for this project
        notificationHelpers.addNotification(
          "project_update",
          req.body.pid,
          req.body.uid,
          project.ownerId,
          `${username} joined ${project.projectName} at ${moment().format(
            "MMMM Do YYYY, h:mm:ss a"
          )}! Welcome ${username}!`
        );

        return res.status(200).json({ result: "Success" });
      } else {
        // Some error with Sequelize
        console.log(err);
        return res.status(500).json({ errorMessage: "Internal server error" });
      }
    } catch (err) {
      // This error could be thrown if the user tried to insert a relation for
      // a UID or PID that isn't in the users or projects table
      console.log(err);
      res.status(500).json({ errorMessage: "Internal server error" });
    }
  }
);

module.exports = router;
