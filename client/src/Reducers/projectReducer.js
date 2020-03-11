import {
	ADD_PROJECT,
	GET_PROJECT,
	GET_PUBLIC_PROJECTS,
	PROJECT_LOADING
} from "../actions/types";

const initialState = {
	projects: [],
	loading: true,
	individualProject: {
        "project": {
            "technologiesUsed": []
        }
    }
};

export default (state = initialState, action) => {
	switch (action.type) {
		// Add a project to the database
		case ADD_PROJECT:
			return {
				...state,
				loading: false
			};
		// Get a list of all public projects
		case GET_PUBLIC_PROJECTS:
			return {
				...state,
				loading: false,
				projects: action.payload
			};
		// Get all information for a project
		case GET_PROJECT:
			return {
				...state,
				loading: false,
				individualProject: action.payload
			};
		default:
			return state;
	}
};
