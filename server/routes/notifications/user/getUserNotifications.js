const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { Op } = require("sequelize");
const db = require("../../../database.js");

// @route   GET /api/notifications/
// @desc    Return the notifications for a given project
// @access  Public
router.get(
  "/",
  [
    check("userId", "User ID required")
      .not()
      .isEmpty(),
    check(
      "notificationsToGet",
      "Must specify a maximum number of project notifications to get"
    )
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

      const notifications = await db.models.notifications.findAll({
        where: {
          notificationObserver: req.query.userId,
          notificationType: { [Op.ne]: "project_update" }
        },
        limit: req.query.notificationsToGet,
        order: [["createdAt", "DESC"]]
      });
      // Send back notifications (note that this can still be an empty array)
      return res.status(200).json({
        notifications: notifications
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ errorMessage: "Internal server error" });
    }
  }
);

module.exports = router;
