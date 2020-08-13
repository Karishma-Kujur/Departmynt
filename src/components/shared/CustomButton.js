import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'

const ButtonContainer = (props) => {
    const { onPress, label, style, isSmall } = props
    return (
        <View style={styles.buttonOuterLayout}>
            <TouchableOpacity style={isSmall ? styles.smallContainer : styles.container} onPress={onPress}>
                <Text style={isSmall ? styles.smallText : styles.text}>{label}</Text>
            </TouchableOpacity>
        </View>
    )
}
export default ButtonContainer
const styles = StyleSheet.create({
    buttonOuterLayout: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal:15,
        paddingVertical: 15
    },
    smallContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal:15,
        paddingVertical: 10
    },
    text: {
        fontSize: 22,
        fontFamily: 'belleza'
    },
    smallText: {
        fontSize: 18,
        fontFamily: 'belleza'
    }
})