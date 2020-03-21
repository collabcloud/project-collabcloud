import {
	ADD_PROJECT,
	GET_PROJECT,
	UPDATE_PROJECT,
	DELETE_PROJECT,
	GET_PUBLIC_PROJECTS,
	JOIN_PROJECT,
	LEAVE_PROJECT
} from "../actions/types";

const initialState = {
	projects: [],
	loading: true,
	updateSuccess: false,
	deleteSuccess: false,
	individualProject: {
        "project": {
            "technologiesUsed": []
		},
		"collaborators": []
	},
	joinSuccess: false,
	leaveSuccess: false
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
		// Update information for a project
		case UPDATE_PROJECT:
			return {
				...state,
				updateSuccess: true
			};
		// Delete a project
		case DELETE_PROJECT:
			return {
				...state,
				deleteSuccess: true
			};
		// User joins a project
		case JOIN_PROJECT:
			return {
				...state,
				joinSuccess: true
			};
		// User leaves a project
		case LEAVE_PROJECT:
			return {
				...state,
				leaveSuccess: true
			}
		default:
			return state;
	}
};
