const uuidv5 = require("uuid/v5");
const db = require("../../database.js");

const NOTIFICATION_IDS_NAMESPACE =
	process.env.PROJECT_NOTIFICATION_IDS_NAMESPACE;

// Add a project notification. This is only ever called from within the backend
const addNotification = async (
	notificationType,
	projectId,
	notificationCreatorId,
	notificationMessage
) => {
	try {
		// Generate a notification ID
		let currentTime = new Date().getTime();
		let nid = uuidv5(
			notificationCreatorId + currentTime,
			NOTIFICATION_IDS_NAMESPACE
		);

		// Insert the notification into the database
		let notificationObject = db.models.ProjectNotification.build({
			nid: nid,
			pid: projectId,
			notificationType: notificationType,
			notificationCreator: notificationCreatorId,
			notificationMessage: notificationMessage
		});
		notificationObject.toJSON();
		// console.log(notificationObject);
		await notificationObject.save();

		// Successfully inserted project notification
		return "success";
	} catch (err) {
		console.error(err);
		return;
	}
};

exports.addNotification = addNotification;
