import axios from 'axios';
import Constants from '../appConfig/Constants';
import { getFormattedString } from '../helpers'
export function getSurveyQuestions() {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/quiz-survey-master/v1/questions?quizID=2?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.get(url).then(response => {
            resolve(getSurveyQuestionsFromResult(response.data))
        }).catch(err => {
            reject(err)
        })
    });
}

export function submitAnswers(data) {
    return new Promise((resolve, reject) => {
        const url = `https://www.departmynt.co/wp-json/user_survey/result`
        axios.post(url, data)
            .then(response => {
                resolve(response.data)
            }).catch(err => {
                console.log(err);
                reject(err)
            })
    });
}

export function getSurveyStatus(userId) {
    return new Promise((resolve, reject) => {
        const url = `https://www.departmynt.co/wp-json/user_survey/getSurveyResult?userId=${userId}`
        axios.get(url)
            .then(response => {
                resolve(response.data)
            }).catch(err => {
                console.log(err);
                reject(err)
            })
    });
}

const getSurveyQuestionsFromResult = (result) => {
    const surveyList = result
    const surveyQuestions = []
    surveyList.forEach((product) => {
        surveyQuestions.push({
            id: product.id,
            question: getFormattedString(product.name),
            required: product.required === "1" ? true : false,
            textInput: !product.answers.length,
            multiselect: (product.type === "0" || product.type === "1") ? false : true,
            answers: getAnswer(product.answers),
        })
    })
    return surveyQuestions;
}

const getAnswer = (list) => {
    const answers = []
    list.forEach((answer, index) => {
        let answerText = getFormattedString(answer[0])
        answers.push({
            id: index,
            answer: answerText,
            answerType: (answerText && answerText.includes('www.departmynt.co')) ? 'image' : 'text',
            keyAttribute: answer[1]
        })
    })
    return answers
}