import React, { useState } from 'react'
import { Text, View, TextInput } from 'react-native'
import RadioButton from '../components/shared/RadioButton'
import styles from '../assets/styles';

const defaultAddress = [
    {
        id: 1,
        answer: 'Use as Default'
    }
]

const PresonalDetailsForm = (props) => {
    const { details, changePersonalDetails } = props
    return (
        <View style={styles.accountBodyContainer}>
            <Text style={styles.accountTextConatiner}>Email</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={details.email}
                onChangeText={text => changePersonalDetails('email', text)}
            />
            <Text style={styles.accountTextConatiner}>First Name</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={details.firstName}
                onChangeText={text => changePersonalDetails('firstName', text)}
            />
            <Text style={styles.accountTextConatiner}>Last Name</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={details.lastName}
                onChangeText={text => changePersonalDetails('lastName', text)}
            />
        </View>
    )
}
export default PresonalDetailsForm