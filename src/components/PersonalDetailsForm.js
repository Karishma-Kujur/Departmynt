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
    const [firstNameError, setFirstNameError] = useState(!details.firstName);
    const [lastNameError, setLastNameError] = useState(!details.lastName);
    const [emailError, setEmailError] = useState(!details.email);
    return (
        <View style={styles.accountBodyContainer}>
            <Text style={styles.accountTextConatiner}>Email</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={details.email}
                onChangeText={(text) => {
                    if (text === '') {
                      setEmailError(true);
                    } else if (emailError) {
                      setEmailError(false);
                    }
                    changePersonalDetails('email', text);
                  }}
            />
             {emailError && (
            <Text style={styles.errorMessage}>
              *Please Enter your Email
            </Text>
          )}
            <Text style={styles.accountTextConatiner}>First Name</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={details.firstName}
                onChangeText={(text) => {
                    if (text === '') {
                      setFirstNameError(true);
                    } else if (firstNameError) {
                      setFirstNameError(false);
                    }
                    changePersonalDetails('firstName', text)
                  }}
            />
             {firstNameError && (
            <Text style={styles.errorMessage}>
              *Please Enter your First Name
            </Text>
          )}
            <Text style={styles.accountTextConatiner}>Last Name</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={details.lastName}
                onChangeText={(text) => {
                    if (text === '') {
                      setLastNameError(true);
                    } else if (lastNameError) {
                      setLastNameError(false);
                    }
                    changePersonalDetails('lastName', text);
                  }}
            />
            {lastNameError && (
            <Text style={styles.errorMessage}>
              *Please Enter your Last Name
            </Text>
          )}
        </View>
    )
}
export default PresonalDetailsForm