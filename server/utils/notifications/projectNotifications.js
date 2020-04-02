const uuidv5 = require("uuid/v5");
const db = require("../../database.js");

const NOTIFICATION_IDS_NAMESPACE =
  process.env.PROJECT_NOTIFICATION_IDS_NAMESPACE;

// Add a project notification. This is only ever called from within the backend
const addNotification = async (
  notificationType,
  projectId,
  notificationCreatorId,
  notificationObserverId,
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
    let notificationObject = db.models.notifications.build({
      nid: nid,
      rid: projectId,
      notificationType: notificationType,
      notificationCreator: notificationCreatorId,
      notificationObserver: notificationObserverId,
      notificationMessage: notificationMessage
    });
    notificationObject.toJSON();
    await notificationObject.save();

    // Successfully inserted project notification
    return "success";
  } catch (err) {
    console.error(err);
    return;
  }
};

// Add a chat notification. This is only ever called from within the backend
const addChatNotification = async (
  notificationType,
  notificationCreatorId,
  notificationObserverId,
  notificationMessage,
  submessage
) => {
  try {
    // Generate a notification ID
    let currentTime = new Date().getTime();
    let nid = uuidv5(
      notificationCreatorId + currentTime,
      NOTIFICATION_IDS_NAMESPACE
    );

    // Insert the notification into the database
    let notificationObject = db.models.notifications.build({
      nid: nid,
      rid: nid,
      notificationType: notificationType,
      notificationCreator: notificationCreatorId,
      notificationObserver: notificationObserverId,
      notificationMessage: notificationMessage,
      submessage: submessage
    });
    notificationObject.toJSON();
    await notificationObject.save();

    // Successfully inserted project notification
    return "success";
  } catch (err) {
    console.error(err);
    return;
  }
};

// Add a thread post notification. This is only ever called from within the backend
const addThreadNotification = async (
  notificationType,
  postId,
  notificationCreatorId,
  notificationObserverId,
  notificationMessage,
  submessage,
  url
) => {
  try {
    // Generate a notification ID
    let currentTime = new Date().getTime();
    let nid = uuidv5(
      notificationCreatorId + currentTime,
      NOTIFICATION_IDS_NAMESPACE
    );

    // Insert the notification into the database
    let notificationObject = db.models.notifications.build({
      nid: nid,
      rid: postId,
      notificationType: notificationType,
      notificationCreator: notificationCreatorId,
      notificationObserver: notificationObserverId,
      notificationMessage: notificationMessage,
      submessage: submessage,
      url: url
    });
    notificationObject.toJSON();
    await notificationObject.save();

    // Successfully inserted project notification
    return "success";
  } catch (err) {
    console.error(err);
    return;
  }
};

exports.addNotification = addNotification;
exports.addChatNotification = addChatNotification;
exports.addThreadNotification = addThreadNotification;
