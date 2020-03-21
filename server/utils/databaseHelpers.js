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
        return;
    }
};

exports.getUsername = getUsername;