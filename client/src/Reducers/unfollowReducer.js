import { USER, USER_NOT_FOUND, ALREADY_UNFOLLOWED} from "../actions/types";

// This initial state is a representation of what we need to store in the store
const initialState = {
	unfollowed: true
};

// Takes the previous state, and an action, and returns the next state
export default (state = initialState, action) => {
	// Determine which type of action was sent to the store
	switch (action.type) {
		case ALREADY_UNFOLLOWED:
			return {
				...state,
				unfollowed: !state.unfollowed
			};
		case USER:
			return {
				...state,
				unfollowed: !state.unfollowed
			};
		case USER_NOT_FOUND:
			return state;
		default:
			return state;
	}
};
