import * as types from '../constants/ActionTypes';
import { Record } from 'immutable'

const ProductsRecords = Record({
	surveyQuestions: [],
	answeredQuestions: 0,
	totalQuestions: 0
})
const initialState = new ProductsRecords()

export default function (state = initialState, action) {
	switch (action.type) {
		case types.GET_SURVEY_QUESTION_SUCCESS:
			return {
				...state,
				surveyQuestions:  action.surveyQuestions,
				totalQuestions: action.total,
				answeredQuestions: action.answered
			}
		case types.GET_ANSWERED_QUESTIONS:
			return {
				...state,
				answeredQuestions: action.answeredQuestions,
				totalQuestions: action.totalQuestions
			}
		default:
			return state;
	}
}