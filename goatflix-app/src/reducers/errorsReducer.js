import { SET_ERRORS } from '../actions/typesOfActions';

const initialState = {};

// Allows the payload to be passed to the initialState under SET_ERRORS

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
	switch (action.type) {
		case SET_ERRORS:
			return action.payload;
		default:
			return state;
	}
}