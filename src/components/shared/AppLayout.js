import React, { useState } from 'react';
import { View, Dimensions, Text, ScrollView, TouchableOpacity, FlatList, Image, Linking } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import styles from '../../assets/styles';
import ToteItem from '../../screens/ToteItem'
import Avatar from '../../assets/images/avatar.jpeg'

const AppLayout = (props) => {
    const { openDrawer, spinner, title } = props

    const imageStyle = [
        {
            alignItems: 'flex-start',
            width: 30,
            height: 30,
            borderRadius: 15
        }
    ];
    return (
        <View style={styles.containerMatches}>
            <Spinner
                visible={spinner}
            />
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={openDrawer}>
                    <Image source={Avatar} style={imageStyle} />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
            </View>
            {props.children}
        </View>
    )
}
export default AppLayout