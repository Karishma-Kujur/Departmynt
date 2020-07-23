import *  as types from '../constants/ActionTypes';

export function setPaymentMethods(result) {
    return (dispatch) => {
        dispatch({
            type: types.SET_PAYMENT_METHODS,
            paymentMethods: result
        }
        )
    };
}