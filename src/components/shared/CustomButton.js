import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'

const ButtonContainer = (props) => {
    const { onPress, label, style } = props
    return (
        <View style={styles.buttonOuterLayout}>
            <TouchableOpacity style={style ? style : styles.container} onPress={onPress}>
                <Text style={styles.text}>{label}</Text>
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
        paddingHorizontal:20,
        paddingVertical: 15
    },
    text: {
        fontSize: 20,
        fontFamily: 'belleza'
    }
})