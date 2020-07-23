import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, Text, Alert, ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '../components/shared/Button'
import styles from '../assets/styles';

const { width, height } = Dimensions.get("window");

const LogOffScreen = (props) => {
    const { navigation } = props
    
    return (
        <View style={styles.transitionContainer}>
            <ScrollView>
            <View style={styles.transitionMessageContainer}>
                <Text style={styles.transitionMessage}>Ready to log off? Don't worry we'll save your spot.</Text>
            </View>
            <View style={styles.transitionMessage2Container}>
                <Text style={styles.transitionMessage}>Never mind, Let's keep going</Text>
            </View>
            </ScrollView>
            <View style={styles.bottom}>
                <Button label="Log Off" onPress={() => {
                    navigation.navigate('Landing Page')
                }} />
            </View>
        </View>
    )
}

export default LogOffScreen;