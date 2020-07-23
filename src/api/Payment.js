import axios from 'axios';

import Constants from '../appConfig/Constants';

export function doPayment(data) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/wc/v2/stripe_payment?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.post(url, data).then(response => {
            resolve(response.data)
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    });
}