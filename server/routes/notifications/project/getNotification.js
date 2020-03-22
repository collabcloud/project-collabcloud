const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../../../database.js");

// @route   GET /api/notifications/project/get
// @desc    Return the notifications for a given project
// @access  Public
router.get("/",
[
    check("userId", "User ID required").not().isEmpty(),
    check("notificationsToGet", "Must specify a maximum number of project notifications to get").not().isEmpty(),
],
async (req, res) => {
    try {
        // Use express-validator to validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        // console.log(req.query);

        // Get a list of all the projects the user is in
        const projectsList = await db.models.user_follows_project.findAll({
            where: {
                userUid: req.query.userId
            }
        });

        const listOfProjectIds = projectsList.map(project => project.dataValues.projectPid);
        // console.log(listOfProjectIds);

        // Get project update notifications from all of the projects the user is in
        // Messages are stored in reverse-chronological order (most recent first)
        const projectUpdates = await db.models.project_notifications.findAll({
            where: {
                pid: listOfProjectIds,
                notificationType: "project_update"
            },
            limit: req.query.notificationsToGet,
            order: [
                ['createdAt', 'DESC']
            ]
        });

        // console.log(projectUpdates);
        const notificationMessages = projectUpdates.map(projectUpdate => projectUpdate.dataValues.notificationMessage);
        // console.log(notificationMessages)

        // Send back notifications (note that this can still be an empty array)
        return res.status(200).json({
            notifications: notificationMessages
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ errorMessage: "Internal server error" });
    }
});

module.exports = router;
