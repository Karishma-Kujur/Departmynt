import axios from 'axios';

import Constants from '../appConfig/Constants';

export function login(data) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/user/login?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.post(url, data, { headers: { 'content-type': 'application/json' } })
            .then(response => {
                resolve(getUserData(response.data))
            }).catch(err => {
                console.log(err);
                reject(err)
            })
    });
}

export function logout() {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/user/logout?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.post(url, { headers: { 'content-type': 'application/json' } })
            .then(response => {
                resolve(response.data)
            }).catch(err => {
                console.log(err);
                reject(err)
            })
    });
}

const getUserData = (result) => {
    let userData = result.data;
    return {
        id: userData.ID,
        displayName: userData.display_name,
        email: userData.user_email
    }

}

export function forgotPassword(data) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/bdpwr/v1/reset-password`
        axios.post(url, data,{ headers: { 'content-type': 'application/json' } })
            .then(response => {
                resolve(response.data)
            }).catch(err => {
                console.log(err);
                reject(err)
            })
    });
}

export function resetPassword(data) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/bdpwr/v1/set-password`
        axios.post(url, data,{ headers: { 'content-type': 'application/json' } })
            .then(response => {
                resolve(response.data)
            }).catch(err => {
                console.log(err);
                reject(err)
            })
    });
}