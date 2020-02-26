import axios from "axios";
import {LOGIN} from "./types";


export const login = (username, password) => async dispatch => {
    console.log("Redux register");
    console.log(username);
    console.log(password);

    const config = {
        headers : {
            "Content-Type": "application/json"
        }
    }
    try{
        const url = '/api/users/login';
        const body = JSON.stringify({username, password});

        let response = await axios.post(url,body,config);
        console.log("response"+response);
        console.log("response status"+response.status);
        if(response){
            console.log("if response")
            dispatch({
                type: LOGIN,
                payload: response.data
            });
        }else{
            console.log("Couldnt login");
        }
    } catch(err){
        console.log("Error Logging In");
        console.log(err);
    }
};