// This file is used to store database helper functions
// These functions should only be called from within the backend server

const db = require("../database.js");

// Given a user's userId, return their username
const getUsername = async (uid) => {
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
    } 
    // If the username does not exist, return null
    catch (err) {
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
            isOwner: (isOwner === "owner") ? true : false
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
const removeAllUsersFromProject = async (pid) => {
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
}

exports.getUsername = getUsername;
exports.addUserToProject = addUserToProject;
exports.removeAllUsersFromProject = removeAllUsersFromProject;