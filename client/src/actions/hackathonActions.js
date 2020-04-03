import axios from "axios";
import { GET_HACKATHONS, ADD_HACKATHONS } from "./types";

export const addHackathons = () => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  var temporary = [
    {
      name: "Hack Quarantime",
      date: "MAR 23RD - APR 12TH",
      location: "Worldwide",
      link: "https://hackquarantine.com/"
    },
    {
      name: "Local Hack Day: Share",
      date: "APR 2ND - 20TH",
      location: "Worldwide",
      link: "https://localhackday.mlh.io/"
    }
  ];

  for (var i = 0; i < temporary.length; i++) {
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
};

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
