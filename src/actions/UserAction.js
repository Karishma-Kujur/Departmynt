import *  as types from '../constants/ActionTypes';

export function setUser(result) {
    return (dispatch) => {
        dispatch({
            type: types.SET_USER_DATA,
            user: result
        }
        )
    };
}