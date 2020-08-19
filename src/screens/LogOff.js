import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, Text, ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '../components/shared/Button'
import styles from '../assets/styles';
import * as LoginApi from '../api/Login'
import * as UserAction from '../actions/UserAction'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay'

const { width, height } = Dimensions.get("window");

const LogOffScreen = (props) => {
    const { navigation, UserAction } = props
    const [spinner, setLoader] = useState(false)

    const logOut = () => {
        setLoader(true)
        LoginApi.logout()
            .then((result) => {
                setLoader(false)
                UserAction.setUser({})
                props.navigation.navigate('Landing Page')
            })
            .catch((error) => {
                setLoader(false)
            })
    };

    return (
        <View style={styles.transitionContainer}>
            <Spinner
                visible={spinner}
            />
            <ScrollView>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Log Off')
                }}>
                    <View style={styles.transitionMessageContainer}>
                        <Text style={styles.transitionMessage}>Ready to log off? Don't worry we'll save your spot.</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Survey')
                }}>
                    <View style={styles.transitionMessage2Container}>
                        <Text style={styles.transitionMessage}>Never mind, Let's keep going</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
            <View style={styles.bottom}>
                <Button label="Log Off" onPress={logOut} />
            </View>
        </View>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        UserAction: bindActionCreators(UserAction, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(LogOffScreen);