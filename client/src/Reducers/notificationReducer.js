import {
	GET_PROJECT_NOTIFICATIONS
} from "../actions/types";

const initialState = {
	projectNotifications: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		// Get nofications related to projects
		case GET_PROJECT_NOTIFICATIONS:
			return {
				...state,
				projectNotifications: action.payload
			};
		default:
			return state;
	}
};
