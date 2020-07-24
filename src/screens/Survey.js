import React, { useState, useEffect } from 'react'
import * as Progress from 'react-native-progress'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useIsFocused } from '@react-navigation/native'
import { View, StyleSheet, Dimensions, Text, ScrollView, TouchableOpacity, FlatList, ImageBackground, TextInput } from 'react-native'
import Button from '../components/shared/Button'
import styles from '../assets/styles';
import SurveyItem from '../components/SurveyItem'
import * as SurveyAction from '../actions/SurveyAction';
import * as SurveyApi from '../api/Survey'
import RadioButton from '../components/shared/RadioButton'
import MultiSelect from '../components/shared/MultiSelect'

const { width, height } = Dimensions.get("window");

const SurveyScreen = (props) => {
    const [showTransition, changeShowTransition] = useState(true)
    const [surveyCount, changeSurveyCount] = useState(0)
    const [selectedId, changeSelectedId] = useState(null)
    const [progressStatus, changeProgressStatus] = useState(0)
    const [spinner, setLoader] = useState('')
    const [answers, changeAnswers] = useState({
        quizId: 2,
        results: []
    })
    const { navigation, SurveyAction, questions, answeredQuestions } = props
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

    const isFocused = useIsFocused()
    useEffect(() => {
        if(!questions || !questions.length)
            getSurveyQuestions()
    }, [isFocused])

    useEffect(() => {
        if (questions.length > 0) {
            changeProgressStatus(1 / questions.length)
        }
    }, [questions])

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
        if (surveyQuestion.multiselect) {
            setAnswer(selectedId)
        }
        let answer = answers.results.find((element) => element.id === surveyQuestion.id)
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
                let data = { ...answers }
                data.results = JSON.stringify(data.results)
                SurveyApi.submitAnswers(data)
                    .then((result) => {
                        setLoader(false)
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
        if (surveyQuestion.multiselect) {
            text && text.forEach((id) => {
                let obj = surveyQuestion.answers.find((answer) => answer.id === id)
                answersObj.results.push({
                    id: surveyQuestion.id,
                    answer: obj.answer,
                    answerKey: obj.keyAttribute
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
                        answer: text
                    }
                }
                else return answer
            })
            if (!found) {
                answersObj.results.push({
                    id: surveyQuestion.id,
                    answer: text
                })
            }
        }
        changeAnswers(answersObj)
    }

    return (
        <View style={styles.containerMatches}>
            <View style={styles.top}>
                <Text style={styles.title}>Survey</Text>
            </View>
            <View style={{ height: 8, alignItems: 'center' }}>
                <Progress.Bar progress={progressStatus} width={width - 60} />
            </View>
            {surveyQuestion &&
                <>
                    <ScrollView>
                        <View style={styles.questionContainer}>
                            <Text style={styles.question}>{surveyQuestion.question}</Text>
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
                                    multiline
                                    numberOfLines={4}
                                    style={styles.textInput}
                                    onChangeText={text => setAnswer(text)}
                                // value={value}
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
                        display: 'flex', flexDirection: 'row', width: width-20,
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
const mapStateToProps = ({ survey }) => {
    return {
        questions: survey.surveyQuestions || [],
        answeredQuestions: survey.answeredQuestions
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        SurveyAction: bindActionCreators(SurveyAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(SurveyScreen)

