import React from 'react'
import { TextInput, View, StyleSheet } from 'react-native';

const TextInputComponent = (props) => {
    const { onChangeText } = props
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                secureTextEntry={props.mode === "password" ? true : props.mode === "confirmpassword" ? true : false}
                placeholder={props.name}
                onChangeText={text => onChangeText(text)}
            />
        </View>
    )
}
export default TextInputComponent

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 5,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 10,
        marginBottom: 5
    },

    textInput: {
        fontSize: 16,
        fontFamily: "Avenir",
        width: '100%'
    }
});