import axios from "axios";
import { GET_USERS } from "./types"

//Get All Users 

export const getUsers = () => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const res = await axios.get("/api/users/public", config);

        // If success, dispatch action
        if (res) {
            dispatch({
                type: GET_USERS,
                payload: res.data.users_obj.users_lst
            });
        } else {
            console.log("Couldn't get users");
        }
    } catch (err) {
        console.log("Error occured when retrieving users");
        console.log(err);
    }
};