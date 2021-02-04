import React from 'react'
import { compose } from "recompose";
import { TextInput, View, StyleSheet } from 'react-native';
import {
    handleTextInput,
    withNextInputAutoFocusForm,
    withNextInputAutoFocusInput
} from "react-native-formik"

const MyInput = compose(
    handleTextInput,
    withNextInputAutoFocusInput
)(TextInput);

const TextInputComponent = (props) => {
    const { onChangeText, onBlur } = props
    return (
        <View style={styles.container}>
            <TextInput
                type={props.type}
                style={[styles.textInput,props.inputStyle ? props.inputStyle:{}]}
                secureTextEntry={props.mode === "password" ? true : props.mode === "confirmpassword" ? true : false}
                placeholder={props.name}
                onChangeText={onChangeText}
                onBlur={onBlur}
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
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 10,
        marginBottom: 5
    },

    textInput: {
        fontSize: 16,
        fontFamily: "Avenir",
        width: '100%',
        height: 40
    }
});