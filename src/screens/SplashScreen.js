import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Image, Dimensions, ImageBackground } from 'react-native';
import Button from '../components/shared/CustomButton'
import Wallpaper from '../assets/images/screen.jpg'
import Icon1 from '../assets/images/icon.png'
import Icon2 from '../assets/images/icon2.png'
const { width, height } = Dimensions.get("window");

const SplashScreen = (props) => {
    const { navigation, user } = props

    useEffect(() => {
        if (user && user.userName && user.password && user.rememberMe) {
            navigation.navigate('Home')
        }
    }, [])

    return (
        <View
            style={styles.container}
        >
            <View style={styles.icon1Container}>
                <Image source={Icon1} style={styles.iconStyle} />
            </View>
            <View style={styles.icon2Container}>
                <Image source={Icon2} style={styles.icon2Style} />
            </View>
            <View style={styles.imageViewContainer}>
                <View style={styles.mainContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={Wallpaper} style={styles.imageStyle} />
                    </View>
                </View>
            </View>
            <View style={styles.textViewContainer}>
                <View style={styles.formButton}>
                    <View style={styles.titleContainer}>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Text style={styles.titleStyle}>Your </Text>
                            <Text style={styles.matchesStyle}>matches</Text>
                        </View>
                        <Text style={styles.titleStyle}>are waiting!</Text>
                    </View>
                    <View style={styles.line} />
                </View>
            </View>
            <View style={styles.buttonViewContainer}>
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
                        isSmall={true}
                        label='Log In' />
                </View>
            </View>
        </View>
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
        flex: 2.5,
        justifyContent: 'flex-end',
        width: '100%'
    },
    buttonViewContainer: {
        flex: 2.5,
        justifyContent: 'flex-end'
    },
    mainContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        marginTop: 20,
        width: width - 60,
    },
    imageStyle: {
        width: '100%',
        height: '100%'
        // height: undefined,
        // aspectRatio: 0.9,
    },
    titleContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    titleStyle: {
        fontSize: 28,
        fontFamily: 'Alice-Regular',
        marginBottom: 10
    },
    matchesStyle: {
        fontSize: 28,
        fontFamily: 'Alice-Regular',
    },
    line: {
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 6,
        borderBottomColor: 'rgb(209, 140, 3)',
    },
    marginContainer: {
        marginTop: 5,
        marginBottom: 5,
        width: '100%'
    },
    icon1Container: {
        position: 'absolute',
        top: height - height/4 + 20,
        left: width - width/2 + 20,
        right: 0,
        bottom: 0,
        opacity: 0.8,
        width: width
    },
    icon2Container: {
        position: 'absolute',
        top: height/7 - 20,
        left: -width + width/3 + 10,
        right: 0,
        bottom: 0,
        height: height / 2,
    },
    iconStyle: {
        width: width - 120,
        height: undefined,
        aspectRatio: 1.8,
    },
    icon2Style: {
        width: width + 20,
        height: undefined,
        aspectRatio: 1,
    },
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        width: '100%',
        alignSelf: 'center',
        textAlign: "center",
    },
    formButton: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 20,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
});