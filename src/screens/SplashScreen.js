import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Image, Dimensions, ImageBackground } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Button from '../components/shared/Button'
import Link from '../components/shared/Link'
import Wallpaper from '../assets/images/Wallpaper1.png'
const { width, height } = Dimensions.get("window");

const SplashScreen = (props) => {
    const { navigation, user } = props

    // useEffect(() => {
    //     if (user && user.userName && user.password) {
    //         navigation.navigate('Home')
    //     }
    // }, [])

    const onSwipeLeft = (gestureState) => {
        navigation.navigate('Sign Up')
    }

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    return (
        <GestureRecognizer
            onSwipeLeft={(state) => onSwipeLeft(state)}
            config={config}
            style={styles.container}
        >
            <ImageBackground source={Wallpaper} style={styles.wallpaperContainer}>
                <View style={styles.wallpaperContainer}>
                    <Text style={styles.titleText}>We wanna get to know ya!</Text>
                </View>
                <View style={styles.actionsContainer}>
                    <Button label="GET STATRED" onPress={() => navigation.navigate('Sign Up')} />
                    <View style={styles.linkContainer}>
                        <Text style={styles.text}>{"Existing user? "}</Text>
                        <Link label="Login" onPress={() => navigation.navigate('Login')} />
                        <Text style={styles.text}>{"Or "}</Text>
                        <Link label="Forgot my password" onPress={() => navigation.navigate('Forgot Password')} />
                    </View>
                </View>
            </ImageBackground>
        </GestureRecognizer>
    );
}
const mapStateToProps = ({ user }) => {
    return {
        user
    };
}
export default connect(mapStateToProps, null)(SplashScreen)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7ce26',
        width: width,
        height: height,
        flex: 1
    },
    wallpaperContainer: {
        flex: 8,
        width: width,
        borderBottomLeftRadius: 80
    },
    wallpaper: {
        width: '100%',
        height: '100%',

    },
    actionsContainer: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 20,
        marginTop: 10
    },
    text: {
        textAlign: 'center'
    },
    linkContainer: {
        width: width - 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    titleText: {
        marginLeft: 20,
        marginRight: 20,
        width: width - 100,
        marginTop: 30,
        fontSize: 30
    }
});