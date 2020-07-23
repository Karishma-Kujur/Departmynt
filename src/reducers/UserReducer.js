import * as types from '../constants/ActionTypes';
import InitialState from './InitialState';

export default function (state = InitialState.user, action) {
	switch (action.type) {
		case types.SET_USER_DATA:
			return action.user;
		default:
			return state;
	}
}