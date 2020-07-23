import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useIsFocused } from '@react-navigation/native'
import { View, Dimensions, Text, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native'
import styles from '../assets/styles';
import OrderedItem from './OrderedItem'
import TrackOrder from './TrackOrder'
import * as ProductAction from '../actions/ProductAction';
import * as ProductApi from '../api/Products'
import AppLayout from '../components/shared/AppLayout';

const { width, height } = Dimensions.get("window");

const OrderHistory = (props) => {
    const { navigation, ProductAction, orderHistory, products, user } = props
    const [spinner, setLoader] = useState('')
    const [trackOrder, setTrackOrder] = useState(false)

    const getDataById = (data) => {
        const orders = [...data];
        data.forEach((order, index) => {
            const orderedItems = []
            order.list.forEach((item) => {
                let product = products.find((element) => item.product_id === element.id)
                if (product) {
                    orderedItems.push(
                        {
                            ...item,
                            images: product.images
                        }
                    )
                }
            })
            orders[index].list = orderedItems
        })
        return orders;
    }

    const getOrderHistory = () => {
        setLoader(true)
        ProductAction.setOrderHistory([])
        ProductApi.getOrderHistory(user.id)
            .then((result) => {
                setLoader(false)
                ProductAction.setOrderHistory(getDataById(result))

            })
            .catch((error) => {
                setLoader(false)
            })
    }

    const isFocused = useIsFocused()
    useEffect(() => {
        getOrderHistory(user.id)
    }, [isFocused])

    return (
        <AppLayout title={"My Orders"} spinner={spinner} openDrawer={() => { navigation.openDrawer() }}>
            <ScrollView>
                {orderHistory.length ?
                    <FlatList
                        data={orderHistory}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <OrderedItem
                                id={item.id}
                                orderNumber={item.orderKey}
                                price={item.total}
                                status={item.status}
                                list={item.list}
                                currency={item.currency}
                                currencySymbol={item.currencySymbol}
                                setTrackOrder={() => setTrackOrder(true)}
                            />
                        )}
                    /> :
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: height / 3 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', width: '100%', textAlign: 'center'}}> No items ordered yet</Text>
                    </View>
                }
            </ScrollView>
        </AppLayout>
    )
}

const mapStateToProps = ({ products, user }) => {
    return {
        orderHistory: products.orderHistory || [],
        products: products.list,
        user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        ProductAction: bindActionCreators(ProductAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)

