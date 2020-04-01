import axios from "axios";
import { RECOMMEND } from "./types";
import techSuggestionsArray from "../utils/techSuggestions";

export const recommendProjects = () => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const techDict = techSuggestionsArray;
    const res = await axios.get("/api/projects/", config);
    const res2 = await axios.get("/api/users/auth");

    // If success, dispatch action
    if (res && res2) {
      var userinterests = res2.data[0].interestedTech;
      userinterests.split("");
      var projects = res.data.projects_obj.projects_lst;
      var recommendlst = [];
      for (var i = 0; i < projects.length; i++) {
        if (projects[i].ownerId !== res2.data[0].uid) {
          var projectTech = projects[i].technologiesUsed;
          projectTech.split("");
          var related = [];
          for (var j = 0; j < userinterests.length; j++) {
            if (projectTech[j] === 1 && userinterests[j] === 1) {
              related.push(techDict[j + 1]);
            }
          }
          if (related.length > 0) {
            projects[i].relation = related;
            recommendlst.push(projects[i]);
          }
        }
      }
      dispatch({
        type: RECOMMEND,
        payload: recommendlst
      });
    } else {
      console.log("Couldn't get projects");
    }
  } catch (err) {
    console.log("Error occured when retrieving projects");
    console.log(err);
  }
};
