import React, { useState } from 'react';
import { View, Text, Dimensions, ScrollView, Image } from 'react-native';
import Success from '../assets/images/order-placed.png'
import Button from '../components/shared/Button'
import styles from '../assets/styles';

const { width, height } = Dimensions.get("window");

const OrderPlaced = (props) => {
    const { navigation } = props
    return (
        <View style={styles.containerMatches}>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 150 }}>
                <Image source={Success} style={{ width: 200, height: 200, borderRadius: 100 }} />
                <Text style={{marginTop: 20, fontSize: 18, fontWeight: 'bold'}}>Order Successfully Placed!</Text>
                <Text style={{margin: 20, fontSize: 16 }}>Your order has been successfully paced and has been processed for delivery.</Text>
            </View>
            <View style={styles.bottom}>
                <Button label="Continue Shopping" onPress={() => { navigation.navigate('View Rack') }} />
            </View>
        </View>
    )
}
export default OrderPlaced