import * as types from '../constants/ActionTypes';
import { Record } from 'immutable'

const ProductsRecords = Record({
	list: [],
	favorites: [],
	orderHistory: [],
	matches: []
})
const initialState = new ProductsRecords()

export default function (state = initialState, action) {
	switch (action.type) {
		case types.GET_PRODUCTS_SUCCESS:
			return {
				...state,
				list: action.products
			}
		case types.SET_FAVORITES:
			return {
				...state,
				favorites: action.favorites
			}
		case types.SET_ORDER_HISTORY:
			return {
				...state,
				orderHistory: action.orderHistory
			}
		case types.GET_MATCHES_SUCCESS:
			return {
				...state,
				matches: action.matches
			}
		default:
			return state;
	}
}