import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, Text, Alert, ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '../components/shared/Button'
import styles from '../assets/styles';
import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get("window");

const TransitionsScreen = (props) => {
    const { navigation } = props

    return (
        <View style={styles.transitionContainer}>
            <ScrollView>
            <View style={styles.transitionMessageContainer}>
                <Text style={styles.transitionMessage}>You're almost there....keep going!</Text>
            </View>
            </ScrollView>
            <View style={styles.bottom}>
                <Button label="Next" onPress={() => {
                    navigation.navigate('Survey')
                }} />
            </View>
        </View>
    )
}

export default TransitionsScreen;