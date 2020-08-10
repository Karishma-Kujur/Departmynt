import *  as types from '../constants/ActionTypes';

export function setOrderDetails(result) {
    return (dispatch) => {
        dispatch({
            type: types.SET_PAYMENT_METHODS,
            orderDetails: result
        }
        )
    };
}