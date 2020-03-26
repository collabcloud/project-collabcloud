import {
	GET_HACKATHONS,
	ADD_HACKATHONS
} from "../actions/types";


const initialState = {
	hackathons: [],
	loading: true
};
export default (state = initialState, action) => {
	switch (action.type) {
		// Get a list of all hackathons
		case GET_HACKATHONS:
			return {
				...state,
				loading: false,
				hackathons: action.payload
			};
		case ADD_HACKATHONS:
			return {
				...state,
				loading: false,
			}
		default:
			return state;
	}
};
