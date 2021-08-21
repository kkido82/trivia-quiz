import { createAction, props } from "@ngrx/store";
import { quizModels } from "./models";

export const LOAD_QUESTIONS = '[Quiz Component] Load Questions';
export const QUESTIONS_LOADED = '[Quiz Component] Questions Loaded';
export const QUESTIONS_LOAD_FAILED = '[Quiz Component] Questions Load Failed';
export const SET_CURRENT_QUESTION = '[Question Component] Set Current Question';
export const SUBMIT_ANSWER = '[Answer Component] Submit Answer';

export const loadQuestions = createAction(LOAD_QUESTIONS);
export const questionsLoaded = createAction(QUESTIONS_LOADED, props<{questions: quizModels.Question[]}>());
export const questionsLoadFailed = createAction(QUESTIONS_LOAD_FAILED);
export const setCurrentQuestion = createAction(SET_CURRENT_QUESTION);
export const submitAnswer = createAction(SUBMIT_ANSWER, props<{submit: boolean, isCorrect: boolean}>());
