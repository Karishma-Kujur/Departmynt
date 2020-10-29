import * as types from '../constants/ActionTypes';
import { Record } from 'immutable'


const ToteRecords = Record({
	list: [],
	shippingCharges: 0,
})
const initialState = new ToteRecords()

export default function (state = initialState, action) {
	switch (action.type) {
		case types.GET_TOTES_SUCCESS:
			return {
				...state,
				list: action.tote
			};
		case types.SET_SHIPPING_CHARGES:
			return {
				...state,
				shippingCharges: action.shippingCharges
			};
		default:
			return state;
	}
}