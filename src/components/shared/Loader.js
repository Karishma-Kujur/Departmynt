import React from 'react';
import { StyleSheet } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";

const Loader = (props) => {
    const { visible } = props
    return (
        <AnimatedLoader
            visible={visible}
            overlayColor="rgba(255,255,255,0.75)"
            animationStyle={styles.lottie}
            speed={1}
        />
    )
}
export default Loader
const styles = StyleSheet.create({
    lottie: {
        width: 100,
        height: 100
    }
})