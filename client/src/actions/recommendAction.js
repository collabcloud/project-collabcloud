import axios from "axios";
import { RECOMMEND } from "./types";
import techSuggestionsArray from "../utils/techSuggestions";

export const recommendProjects = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    //const techDict = techSuggestionsArray;
    const res = await axios.get("/api/projects/", config);
    const res2 = await axios.get("/api/users/auth");
    // If success, dispatch action
    if (res && res2) {
      let userinterests = res2.data[0].interestedTech;

      userinterests = userinterests.split("");
      let projects = res.data.projects_obj.projects_lst;
      let recommendlst = [];
      for (let i = 0; i < projects.length; i++) {
        if (projects[i].ownerId !== res2.data[0].uid) {
          let projectTech = projects[i].technologiesUsed;
          projectTech = projectTech.split("");
          let related = [];

          for (let j = 0; j < userinterests.length; j++) {
            if (projectTech[j] === "1" && userinterests[j] === "1") {
              related.push(techSuggestionsArray[j]);
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
        payload: recommendlst,
      });
    } else {
      console.log("Couldn't get projects");
    }
  } catch (err) {
    console.log("Error occured when retrieving projects");
    console.log(err);
  }
};
