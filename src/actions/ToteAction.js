import axios from 'axios';

import Constants from '../appConfig/Constants';
import *  as types from '../constants/ActionTypes';

export function setTotes(data) {
    return (dispatch) => {
        dispatch({
            type: types.GET_TOTES_SUCCESS,
            tote: data
        })
    };
}

export function addToTote(data) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/wc/store/cart/items?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.post(url, data, { headers: { 'content-type': 'application/json' } })
            // return axios.get(url)
            .then(response => {
                console.log(response.data)
                resolve(response)
            }).catch(err => {
                console.log(err);
                reject(err)
            })
    });
}

export function editTote(data) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/cocart/v1/item?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.post(url, data, { headers: { 'content-type': 'application/json' } })
            // return axios.get(url)
            .then(response => {
                console.log(response.data)
                resolve(response)
            }).catch(err => {
                console.log(err);
                reject(err)
            })
    });
}

export function setShippingCharges(data) {
    return (dispatch) => {
        dispatch({
            type: types.SET_SHIPPING_CHARGES,
            shippingCharges: data
        })
    };
}