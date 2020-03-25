import axios from "axios";
import { GET_HACKATHONS, ADD_HACKATHONS } from "./types"

export const addHackathons = () => async dispatch => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    var temporary = [
        {
            name: 'LA Hacks',
            date: 'MAR 27TH - 29TH',
            location: 'Los Angeles, CA',
            link: 'https://www.lahacks.com'
        },
        {
            name: 'WinHacks',
            date: 'MAR 27TH - 29TH',
            location: 'Windsor, ON',
            link: 'https://www.winhacks.ca'
        },
        {
            name: 'HooHacks',
            date: 'MAR 28TH - 29TH',
            location: 'Charlottesville, VA',
            link: 'https://www.hoohacks.io'
        },
        {
            name: 'RowdyHacks',
            date: 'MAR 28TH - 29TH',
            location: 'San Antonio, TX',
            link: 'https://www.rowdyhacks.io'
        }
    ];

    for(var i = 0; i<temporary.length; i++){

        const body = JSON.stringify({
            name: temporary[i].name,
            date: temporary[i].date,
            location: temporary[i].location,
            link: temporary[i].link
        });

        try {
            const res = await axios.post("/api/hackathons/add", body, config);

            // If success, dispatch action
            if (res) {
                dispatch({
                    type: ADD_HACKATHONS,
                    payload: res.data
                });
            } else {
                console.log("Couldn't add venture");
            }
        } catch (err) {
            console.log("Error occured while creating a project");
            console.log(err);
        }
    }
}


export const getHackathons = () => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const res = await axios.get("/api/hackathons", config);
        
        // If success, dispatch action
        if (res) {
            dispatch({
                type: GET_HACKATHONS,
                payload: res.data.hackathons_obj.hackathons_lst         
            });
        }

    } catch (err) {
        console.log("Error occured when retrieving hackathons");
        console.log(err);
    }
};
