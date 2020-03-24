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
    } catch (err) {
        console.log("Error occured while getting notifications");
        console.log(err);
    }
};