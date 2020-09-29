import axios from 'axios';

import Constants from '../appConfig/Constants';

export function getVariants(id) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/product/getVariations?ids=${id}&consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.get(url).then(response => {
            resolve(getVariantsByResult(response.data.data, id))
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    });
}

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
        const url = `${Constants.URL.wc}/mobileCart/update?user_id=${data.userId}&product_id=${data.productId}&variation_id=${data.variation_id}&quantity=${data.quantity}&consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
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

const getVariantsByResult = (result) => {
    let variants = []
    Object.keys(result).forEach((id) => {
        result[id].forEach((product) => {
            variants.push({
                productId: id,
                stock: product.max_qty,
                variationId: product.variation_id,
                size: product.attributes.attribute_pa_size,
                color: product.attributes.attribute_pa_color
            })
        })
    });
    return variants
}