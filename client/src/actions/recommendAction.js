import axios from "axios";
import {RECOMMEND} from './types';


export const recommendProjects = () => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {

        const techDict = {
            1:"MongoDB",
            2:"Express",
            3:"React",
            4:"Node.js",
            5:"Python",
            6:"JavaScript",
            7:"Java",
            8:"C++",
            9:"C#",
            10:"HTML/CSS",
            11:"Swift",
            12:"SQL",
            13:"MongoDB",
            14:"Express",
            15:"React",
            16:"Angular",
            16:"VueJS",
            18:"Flutter",
            19:"Kubernetes",
            20:"Jupyter",
            21:"Pytorch",
            22:"Numpy",
            23:"Passport",
            24:"Kotlin"
        }

        const res = await axios.get("/api/projects/", config);
        const res2 = await axios.get("/api/users/auth");
        
        // If success, dispatch action
        if (res && res2) {
            var userinterests = res2.data[0].interestedTech;
            userinterests.split("");
            var projects = res.data.projects_obj.projects_lst;
            var recommendlst = [];
            for(var i = 0; i < projects.length; i++) {
                if(projects[i].ownerId != res2.data[0].uid) {
                    var projectTech = projects[i].technologiesUsed;
                    projectTech.split("");
                    var related = [];
                    for(var j = 0; j < userinterests.length; j++) {
                        if(projectTech[j] == 1 && userinterests[j] == 1) {
                            related.push(techDict[j + 1]);
                        }
                    }
                    if(related.length > 0) {
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