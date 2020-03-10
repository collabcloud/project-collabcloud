import { USER } from "../actions/types";

// This initial state is a representation of what we need to store in the store
const initialState = {
	follower: "",
	followee: ""
};

// Takes the previous state, and an action, and returns the next state
export default (state = initialState, action) => {
	// Determine which type of action was sent to the store
	switch (action.type) {
		case USER:
			return {
				// for syntax, see https://redux.js.org/recipes/using-object-spread-operator/
				...state
			};
		default:
			return state;
	}
};
