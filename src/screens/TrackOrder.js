import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from '../assets/styles/trackOrder'
import Close from '../assets/images/close.png'

const TrackOrder = (props) => {
    const { closeTackOrder } = props
    return (
        <View style={styles.trackOrderContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}> Track your Order </Text>
                <TouchableOpacity onPress={closeTackOrder}>
                    <Image source={Close}
                        style={{ width: 30, height: 30, borderRadius: 15 }}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
                <View>
                    <Text style={styles.titleText}>ESTIMATED DELIVERY</Text>
                    <Text>Wednesday, 9 June</Text>
                </View>
                <View>
                    <Text style={styles.titleText}>TRACKING ID</Text>
                    <Text>#125355667</Text>
                </View>
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.trackDataContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.dateContainer}>JUNE 5</Text>
                        <View style={styles.successCircle}></View>
                        <Text>Order Placed</Text>
                    </View>
                    <View style={styles.detailContainer}>
                        <Text style={styles.detailText}>Your order for order id 154323 has been received successfully</Text>
                    </View>
                </View>
                <View style={styles.trackDataContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.dateContainer}>JUNE 6</Text>
                        <View style={styles.successCircle}></View>
                        <Text>Shipped</Text>
                    </View>
                    <View style={styles.detailContainer}>
                        <Text style={styles.detailText}>Package has left the factory at 8:28 AM Monday , 6 June</Text>
                    </View>
                </View>
                <View style={styles.trackDataContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.dateContainer}>JUNE 8</Text>
                        <View style={styles.progressCircle}></View>
                        <Text>Out for delivery</Text>
                    </View>
                    <View style={styles.progressDetailContainer}>
                    </View>
                </View>
                <View style={styles.trackDataContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.dateContainer}>JUNE 8</Text>
                        <View style={styles.progressCircle}></View>
                        <Text>Delivered</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
export default TrackOrder