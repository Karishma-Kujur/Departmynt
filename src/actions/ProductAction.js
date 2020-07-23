import *  as types from '../constants/ActionTypes';

export function setProducts(result) {
    return (dispatch) => {
        dispatch({
            type: types.GET_PRODUCTS_SUCCESS,
            products: result
        }
        )
    };
}

export function setMatches(result) {
    return (dispatch) => {
        dispatch({
            type: types.GET_MATCHES_SUCCESS,
            matches: result
        }
        )
    };
}

export function setFavorites(result) {
    return (dispatch) => {
        dispatch({
            type: types.SET_FAVORITES,
            favorites: result
        }
        )
    };
}

export function setOrderHistory(result) {
    return (dispatch) => {
        dispatch({
            type: types.SET_ORDER_HISTORY,
            orderHistory: result
        }
        )
    };
}