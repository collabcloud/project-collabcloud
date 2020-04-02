/*
	These are the packages that I am using
*/
require("dotenv").config({ path: "../config/.env" });
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const notificationHelpers = require("../../utils/notifications/projectNotifications");
const moment = require("moment");

const db = require("../../database.js");

// @route   GET /api/users/request/user/:uid
// @desc    Returns all incoming requests for a user
// @access  Public
router.get("/user/:uid", async (req, res) => {
  try {
    // Use express-validator to validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const uid = req.params.uid;

    const requests = await db.models.user_requests.findAll({
      where: {
        requestee_uid: uid
      }
    });

    if (requests.length === 404) {
      return res.status(404).json({ errorMessage: "Resource not found" });
    }

    res.status(200).json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
});

// @route   GET /api/users/request/project/:pid
// @desc    Returns all outgoing requests for a project
// @access  Public
router.get("/project/:pid", async (req, res) => {
  try {
    // Use express-validator to validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const pid = req.params.pid;

    const requests = await db.models.user_requests.findAll({
      where: {
        projectPid: pid
      }
    });

    if (requests.length === 0) {
      return res.status(404).json({ errorMessage: "Resource not found" });
    }

    res.status(200).json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
});

// @route   POST api/users/request
// @desc    Request a user
// @access  Public
router.post(
  "/",
  /*
		The following list below contains all the validations for register input
	*/
  [
    check("requestee", "requestee name is required")
      .not()
      .isEmpty(),
    check("requester", "requester UID is required")
      .not()
      .isEmpty(),
    check("pid", "Project ID is required")
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

      //Check that the requestee exists
      const user1 = await db.models.user.findOne({
        where: {
          username: req.body.requestee
        }
      });
      //Check that the requester exists
      const user2 = await db.models.user.findOne({
        where: {
          uid: req.body.requester
        }
      });

      if (user1 === null || user2 === null) {
        return res
          .status(404)
          .json({ errorMessage: "404 - Resource not found" });
      } else if (user1.uid === user2.uid) {
        return res
          .status(409)
          .json({ errorMessage: "400 - Cannot request yourself" });
      }

      //Check that the project exists
      const project = await db.models.project.findOne({
        where: {
          pid: req.body.pid
        }
      });

      if (project === null) {
        return res
          .status(404)
          .json({ errorMessage: "404 - Resource not found" });
      }

      //Check if the request exists in db already
      const check = await db.models.user_requests.findAll({
        where: {
          requestee_uid: user1.uid,
          requester_uid: req.body.requester
        }
      });

      //request already exists in db
      if (check.length > 0) {
        return res.status(400).json({ result: "request already exists" });
      }

      //If the requestee is the owner, then this is an incoming request
      if (project.ownerId === user1.uid) {
        notificationHelpers.addNotification(
          "collaboration_request",
          req.body.pid,
          req.body.requester,
          user1.uid,
          `${user2.username} requested to join ${
            project.projectName
          } at ${moment().format("MMMM Do YYYY, h:mm:ss a")}!`
        );
      }

      const RequestObject = db.models.user_requests.build({
        requestee_uid: user1.uid,
        requester_uid: req.body.requester,
        requesteeName: user1.username,
        requesterName: user2.username,
        projectName: project.projectName,
        ownerUid: req.body.requester,
        projectPid: req.body.pid
      });
      await RequestObject.save();
      res.status(200).json({ result: "Success" });

      return;
    } catch (err) {
      console.log(err);
      res.status(500).json({ errorMessage: "Internal server error" });
    }
  }
);

module.exports = router;
