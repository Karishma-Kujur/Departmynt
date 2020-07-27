import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, Text, Alert, ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '../components/shared/Button'
import styles from '../assets/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get("window");

const LogOffScreen = (props) => {
    const { navigation } = props
    
    return (
        <View style={styles.transitionContainer}>
            <ScrollView>
            <TouchableOpacity  onPress={() => {
                    navigation.navigate('Log Off')
                }}>
                <View style={styles.transitionMessageContainer}>
                    <Text style={styles.transitionMessage}>Ready to log off? Don't worry we'll save your spot.</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => {
                    navigation.navigate('Survey')
                }}>
                <View style={styles.transitionMessage2Container}>
                    <Text style={styles.transitionMessage}>Never mind, Let's keep going</Text>
                </View>
            </TouchableOpacity>
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