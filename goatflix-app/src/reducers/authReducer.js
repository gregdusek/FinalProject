import { SET_ACTIVE_USER } from '../actions/typesOfActions';
import isEmpty from '../utilities/isEmpty';

const initialState = {
	isAuthenticated: false,
	user: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
	switch (action.type) {
		case SET_ACTIVE_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload,
			};
		default:
			return state;
	}
}