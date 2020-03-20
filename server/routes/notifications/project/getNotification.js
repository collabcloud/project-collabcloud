const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../../../database.js");

// @route   GET /api/notification/project/get
// @desc    Return the notifications for a given project
// @access  Public
router.get("/",
[
    check("projectId", "Project ID required").not().isEmpty(),
    // check("notificationType", "Notification type required").isIn(["project_update", "project_join_request"]),
    check("isProjectOwner").not().isEmpty(),
    check("notificationsToGet", "Must specify a maximum number of notifications to get")
],
async (req, res) => {
    try {
        // Use express-validator to validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        console.log(req.query);

        // Get any project join request notifications (only the owner gets these)
        let projectJoinRequests;
        if (req.query.isProjectOwner) {
            projectJoinRequests = await db.models.project_notifications.findAll({
                where: {
                    pid: req.query.projectId,
                    notificationType: "project_join_request"
                },
                limit: req.query.notificationsToGet,
                order: [
                    ['createdAt', 'ASC']
                ]
            });
        } 

        // Get project update notifications (both the owner and follower get these)
        const projectUpdates = await db.models.project_notifications.findAll({
            where: {
                pid: req.query.projectId,
                notificationType: "project_update"
            },
            limit: req.query.notificationsToGet,
            order: [
                ['createdAt', 'DESC']
            ]
        });

        console.log(projectJoinRequests);
        console.log(projectUpdates);

        // Successfully retrieved project notifications
        if (projectUpdates && projectUpdates.dataValues) {
            return res.status(200).json({
                projectUpdates: projectUpdates.dataValues,
                projectJoinRequests: projectJoinRequests
            });
        }
        // No project notifications
		else {
            // TODO: Change this status code
			res.status(404).json({
				errors: "No notifications for that specified project"
			});
		}
    } catch (err) {
        console.error(err);
        return res.status(500).json({ errorMessage: "Internal server error" });
    }
});

module.exports = router;
