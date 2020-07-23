import axios from 'axios';

import Constants from '../appConfig/Constants';

export function getTotes(id) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/mobileCart/getCart?user_id=${id}&consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.get(url).then(response => {
            resolve(response.data.data)
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    });
}

export function addToTote(data) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/mobileCart/add?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.post(url, data)
            .then(response => {
                resolve(response)
            }).catch(err => {
                console.log(err);
                reject(err)
            })
    });
}

export function editTote(data) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/mobileCart/update?user_id=${data.userId}&product_id=${data.productId}&quantity=${data.quantity}&consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.put(url)
            .then(response => {
                resolve(response)
            }).catch(err => {
                console.log(err);
                reject(err)
            })
    });
}

export function removeToteItem(data) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/mobileCart/deleteCart?user_id=${data.userId}&product_id=${data.productId}&consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.delete(url)
            .then(response => {
                resolve(response)
            }).catch(err => {
                console.log(err);
                reject(err)
            })
    });
}

export function clearTote(data) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/mobileCart/clear?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.post(url, data)
            .then(response => {
                resolve(response)
            }).catch(err => {
                console.log(err);
                reject(err)
            })
    });
}