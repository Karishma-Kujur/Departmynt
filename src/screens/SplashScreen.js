import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Image, Dimensions, ImageBackground } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Button from '../components/shared/CustomButton'
import Wallpaper from '../assets/images/screen.jpg'
import Icon2 from '../assets/images/icon2.svg'
import Icon1 from '../assets/images/icon.svg'
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
            <View style={styles.icon1Container}>
                <Icon1 />
            </View>
            <View style={styles.icon2Container}>
                <Icon2 />
            </View>
            <View style={styles.imageViewContainer}>
                <View style={styles.mainContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={Wallpaper} style={styles.imageStyle} />
                    </View>
                </View>
            </View>
            <View style={styles.textViewContainer}>
                <View style={styles.mainContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleStyle}>Your matches</Text>
                        <Text style={styles.titleStyle}>are waiting!</Text>
                    </View>
                    <View style={styles.line} />
                </View>
                <View style={styles.marginContainer}>
                    <Button onPress={() => navigation.navigate('Sign Up')}
                        label='Get Started' />
                </View>
                <View style={styles.mainContainer}>
                    <View style={styles.marginContainer}>
                        <Text style={styles.textStyle}>Already have an account?</Text>
                    </View>
                </View>
                <View style={styles.marginContainer}>
                    <Button onPress={() => navigation.navigate('Login')}
                        label='Log In' />
                </View>
            </View>
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
        backgroundColor: 'rgb(246, 226, 222)',
        width: width,
        height: height,
        flex: 1
    },
    imageViewContainer: {
        flex: 6
    },
    textViewContainer: {
        flex: 4
    },
    mainContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        marginTop: 50,
        width: width - 80,
    },
    imageStyle: {
        width: '100%',
        height: '100%'
    },
    titleContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    titleStyle: {
        fontSize: 20,
        fontWeight: "400",
        fontFamily: 'Baskerville'
    },
    line: {
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 5,
        borderBottomColor: 'rgb(209, 140, 3)',
    },
    marginContainer: {
        marginTop: 10,
        marginBottom: 5
    },
    icon1Container: {
        position: 'absolute',
        top: height-250, 
        left: width-180, 
        right: 0, 
        bottom: 0,
        width: 300,
        height: 300,
        opacity: 0.8
    },
    icon2Container: {
        position: 'absolute',
        top: 0,
        left: 0, 
        right: 0, 
        bottom: 0,
        width: 300,
        height: 300,
        opacity: 0.8,
        backgroundColor: 'white'
    },
    icon1Style: {
        width: 100,
        height: 100
    },
    textStyle: {
        fontFamily: 'AvenirNext-Bold'
    }
});