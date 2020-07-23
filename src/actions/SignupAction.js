import axios from 'axios';

import Constants from '../appConfig/Constants';

export function signupUser(data) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/wc/v3/customers?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.post(url, data, { headers: { 'content-type': 'application/json' } })
            .then(response => {
                resolve(response)
            }).catch(err => {
                console.log(err);
                reject(err)
            })
    });
}