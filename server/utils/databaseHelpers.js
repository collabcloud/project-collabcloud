// This file is used to store database helper functions
// These functions should only be called from within the backend server

const db = require("../database.js");

// Given a user's userId, return their username
const getUsername = async uid => {
  // Get the username associated with this userid
  try {
    const user = await db.models.user.findOne({
      where: {
        uid: uid
      }
    });
    if (user) {
      return user.dataValues.username;
    }
  } catch (err) {
    // If the username does not exist, return null
    console.log(err);
    return;
  }
};

// Given a projects's projectId, return the project name
const getProjectName = async pid => {
  // Get the project name associated with this userid
  try {
    const project = await db.models.project.findOne({
      where: {
        pid: pid
      }
    });
    if (project) {
      return project.dataValues.projectName;
    }
  } catch (err) {
    // If the project does not exist, return null
    console.log(err);
    return;
  }
};

// Given a user and project, add the user to that project
const addUserToProject = async (uid, username, pid, isOwner) => {
  try {
    const success = await db.models.user_follows_project.create({
      userUid: uid,
      username: username,
      projectPid: pid,
      isOwner: isOwner === "owner" ? true : false
    });
    if (success) {
      return "success";
    }
  } catch (err) {
    console.log(err);
    return;
  }
};

// Given a project, remove all users from that project
const removeAllUsersFromProject = async pid => {
  try {
    const records = await db.models.user_follows_project.destroy({
      where: {
        projectPid: pid
      }
    });
    if (records) {
      return "success";
    }
  } catch (err) {
    console.log(err);
    return;
  }
};

// Given a project, remove all notifications for that project
const removeAllProjectNotifications = async pid => {
  try {
    const records = await db.models.notifications.destroy({
      where: {
        rid: pid
      }
    });
    if (records) {
      return "success";
    }
  } catch (err) {
    console.log(err);
    return;
  }
};

const convertToTitle = str => {
  var words = str.split("-");
  var new_title = words[0];

  for (var i = 1; i < words.length; i++) {
    new_title += " " + words[i];
  }
  return new_title;
};

const convertToTitleCap = str => {
  var words = str.split("-");
  const first_word = words[0][0].toUpperCase() + words[0].slice(1);
  var new_title = first_word;

  for (var i = 1; i < words.length; i++) {
    new_title += " " + words[i][0].toUpperCase() + words[i].slice(1);
  }
  return new_title;
};

const generateURL = (subforum, title, isParent) => {
  const subforum_url =
    "/forum/" +
    subforum
      .toLowerCase()
      .split(" ")
      .join("-") +
    "/";
  if (isParent) {
    return subforum_url;
  }
  const url =
    subforum_url +
    title
      .replace("?", "")
      .toLowerCase()
      .split(" ")
      .join("-") +
    "/";

  return url;
};

exports.convertToTitleCap = convertToTitleCap;
exports.convertToTitle = convertToTitle;
exports.getUsername = getUsername;
exports.addUserToProject = addUserToProject;
exports.removeAllUsersFromProject = removeAllUsersFromProject;
exports.getProjectName = getProjectName;
exports.removeAllProjectNotifications = removeAllProjectNotifications;
exports.generateURL = generateURL;
