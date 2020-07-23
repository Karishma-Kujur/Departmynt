import React, { useState, useEffect } from 'react'
import { View, Dimensions, Text, Platform, ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '../components/shared/Button'
import TextInput from '../components/shared/TextInput'
import Link from '../components/shared/Link'
import styles from '../assets/styles';
import * as SignupAction from '../actions/SignupAction';
import * as UserAction from '../actions/UserAction';
import * as LoginApi from '../api/Login';
import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get("window");

const SignUpScreen = (props) => {
    const { navigation, UserAction } = props
    const [firstName, setFirstName] = useState('')
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastName, setLastName] = useState('')
    const [lastNameError, setLastNameError] = useState(false)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)
    const [formError, setFormError] = useState(false)
    const [spinner, setLoader] = useState('')

    const validator = {
        firstName: {
            type: 'string',
            field: 'firstName',
            onError: setFirstNameError,
            onChange: setFirstName,
        },
        lastName: {
            type: 'string',
            field: 'lastName',
            onError: setLastNameError,
            onChange: setLastName,
        },
        email: {
            type: 'string',
            field: 'email',
            onError: setEmailError,
            onChange: setEmail,
            extras: {
                email: true
            }
        },
        password: {
            type: 'string',
            field: 'password',
            onError: setPasswordError,
            onChange: setPassword,
            extras: {
            }
        },
        confirmPassword: {
            type: 'string',
            field: 'confirmPassword',
            onError: setConfirmPasswordError,
            onChange: setConfirmPassword,
            extras: {
            }
        }
    }

    const validateInput = (value, setError, confirmPassword=false) => {
        if (value === '') {
            setError(true)
        }
        else if(confirmPassword && value !== password) {
            setError(true)
        }
    }

    const handleSignup = () => {
        validateInput(email, setEmailError);
        validateInput(firstName, setFirstNameError);
        validateInput(lastName, setLastNameError);
        validateInput(password, setPasswordError);
        validateInput(confirmPassword, setConfirmPasswordError, true);

        if (!email || !firstName || !lastName || !password || !confirmPassword || confirmPassword !== password)
            return null;
        const data = {
            "email": email,
            "first_name": firstName,
            "last_name": lastName,
            "username": email,
            "password": password
        }
        setLoader(true)
        SignupAction.signupUser(data)
            .then((result) => {
                LoginApi.login(data)
                    .then((userResult) => {
                        setLoader(false)
                        let userData = {
                            ...userResult,
                            userName: email,
                            password: password
                        }
                        UserAction.setUser(userData)
                        navigation.navigate('Survey')
                    })
                    .catch((error) => {
                        setLoader(false)
                        Alert.alert('Error', 'Error occured while signing up! Please try again')
                    })
            })
            .catch((error) => {
                setLoader(false)
                Alert.alert('Error', 'Error occured while signing up! Please try again')
            })
    }

    const onChangeText = (value, validatorObj, confirmPassword) => {
        if (validatorObj) {
            if (value !== '') {
                validatorObj.onError(false)
            }
            else if(confirmPassword && value !== password) {
                setConfirmPasswordError(true)
            }
            else {
                validatorObj.onError(true)
            }
            validatorObj.onChange(value)
        }

    }


    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? "padding" : "height"} enabled>
            <View style={styles.formContainer}>
                <Spinner
                    visible={spinner}
                />
                <View style={styles.top}>
                    <Text style={styles.title}>Sign Up</Text>
                </View>
                <ScrollView>
                    <TextInput
                        name="First Name"
                        onChangeText={text => onChangeText(text, validator.firstName)}
                        value={firstName}
                    />
                    {firstNameError && <Text style={styles.errorMessage}>*Please Enter your First Name</Text>}
                    <TextInput
                        name="Last Name"
                        onChangeText={text => onChangeText(text, validator.lastName)}
                        value={lastName}
                    />
                    {lastNameError && <Text style={styles.errorMessage}>*Please Enter your Last Name</Text>}
                    <TextInput
                        name="Email"
                        onChangeText={text => onChangeText(text, validator.email)}
                        value={email}
                    />
                    {emailError && <Text style={styles.errorMessage}>*Please Enter your Email Id</Text>}
                    <TextInput
                        name="Password"
                        mode="password"
                        onChangeText={text => onChangeText(text, validator.password)}
                        value={password}
                    />
                    {passwordError && <Text style={styles.errorMessage}>*Please Enter your Password</Text>}
                    <TextInput
                        name="Confirm Password"
                        mode="password"
                        onChangeText={text => onChangeText(text, validator.confirmPassword, true)}
                        value={confirmPassword}
                    />
                    {confirmPasswordError && <Text style={styles.errorMessage}>*Your entered password doesnot match</Text>}
                </ScrollView>
                <View style={styles.formButton}>
                    <Button label="Begin Survey" onPress={handleSignup} />
                    <View style={styles.linkContainer}>
                        <Text style={styles.label}>{"Existing User? "}</Text>
                        <Link label="Login" onPress={() => navigation.navigate('Login')} />
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>

    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        UserAction: bindActionCreators(UserAction, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(SignUpScreen)
