import { combineReducers } from 'redux';
import products from './ProductReducer';
import tote from './ToteReducer';
import survey from './SurveyReducer';
import user from './UserReducer';
import payment from './PaymentReducer'

const RootReducer = combineReducers({
	products,
	tote,
	survey,
	user,
	payment
});

export default RootReducer;