import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, Text, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '../components/shared/Button'
import TextInput from '../components/shared/TextInput'
import Link from '../components/shared/Link'
import { validateFormField } from '../helpers'
import * as LoginApi from '../api/Login';
import * as SurveyApi from '../api/Survey'
import * as SurveyAction from '../actions/SurveyAction'
import * as UserAction from '../actions/UserAction';
import styles from '../assets/styles';
import Spinner from 'react-native-loading-spinner-overlay';
import _ from 'lodash'

const { width, height } = Dimensions.get("window");

const LoginScreen = (props) => {
    const { navigation, UserAction, SurveyAction } = props
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [spinner, setLoader] = useState('')
    const [errorObject, updateErrorObject] = useState({})
    const validator = {
        userName: {
            type: 'string',
            field: 'userName',
            onChange: setUserName,
            extras: {
                email: true
            }
        },
        password: {
            type: 'string',
            field: 'password',
            onChange: setPassword,
            extras: {
            }
        }
    }

    const onChangeText = (value, validatorObj, onChange) => {
        if (validatorObj) {
            validatorObj.onChange(value)
            // validateFormField(value, validatorObj.field, validatorObj.type, newError, validatorObj.extras);
            // updateErrorObject({...errorObject, ...newError});
        } else {
            onChange(value)
        }
    }

    const getFilteredQuestions = (answeredQuestions, questions) => {
        let data = [...questions]
        answeredQuestions && answeredQuestions.forEach((questionId) => {
            data = data.filter((element) => {
                return element.id !== questionId
            })
        })
        return data
    }

    const loginApi = () => {
        const data = {
            "username": userName,
            "password": password
        }
        setLoader(true)
        LoginApi.login(data)
            .then((result) => {
                let userData = {
                    ...result,
                    userName: userName,
                    password: password
                }
                SurveyApi.getSurveyStatus(userData.id)
                    .then((answerResult) => {
                        SurveyApi.getSurveyQuestions()
                            .then((questionResult) => {
                                setLoader(false)
                                if (answerResult && answerResult.length === questionResult.length) {
                                    UserAction.setUser(userData)
                                    navigation.navigate('Home')
                                }
                                else {
                                    let filteredQuestions = getFilteredQuestions(answerResult, questionResult)
                                    SurveyAction.setSurveyQuestions(filteredQuestions)
                                    navigation.navigate('Survey')
                                }
                            })
                            .catch((error) => {
                                setLoader(false)
                                Alert.alert('Error', 'Some error has occured! Please contact the adminitrator or try after sometime')
                            })
                    })
                    .catch((error) => {
                        setLoader(false)
                        Alert.alert('Error', 'Some error has occured! Please contact the adminitrator or try after sometime')
                    })
            })
            .catch((error) => {
                setLoader(false)
                Alert.alert('Invalid User name or Password', 'Please enter valid user name and password')
            })
    }

    const handleOnSubmit = () => {
        const newError = {}
        validateFormField(userName, validator.userName.field, validator.userName.type, newError, validator.userName.extras);
        validateFormField(password, validator.password.field, validator.password.type, newError, validator.password.extras);
        if (_.isEmpty(newError)) {
            loginApi()
        }
        updateErrorObject({ ...newError })
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? "padding" : "height"} enabled>
            <View style={styles.containerMatches}>
                <Spinner
                    visible={spinner}
                />

                <View style={styles.top}>
                    <Text style={styles.title}>Login</Text>
                </View>
                <ScrollView>
                    <TextInput
                        name="Email"
                        onChangeText={text => onChangeText(text, validator.userName)}
                        value={userName}
                    />
                    {errorObject.userName && <Text style={styles.errorMessage}>*Please Enter a valid email Id</Text>}
                    <TextInput
                        name="Password"
                        mode="password"
                        onChangeText={text => onChangeText(text, validator.password)}
                        value={password}
                    />
                    {errorObject.password && <Text style={styles.errorMessage}>*Please Enter your Email Id</Text>}
                </ScrollView>
                <View style={styles.formButton}>
                    <Button label="Login" onPress={handleOnSubmit} />
                    <View style={styles.linkContainer}>
                        <Text style={styles.label}>{"Don’t have an account? "}</Text>
                        <Link label="Sign Up" onPress={() => navigation.navigate('Sign Up')} />
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

export default connect(null, mapDispatchToProps)(LoginScreen);