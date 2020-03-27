import axios from "axios";
import { GET_PROJECT_NOTIFICATIONS } from "./types"

// Get notifications related to projects
export const getProjectNotifications = (uid , notificationsToGet) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        // TODO: Sometimes, these variables are null when the user logs into the dashboard for the first time.. check out the bug
        if (uid && notificationsToGet) {
            const res = await axios.get("/api/notifications/project/get", {
                params: {
                    userId: uid,
                    notificationsToGet: notificationsToGet
                }
            }, config);
    
            // If success, dispatch action
            if (res) {
                dispatch({
                    type: GET_PROJECT_NOTIFICATIONS,
                    payload: res.data
                });
            } else {
                console.log("Couldn't get notifications");
            }
        } else {
            console.log("Could not get notifications... sett notificationActions.js");
        }
    } catch (err) {
        console.log("Error occured while getting notifications");
        console.log(err);
    }
};