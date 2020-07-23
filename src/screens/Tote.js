import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useIsFocused } from '@react-navigation/native'
import { View, Dimensions, Text, ScrollView, TouchableOpacity, FlatList, Image, Linking } from 'react-native'
import Button from '../components/shared/Button'
import styles from '../assets/styles';
import ToteItem from './ToteItem'
import * as ToteAction from '../actions/ToteAction';
import * as ToteApi from '../api/Tote'
import AppLayout from '../components/shared/AppLayout';

const { width, height } = Dimensions.get("window");

const ToteScreen = (props) => {
    const { navigation, ToteAction, toteItems, user, products } = props
    const [spinner, setLoader] = useState('')
    const [addAddress, setAddAddress] = useState(false)
    const [selectAddress, showSelectAddress] = useState(false)
    const [price, setPrice] = useState(0)
    const [total, setTotal] = useState(0)

    const getToteByProductId = (data) => {
        const toteItems = [];
        data.forEach((element) => {
            let item = products.find((product) => product.id === Number(element.product_id))
            if (item)
                toteItems.push({
                    ...element,
                    ...item
                })
        })
        return toteItems;
    }

    const getTotes = () => {
        setLoader(true)
        ToteAction.setTotes([])
        ToteApi.getTotes(user.id)
            .then((result) => {
                let toteItems = getToteByProductId(result)
                ToteAction.setTotes(toteItems)
                setLoader(false)
            })
            .catch((error) => {
                setLoader(false)
            })
    }

    const isFocused = useIsFocused()
    useEffect(() => {
        getTotes()
    }, [isFocused])

    useEffect(() => {
        let totalPrice = 0
        toteItems.forEach((item) => {
            totalPrice = totalPrice + (Number(item.price) * Number(item.quantity))
        })
        setPrice(totalPrice)
        setTotal(totalPrice)
    }, [toteItems])

    const handleRefreshTote = () => {
        getTotes()
    }


    const handleProceedToShipping = () => {
        navigation.navigate('Checkout')
    }

    return (
        <AppLayout spinner={spinner} title={"Tote"} openDrawer={() => { navigation.openDrawer() }}>
            <ScrollView>
                <FlatList
                    data={toteItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <ToteItem
                            id={item.id}
                            productId={item.product_id}
                            image={item.images && item.images[0]}
                            name={item.name}
                            price={item.price}
                            quantity={item.quantity}
                            attributes={item.attributes}
                            user={user}
                            toteEdited={handleRefreshTote}
                        />
                    )}
                />

                <View style={{ padding: 10 }}>
                    {toteItems.length ?
                        <>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Price Details:</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 16, marginBottom: 10 }}>{"Price (" + toteItems.length + " items)"}</Text>
                                <Text style={{ fontSize: 16, marginBottom: 10 }}>{"$ " + price}</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 16, marginBottom: 10 }}>{"Delivery Fee"}</Text>
                                <Text style={{ fontSize: 16, marginBottom: 10 }}>0.00</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 16, marginBottom: 10 }}>{"Total Amount"}</Text>
                                <Text style={{ fontSize: 16, marginBottom: 10 }}>{"$ " + total}</Text>
                            </View>
                        </> : <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: height / 3 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', width: '100%', textAlign: 'center'}}> No items available in your cart</Text>
                        </View>
                    }
                </View>
            </ScrollView>
            <View style={styles.bottom}>
                {toteItems.length ?
                    <Button label="Proceed to shipping" onPress={handleProceedToShipping} />
                    :
                    <Button label="Shop Now" onPress={() => navigation.navigate('View Rack')} />}
            </View>
        </AppLayout>
    )
}

const mapStateToProps = ({ products, tote, user }) => {
    return {
        products: products.list,
        toteItems: tote,
        user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        ToteAction: bindActionCreators(ToteAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ToteScreen)

