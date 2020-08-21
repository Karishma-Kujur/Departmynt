import React, { useState, useEffect } from 'react'
import * as Progress from 'react-native-progress'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useIsFocused } from '@react-navigation/native'
import { View, StyleSheet, Dimensions, Text, ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native'
import Button from '../components/shared/Button'
import styles from '../assets/styles';
import SurveyItem from '../components/SurveyItem'
import * as SurveyAction from '../actions/SurveyAction';
import * as UserAction from '../actions/UserAction';
import * as SurveyApi from '../api/Survey'
import RadioButton from '../components/shared/RadioButton'
import MultiSelect from '../components/shared/MultiSelect'
import Spinner from 'react-native-loading-spinner-overlay';
import _ from 'lodash'

const { width, height } = Dimensions.get("window");

const SurveyScreen = (props) => {
    const { navigation, SurveyAction, questions, answeredQuestions, totalQuestions, user, UserAction } = props
    const [showTransition, changeShowTransition] = useState(answeredQuestions < (questions.length - 1) / 2)
    const [surveyCount, changeSurveyCount] = useState(answeredQuestions)
    const [selectedId, changeSelectedId] = useState(null)
    const [textAnswer, setTextAnswer] = useState('')
    const [progressStatus, changeProgressStatus] = useState(0)
    const [spinner, setLoader] = useState('')
    const [answers, changeAnswers] = useState({
        quizId: 2,
        results: []
    })
    const surveyQuestion = (questions && questions.length > surveyCount) ? questions[surveyCount] : null

    const getSurveyQuestions = () => {
        setLoader(true)
        SurveyAction.setSurveyQuestions([])
        SurveyApi.getSurveyQuestions()
            .then((result) => {
                setLoader(false)
                SurveyAction.setSurveyQuestions(result)
            })
            .catch((error) => {
                setLoader(false)
            })

    }

    // const isFocused = useIsFocused()
    // useEffect(() => {
    //     if(!questions || !questions.length)
    //     getSurveyQuestions()
    // }, [isFocused])

    useEffect(() => {
        if (questions.length > 0) {
            changeProgressStatus((answeredQuestions + 1) / totalQuestions)
        }
    }, [answeredQuestions, totalQuestions])

    const handleOnPressSave = () => {
        setLoader(true)
        let data = { ...answers }
        data.results = JSON.stringify(data.results)
        SurveyApi.submitAnswers(data)
            .then((result) => {
                setLoader(false)
                navigation.navigate('Log Off')

            })
            .catch((error) => {
                setLoader(false)
            })
    }

    const handleOnPressNext = () => {
        let resultObj = {}
        if (surveyQuestion.textInput) {
            if(textAnswer !== '')
                resultObj = setAnswer(textAnswer)
            setTextAnswer('')
        }
        else if (surveyQuestion.multiselect) {
            resultObj = setAnswer(selectedId)
        }
        resultObj = !_.isEmpty(resultObj) ? resultObj : answers;
        let answer = resultObj.results.find((element) => element.id === surveyQuestion.id)
        if ((surveyQuestion.required && answer) || !surveyQuestion.required) {
            if (surveyCount < questions.length - 1) {
                if (showTransition && surveyCount >= (questions.length - 1) / 2) {
                    changeShowTransition(false)
                    navigation.navigate('Transitions')
                }
                changeProgressStatus((surveyCount + 1) / questions.length)
                changeSurveyCount(surveyCount + 1)
                changeSelectedId(null)

            } else {
                setLoader(true)
                let data = { ...resultObj }
                data.results = JSON.stringify(data.results)
                SurveyApi.submitAnswers(data)
                    .then((result) => {
                        setLoader(false)
                        let userData = {
                            ...user,
                            rememberMe: true
                        }
                        UserAction.setUser(userData)
                        navigation.navigate('Home')

                    })
                    .catch((error) => {
                        setLoader(false)
                    })

            }
        }
    }

    const setAnswer = (text) => {
        let answersObj = { ...answers }
        if (surveyQuestion.multiselect && !surveyQuestion.textInput) {
            text && text.forEach((id) => {
                let obj = surveyQuestion.answers.find((answer) => answer.id === id)
                answersObj.results.push({
                    id: surveyQuestion.id,
                    answer: obj.answer,
                    answerKey: obj.keyAttribute,
                    question: surveyQuestion.question,
                    isImage: obj.answerType === 'image'
                })
            })
        }
        else {
            let found = false
            answersObj.results = answersObj.results.map((answer) => {
                if (answer.id === surveyQuestion.id) {
                    found = true
                    return {
                        id: surveyQuestion.id,
                        answer: _.isObject(text) ? text.answer : text,
                        answerKey: _.isObject(text) ? text.keyAttribute : 0,
                        question: surveyQuestion.question,
                        isImage: _.isObject(text) ? text.answerType === 'image' : false
                    }
                }
                else return answer
            })
            if (!found) {
                answersObj.results.push({
                    id: surveyQuestion.id,
                    answer: _.isObject(text) ? text.answer : text,
                    answerKey: _.isObject(text) ? text.keyAttribute : 0,
                    question: surveyQuestion.question,
                    isImage: _.isObject(text) ? text.answerType === 'image' : false
                })
            }
        }
        changeAnswers(answersObj)
        return answersObj;
    }

    return (
        <View style={styles.containerMatches}>
            <Spinner
                    visible={spinner}
                />
            <View style={styles.top}>
                <Text style={styles.centerTitle}>Survey</Text>
            </View>
            <View style={{ height: 8, alignItems: 'center' }}>
                <Progress.Bar progress={progressStatus} width={width - 60} />
            </View>
            {surveyQuestion &&
                <>
                    <ScrollView>
                        <View style={styles.questionContainer}>
                            <Text style={styles.question}>{"(" + (surveyCount + 1) + "/" + questions.length + ") " + surveyQuestion.question}</Text>
                        </View>
                        {surveyQuestion.answers.length > 0 && !surveyQuestion.multiselect &&
                            <RadioButton
                                items={surveyQuestion.answers}
                                selectedAnswer={null}
                                setAnswer={setAnswer}
                                selectedId={selectedId}
                                changeSelectedId={(value) => changeSelectedId(value)}
                            />}
                        {surveyQuestion.answers.length > 0 && surveyQuestion.multiselect &&
                            <MultiSelect
                                items={surveyQuestion.answers}
                                selectedAnswer={[]}
                                setAnswer={setAnswer}
                                selectedId={selectedId}
                                changeSelectedId={(value) => changeSelectedId(value)}
                            />}

                        {surveyQuestion.answers.length === 0 &&
                            <View style={styles.textInputContainer}>
                                <TextInput
                                    defaultValue=''
                                    multiline
                                    numberOfLines={4}
                                    style={styles.textInput}
                                    onChangeText={text => setTextAnswer(text)}
                                    value={textAnswer}
                                />
                            </View>
                        }

                        <FlatList
                            numColumns={2}
                            data={surveyQuestion.options}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <SurveyItem
                                    image={item.image}
                                    name={item.name}
                                    price={item.price}
                                    description={item.description}
                                    variant
                                    isSelected={false}
                                />
                            )}
                        />
                    </ScrollView>

                    <View style={{
                        display: 'flex', flexDirection: 'row', width: width - 20,
                        alignItems: 'center', justifyContent: 'space-between'
                    }}>
                        <Button
                            onPress={handleOnPressSave}
                            label="Save" style={{
                                borderWidth: 1, padding: 10, width: (width - 40) / 2, justifyContent: 'center', alignItems: 'center', marginRight: 10,
                                textAlign: 'center',
                                backgroundColor: 'black',
                                marginBottom: 12,
                                borderRadius: 4
                            }} />
                        <Button onPress={handleOnPressNext} label="Next" style={{
                            borderWidth: 1, padding: 10, width: (width - 40) / 2, justifyContent: 'center', alignItems: 'center',
                            textAlign: 'center',
                            backgroundColor: 'black',
                            marginBottom: 12,
                            borderRadius: 4
                        }} />
                    </View>
                </>
            }
        </View>
    )
}
const mapStateToProps = ({ survey, user }) => {
    return {
        questions: survey.surveyQuestions || [],
        answeredQuestions: survey.answeredQuestions || 0,
        totalQuestions: survey.totalQuestions || 0,
        user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        SurveyAction: bindActionCreators(SurveyAction, dispatch),
        UserAction: bindActionCreators(UserAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(SurveyScreen)

