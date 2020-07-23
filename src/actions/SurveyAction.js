import axios from 'axios';

import Constants from '../appConfig/Constants';
import *  as types from '../constants/ActionTypes';

export function setSurveyQuestions(result) {
    return (dispatch) => {
            dispatch({
                type: types.GET_SURVEY_QUESTION_SUCCESS,
                surveyQuestions: result
            })
    };
}

export function setAnsweredQuestions(result) {
    return (dispatch) => {
        dispatch({
            type: types.GET_ANSWERED_QUESTIONS,
            answeredQuestions: result,
            totalQuestions: result
        }
        )
    };
}