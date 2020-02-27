import axios from "axios";
import { GET_TOKEN, GITHUB_EXISTS, ATTEMPT} from "./types";

// Registeration action
export const register = (auth_code, formData) => async dispatch => {
    //console.log("Redux register");
    //console.log(auth_code);
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
        const url = '/api/users/register';
        const body = JSON.stringify({code: auth_code, ...formData})
        dispatch({
            type: ATTEMPT
        });
        let response = axios.post(url, body, config);
        
        // If success, dispatch action
        // TODO: Check the response for whether or not the user is 
        // already registered on github or not
        response.then(()=>{
            console.log("Registered");
            dispatch({
                type: GET_TOKEN,
                payload: response.data
            });
        }).catch((err) => {
            console.log(err.response.status);
            if(err.response.status == 301){
                console.log("GITHUB_EXISTS");
                dispatch({
                    type: GITHUB_EXISTS
                })
            }
            console.log("Error occurred while registering");
        });
    
};