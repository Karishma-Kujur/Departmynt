import axios from 'axios';

import Constants from '../appConfig/Constants';
import *  as types from '../constants/ActionTypes';

export function getUserDetails(userId) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/wc/v3/customers/${userId}?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.get(url).then(response => {
            resolve(getUserFromResult(response.data))
        }).catch(err => {
            reject(err.response.data.message)
        })
    });
}

export function updateUserDetails(userId, data) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/wc/v3/customers/${userId}?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.put(url, data).then(response => {
            resolve(getUserFromResult(response.data))
        }).catch(err => {
            reject(err.response.data.message)
        })
    });
}

const getUserFromResult = (result) => {
    const userData = result
    return {
        id: userData.id,
        firstName: userData.first_name,
        lastName: userData.last_name,
        email: userData.email,
        imageUrl: userData.avatar_url,
        billing: userData.billing,
        shipping: userData.shipping
    }
}