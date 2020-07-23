import * as types from '../constants/ActionTypes';
import InitialState from './InitialState';

export default function (state = InitialState.tote, action) {
	switch (action.type) {
		case types.GET_TOTES_SUCCESS:
			return action.tote;
		default:
			return state;
	}
}