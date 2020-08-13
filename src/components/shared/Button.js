import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const ButtonContainer = (props) => {
    const { onPress, label, style } = props
    return (
        <TouchableOpacity style={style ? style :  styles.container} onPress={onPress}>
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    )
}
export default ButtonContainer
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'black',
        paddingVertical: 12,
        borderRadius: 4
    },
    text: {
        color: 'white',
        textAlign: 'center',
        height: 25,
        fontSize: 18,
        margin: 'auto'
    }
})