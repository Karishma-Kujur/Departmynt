import * as types from '../constants/ActionTypes';
import { Record } from 'immutable'

const PaymentRecords = Record({
	paymentMethods: []
})
const initialState = new PaymentRecords()

export default function (state = initialState, action) {
	switch (action.type) {
		case types.SET_PAYMENT_METHODS:
			return state.set('paymentMethods', action.paymentMethods);
		default:
			return state;
	}
}