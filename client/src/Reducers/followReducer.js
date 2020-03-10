import { USER, USER_NOT_FOUND, ALREADY_FOLLOWED} from "../actions/types";

// This initial state is a representation of what we need to store in the store
const initialState = {
	followed: false
};

// Takes the previous state, and an action, and returns the next state
export default (state = initialState, action) => {
	// Determine which type of action was sent to the store
	switch (action.type) {
		case ALREADY_FOLLOWED:
			return {
				... state,
				followed: true
			};
		case USER:
			return {
				... state,
				followed: true
			};
		case USER_NOT_FOUND:
			return state;
		default:
			return state;
	}
};
