import axios from "axios";
import { USER_LOADED } from "./types";
import {setAlert} from "./alert";


export const update_user_info = ({uid, username, name, last_name, city_field, province, description}) => async dispatch => {

    const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            const url = "/api/users/profile";
            const body = {
                uid: uid,
                name: name, 
                last_name: last_name, 
                city_field: city_field, 
                province: province, 
                description: description};
            let response = await axios.put(url, body, config);
            // TODO: Add in a type for if the response fails, and then catch that type
            if (response) {
                //uid doesnt exist
                if (response.status === 400) {
                    dispatch(
                        setAlert("UID doesn't exist", "danger")
                    );
                }
                else if (response.status === 200) {
                    dispatch({
                        type: USER_LOADED,
                        payload: {
                            uid: uid,
                            username:username,
                            firstname: name,
                            lastname: last_name,
                            city: city_field,
                            province: province,
                            description: description
                        }
                    });
                    dispatch(
                        setAlert("Updated Profile", "success")
                    );
                }
                // Internal server error
                else {
                    console.log("500 Internal Server Error");    
                }
            } else {
                console.log("Couldn't retrieve user");
            }
        } catch (err) {
            console.log("Error occurred while retrieving user data");
            console.log(err);
        }

};
