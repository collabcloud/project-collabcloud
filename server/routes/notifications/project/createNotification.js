const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const uuidv5 = require('uuid/v5');
const db = require("../../../database.js");

const NOTIFICATION_IDS_NAMESPACE = process.env.PROJECT_NOTIFICATION_IDS_NAMESPACE;

// @route   POST /api/notification/project/create
// @desc    Create a project notification
// @access  Public
router.post(
    "/",
	[
        check("notificationType", "Notification type required").isIn(["project_update", "project_join_request"]),
        check("projectId", "Project ID is required").not().isEmpty(),
        check("notificationCreator", "Notification creator required").not().isEmpty(),
        check("notificationMessage", "Notification message is required").not().isEmpty(),
	],
	async (req, res) => {
        try {
            // Use express-validator to validate request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            console.log(req.body);

            // Generate a notification ID
            let currentTime = (new Date()).getTime();
            let nid = uuidv5(req.body.notificationCreator + currentTime, NOTIFICATION_IDS_NAMESPACE);

            // Insert the notification into the database
			let notificationObject = db.models.ProjectNotification.build({
                nid: nid,
                pid: req.body.projectId,
                notificationType: req.body.notificationType,
                notificationCreator: req.body.notificationCreator,
                notificationMessage: req.body 
			});
			notificationObject.toJSON();
			// console.log(notificationObject);
			await notificationObject.save();

            // Successfully inserted project notification
            return res.status(200).json({
                project: project.dataValues
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ errorMessage: "Internal server error" });
        }
    }
);

module.exports = router;
