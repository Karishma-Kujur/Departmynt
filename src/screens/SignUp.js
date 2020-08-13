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
import * as SurveyApi from '../api/Survey'
import * as SurveyAction from '../actions/SurveyAction'
import { validateFormField } from '../helpers'
import Spinner from 'react-native-loading-spinner-overlay';
import _ from 'lodash'

const { width, height } = Dimensions.get("window");

const SignUpScreen = (props) => {
    const { navigation, UserAction, SurveyAction } = props
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState(false)
    const [errorObject, updateErrorObject] = useState({})
    const [spinner, setLoader] = useState('')

    const validator = {
        firstName: {
            type: 'string',
            field: 'firstName',
            onChange: setFirstName,
            extras: {}
        },
        lastName: {
            type: 'string',
            field: 'lastName',
            onChange: setLastName,
            extras: {}
        },
        email: {
            type: 'string',
            field: 'email',
            onChange: setEmail,
            extras: {
                email: true
            }
        },
        password: {
            type: 'string',
            field: 'password',
            onChange: setPassword,
            extras: {
                password: true,
                confirmPassword: true,
                passwordValue: '',
            }
        },
        confirmPassword: {
            type: 'string',
            field: 'confirmPassword',
            onChange: setConfirmPassword,
            extras: {
                password: true,
                confirmPassword: true,
                passwordValue: '',
            }
        }
    }

    const handleSignUpApi = () => {
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
                        let userData = {
                            ...userResult,
                            userName: email,
                            password: password
                        }
                        UserAction.setUser(userData)
                        SurveyApi.getSurveyQuestions()
                            .then((questionResult) => {
                                setLoader(false)
                                    SurveyAction.setSurveyQuestions(questionResult, 0, questionResult.length)
                                    navigation.navigate('Survey')
                            })
                            .catch((error) => {
                                setLoader(false)
                                Alert.alert('Error', 'Some error has occured! Please contact the adminitrator or try after sometime')
                            })
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


    const handleSignup = () => {
        const newError = {}
        validateFormField(email, validator.email.field, validator.email.type, newError, validator.email.extras);
        validateFormField(firstName, validator.firstName.field, validator.firstName.type, newError, validator.firstName.extras)
        validateFormField(lastName, validator.lastName.field, validator.lastName.type, newError, validator.lastName.extras)
        validator.password.extras.passwordValue = confirmPassword
        validateFormField(password, validator.password.field, validator.password.type, newError, validator.password.extras)
        validator.confirmPassword.extras.passwordValue = password
        validateFormField(confirmPassword, validator.confirmPassword.field, validator.confirmPassword.type, newError, validator.confirmPassword.extras)

        if (_.isEmpty(newError)) {
            handleSignUpApi()
        }
        updateErrorObject({ ...newError })
    }

    const onChangeText = (value, validatorObj) => {
        if (validatorObj) {
            validatorObj.onChange(value)
        }
    }


    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? "padding" : "height"} enabled>
            <View style={styles.containerMatches}>
                <Spinner
                    visible={spinner}
                />
                <View style={styles.top}>
                    <Text style={styles.centerTitle}>Sign Up</Text>
                </View>
                <ScrollView>
                    <TextInput
                        name="First Name"
                        onChangeText={text => onChangeText(text, validator.firstName)}
                        value={firstName}
                    />
                    {errorObject.firstName && <Text style={styles.errorMessage}>*Please Enter your First Name</Text>}
                    <TextInput
                        name="Last Name"
                        onChangeText={text => onChangeText(text, validator.lastName)}
                        value={lastName}
                    />
                    {errorObject.lastName && <Text style={styles.errorMessage}>*Please Enter your Last Name</Text>}
                    <TextInput
                        name="Email"
                        onChangeText={text => onChangeText(text, validator.email)}
                        value={email}
                    />
                    {errorObject.email && <Text style={styles.errorMessage}>*Please Enter your Email Id</Text>}
                    <TextInput
                        name="Password"
                        mode="password"
                        onChangeText={text => onChangeText(text, validator.password)}
                        value={password}
                    />
                    {errorObject.password && <Text style={styles.errorMessage}>*Please Enter your Password</Text>}
                    <TextInput
                        name="Confirm Password"
                        mode="password"
                        onChangeText={text => onChangeText(text, validator.confirmPassword)}
                        value={confirmPassword}
                    />
                    {errorObject.confirmPassword && <Text style={styles.errorMessage}>*Your entered password doesnot match</Text>}
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
        UserAction: bindActionCreators(UserAction, dispatch),
        SurveyAction: bindActionCreators(SurveyAction, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(SignUpScreen)
