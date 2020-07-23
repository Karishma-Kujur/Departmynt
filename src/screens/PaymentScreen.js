import React, { useState } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import styles from '../assets/styles';
import Button from '../components/shared/Button'
import Back from '../assets/images/back.png'
import { CreditCardInput } from "react-native-credit-card-input";

const { width, height } = Dimensions.get("window");

const PaymentScreen = (props) => {
    const { navigation } = props
    const onChangeCardDetails = (form) => {
        // console.log(form)
    }

    return (
        <View style={{ marginTop: 40, height: height - 50 }}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('View Tote')
                }}
                    style={{ marginLeft: 20 }}>
                    <Image source={Back} style={{ width: 24, height: 24, borderRadius: 12 }} />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 20 }}>Payment</Text>
            </View>
            <ScrollView>
                <View style={{ marginTop: 20, justifyContent: 'center', flexDirection: 'row' }}>
                    <CreditCardInput onChange={onChangeCardDetails} />
                </View>
            </ScrollView>
            <View style={{
                flex: 1,
                justifyContent: 'flex-end',
                paddingLeft: 10,
                paddingRight: 10
            }}>
                <Button label="Pay Now" onPress={() => { navigation.navigate('Order Placed') }} />
            </View>
        </View>
    )
}
export default PaymentScreen