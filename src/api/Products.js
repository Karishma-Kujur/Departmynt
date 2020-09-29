import axios from 'axios';

import Constants from '../appConfig/Constants';

export function getCategory(userId) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/user_survey/getCategoryResults?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}&userId=${userId}`
        axios.get(url).then(response => {
            resolve(response.data)
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    });
}

export function getProductIds(userId) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/user/getMatchedProduct?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}&userId=${userId}`
        axios.get(url).then(response => {
            resolve(response.data)
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    });
}

export function getProducts(productIds) {
    return new Promise((resolve, reject) => {
        let url = ''
        if (productIds)
            url = `${Constants.URL.wc}/wc/v3/products?per_page=100&consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}&include=${productIds}`
        // url = `${Constants.URL.wc}/wc/v3/products?per_page=100&consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}&category=${categories}`
        else
            url = `${Constants.URL.wc}/wc/v3/products?per_page=100&consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.get(url).then(response => {
            resolve(getProjectsFromResult(response.data))
        }).catch(err => {
            reject(err.response.data.message)
        })
    });
}

export function saveProducts(data) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/user/favorite?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.post(url, data).then(response => {
            resolve(response.data)
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    });
}

export function removeFromFavorites(productId, userId) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/user/delete_favorite?user_id=${userId}&product_id=${productId}&consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.delete(url).then(response => {
            resolve(response.data)
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    });
}

export function getFavorites(userId) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/user/get_favorite?user_id=${userId}`
        axios.get(url).then(response => {
            resolve(response.data)
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    });
}

export function placeOder(data) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/wc/v3/orders?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.post(url, data).then(response => {
            resolve(response.data)
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    });
}

export function getOrderHistory(userId) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/wc/v3/orders?customer=${userId}&consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.get(url).then(response => {
            resolve(getOrderHistoryFromResult(response.data))
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    });
}

export function removeFromMatches(data) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/user/loseIt?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.post(url, data).then(response => {
            resolve(response.data)
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    });
}

const getProjectsFromResult = (result) => {
    const productsList = result
    const products = []
    productsList.forEach((product) => {
        products.push({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            attributes: getProductAttributes(product.attributes),
            images: getProductImages(product.images),
            stockStatus: product.stock_status,
            stockQuantity: getStockQuantity(product.stock_quantity || 10)
        })
    })
    return products;
}

const getStockQuantity = (quantities) => {
    const data = []
    for(let index = 0; index<= quantities; index++) {
        data.push({
            value: index.toString(),
            label: index.toString()
        })
    }
    return data
}

const getProductAttributes = (attributes) => {
    const data = []
    attributes.forEach((element) => {
        data.push({
            id: element.id,
            name: element.name,
            options: getOptions(element.options)
        })
    })
    return data
}

const getOptions = (options) => {
    let data = []
    options.forEach((option) => {
        data.push({
            value: option,
            label: option
        })
    })
    return data
}

const getProductImages = (images) => {
    const productImages = []
    images.forEach((image) => {
        productImages.push(image.src)
    })
    return productImages
}

const getOrderHistoryFromResult = (result) => {
    const orderDetails = result
    const orderHistory = []
    orderDetails.forEach((element) => {
        orderHistory.push({
            id: element.id,
            status: element.status,
            total: element.total,
            paymentMethod: element.payment_method,
            currency: element.currency,
            currencySymbol: element.currency_symbol,
            list: element.line_items,
            orderKey: element.order_key
        })
    })
    return orderHistory;
}
